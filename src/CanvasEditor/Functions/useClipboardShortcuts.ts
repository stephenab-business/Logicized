import React, { useEffect, useState } from 'react';
import { isEdge, getConnectedEdges, Node, Edge, Elements, ElementId, FlowElement, isNode, useStoreActions, useStoreState, XYPosition } from 'inputs-and-outputs-renderer';

function combineLists(firstList: NodeListOf<Element>, secondList: NodeListOf<Element>) {
  const combinedList: Element[] = [];
  
  firstList.forEach((element) => {
    combinedList.push(element);
  });
  secondList.forEach((element) => {
    combinedList.push(element);
  })

  return combinedList;
}

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
          const pastedElements: Elements = [];
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
            }
            pastedElements.push(element);
          });
          event.preventDefault();

          setElements((elements) => elements.concat(elementsToAdd));
          // Set the Pasted Elements to be Selected
          setSelected(elementsToAdd);
          
          // If there is currently selected elements
          if (selectedElements.length !== 0) {
            // Delete Node Selection DOM Element
            const rectangleElements = document.getElementsByClassName('react-flow__nodesselection-rect react-draggable');
            const rectangle: Element = rectangleElements[0];
            if (rectangle) {
              rectangle.remove();
            }
            // Unset Node Selection
            unsetNodesSelection([]);
            // Remove the styling of the previously selected Nodes and Edges
            const allEdges = document.querySelectorAll('g[class^="react-flow__edge react-flow"]');
            const allNodes = document.querySelectorAll('div[class^="react-flow__node react-flow"]')
            const allElements = combineLists(allNodes, allEdges);
            allElements.forEach((element) => {
              element.classList.remove('selected');
            });
          }
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
  }, [elements, onElementsRemove, selectedElements, setElements, getId]);
}