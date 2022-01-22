import React, { useEffect, useState } from 'react';
import { isEdge, getConnectedEdges, Node, Edge, Elements, ElementId, FlowElement, isNode, useStoreActions, useStoreState, XYPosition } from 'inputs-and-outputs-renderer';
import { undoNodesSelection, setNodeStyles } from './domFunctions';

function getAllSelectedElements(selectedElements: Elements, elements: Elements) {
  const allEdges: Edge[] = [];
  const selectedNodes: Node[] = [];
  const selectedNodeIds: ElementId[] = [];
  const edgeMap: { [id: ElementId]: Edge } = {};

  // Get all of the edges, and get only the selected nodes
  // Note: With multi-selection, only Nodes are selected
  elements.forEach((element) => {
    if (isEdge(element)) {
      allEdges.push(element);
    } else {
      selectedElements.forEach((node) => {
        if (element.id === node.id) {
          selectedNodes.push(element);
          selectedNodeIds.push(element.id);
        }
      });
    }
  });

  // Get all edges connected to the selected Nodes
  selectedNodes.forEach((element) => {
    const connectedEdges = getConnectedEdges([element], allEdges);
    connectedEdges.forEach((edge) => {
      edgeMap[edge.id] = edge;
    });
  });

  const allSelectedElements: Elements = selectedNodes;

  // For each edge that was connected to the selected Nodes, evaluate if
  // they are actually selected using the ids of the selected nodes,
  // since each edge has a source/target identifier that corresponds
  // to the id of the parent/child Node
  const allConnectedEdges = Object.values(edgeMap);

  allConnectedEdges.forEach((edge) => {
    if (selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)) {
      allSelectedElements.push(edge);
    }
  });

  return allSelectedElements;

}

const Format = 'application/react-flow-format';

const nodeOffset: number = 200;

export function useClipboardShortcuts(elements: Elements, selectedElements: Elements, setSelected: React.Dispatch<React.SetStateAction<Elements<any>>>, onElementsRemove: (elementsToRemove: Elements) => void, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>, getId: () => ElementId) {
  // const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const unsetNodesSelection = useStoreActions((actions) => actions.unsetNodesSelection);
  const allSelectedElements = getAllSelectedElements(selectedElements, elements);

  useEffect(() => {
    const cut = (event: ClipboardEvent) => {
      if (elements !== null) {
        const data = JSON.stringify(allSelectedElements);
        event.clipboardData?.setData(Format, data);
        event.preventDefault();
        onElementsRemove(selectedElements);
      }
    };

    const copy = (event: ClipboardEvent) => {
      if (elements !== null) {
        const data = JSON.stringify(
          allSelectedElements
        );
        event.clipboardData?.setData(Format, data);
        event.preventDefault();
      }
    };


      // NOTES FOR STEPHEN:
      /*
      
      * Need to set the User Selection box around the pasted nodes
      * Need to redefine the copy function to where it will save the exact positions
      * Need to paste in the exact same positions but with a pre-defined offset
        * Offset will only apply if there is an Element that is currently in that position 
      * Need to set the selected values
        * I will need to pass in the setSelectedElements function
      
      */


    const paste = (event: ClipboardEvent) => {
      try {
        if (event.clipboardData) {
          const elementsToAdd = JSON.parse(event.clipboardData.getData(Format));
          const nodeMap: { [id: ElementId] : Node } = {};
          // Edges are only pasted if their source and target Nodes are pasted
          elementsToAdd.forEach((element: FlowElement) => {
            if (isEdge(element)) {
              element.id = getId();
              element.source = nodeMap[element.source].id;
              element.target = nodeMap[element.target].id;
              
            } else {
              const originalId = element.id;
              element.id = getId();
              nodeMap[originalId] = element;
              element.position = { x: element.position.x + nodeOffset, y: element.position.y };
              element.data = {
                ...element.data,
                pasted: true
              }
            }
          });
          event.preventDefault();

          setElements((elements) => elements.concat(elementsToAdd));
          // Set the Pasted Elements to be Selected
          setSelected(elementsToAdd);
          
          // If there is currently selected elements
          if (selectedElements.length !== 0) {
            // Delete Node Selection DOM Element
            undoNodesSelection(unsetNodesSelection);
          }

          // Set the styles
          setNodeStyles(elementsToAdd);

          // If pane click
          // If node click
          // If node drag
          
        }
      } catch (error) {
        console.error(error);
      }
    };

    document.addEventListener('cut', cut as  EventListenerOrEventListenerObject);
    document.addEventListener('copy', copy as EventListenerOrEventListenerObject);
    document.addEventListener('paste', paste as EventListenerOrEventListenerObject);
  
    return () => {
      document.removeEventListener('cut', cut as EventListenerOrEventListenerObject);
      document.removeEventListener('copy', copy as EventListenerOrEventListenerObject);
      document.removeEventListener('paste', paste as EventListenerOrEventListenerObject);
    }
  }, [elements, onElementsRemove, selectedElements, setElements, getId, allSelectedElements, setSelected, unsetNodesSelection]);
}