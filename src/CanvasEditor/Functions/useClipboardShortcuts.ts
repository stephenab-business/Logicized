import React, { useEffect } from 'react';
import { isEdge, getConnectedEdges, Node, Edge, Elements, ElementId, FlowElement, isNode } from 'inputs-and-outputs-renderer';



function getSelectedGraph(selectedElements: Elements, elements: Elements) {
  const selectedNodes: Node[] = [];
  const selectedNodeIds: ElementId[] = [];
  const allEdges: Edge[] = [];
  const edgeMap: { [id: ElementId]: Edge } = {};
  
  // Get all of the edges, and get only the selected nodes
  // Note: With multi-selection, only Nodes are selected
  console.log(selectedElements);
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
  
  const graph: Elements = selectedNodes;
  
  // For each edge that was connected to the selected Nodes, evaluate if
  // they are actually selected using the ids of the selected nodes,
  // since each edge has a source/target identifier that corresponds
  // to the id of the parent/child Node
  const possiblySelectedEdges = Object.values(edgeMap);

  possiblySelectedEdges.forEach((edge) => {
    if (selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)) {
      graph.push(edge);
    }
  });

  return graph;

}

const Format = 'application/react-flow-format';

export function useClipboardShortcuts(elements: Elements | null, selectedElements: Elements | null, onElementsRemove: (elementsToRemove: Elements) => void, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>) {
  useEffect(() => {
    const cut = (event: ClipboardEvent) => {
      if (elements !== null && selectedElements) {
        const data = JSON.stringify(getSelectedGraph(selectedElements, elements));
        event.clipboardData?.setData(Format, data);
        event.preventDefault();
        onElementsRemove(selectedElements);
      }
    };

    const copy = (event: ClipboardEvent) => {
      if (elements !== null && selectedElements) {
        console.log(getSelectedGraph(selectedElements, elements));
        const data = JSON.stringify(
          getSelectedGraph(selectedElements, elements)
        );
        event.clipboardData?.setData(Format, data);
        event.preventDefault();
      }
    };

    const paste = (event: ClipboardEvent) => {
      try {
        if (event.clipboardData) {
          const elementsToAdd = JSON.parse(event.clipboardData.getData(Format));
          const now = Date.now();
          // change id/source/target of new elements
          // NOTE: CHANGE THIS FOR GOD'S SAKE, JUST PASS ID FROM CANVASEDITOR AND USE IT
          elementsToAdd.forEach((element: FlowElement) => {
            if (isEdge(element)) {
              element.id = `${element.id}_${now}`;
              element.source = `${element.source}_${now}`;
              element.target = `${element.target}_${now}`;
            } else {
              element.id = `${element.id}_${now}`;
            }
          });
          event.preventDefault();
          setElements((elements) => [...elements, ...elementsToAdd]); 
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
  }, [elements, onElementsRemove, selectedElements, setElements]);
}