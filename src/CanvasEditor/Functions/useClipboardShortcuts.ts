import React, { useEffect } from 'react';
import { isEdge, getConnectedEdges, Node, Edge, Elements, ElementId, FlowElement, isNode } from 'inputs-and-outputs-renderer';



async function getSelectedGraph(selectedElements: Elements, elements: Elements) {
  const selectedNodes: Node[] = [];
  const selectedNodeIds: ElementId[] = [];
  const allEdges: Edge[] = [];
  const edgeMap: { [id: ElementId]: Edge } = {};
  
  // Get all of the edges, and get only the selected nodes
  // Note: With multi-selection, only Nodes are selected
  for (const element of elements) {
    if (isEdge(element)) {
      allEdges.push(element);
    } else if (selectedElements.includes(element)) {
      selectedNodes.push(element);
      selectedNodeIds.push(element.id);
    }
  }
  
  // Get all edges connected to the selected Nodes
  for (const element of selectedNodes) {
    const connectedEdges = getConnectedEdges([element], allEdges);
    for (const edge of connectedEdges) {
      edgeMap[edge.id] = edge;
    }
  }
  
  const graph: Elements = selectedNodes;
  
  // For each edge that was connected to the selected Nodes, evaluate if
  // they are actually selected using the ids of the selected nodes,
  // since each edge has a source/target identifier that corresponds
  // to the id of the parent/child Node
  const possiblySelectedEdges = Object.values(edgeMap);
  for (const edge of possiblySelectedEdges) {
    if (selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)) {
      graph.push(edge);
    }
  }

  return graph;

}

const Format = 'application/react-flow-format';

export function useClipboardShortcuts(elements: Elements | null, selectedElements: Elements | null, onElementsRemove: (elementsToRemove: Elements) => void, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>) {
  useEffect(() => {
    const cut = (event: ClipboardEvent) => {

    };

    const copy = (event: ClipboardEvent) => {
      if (!(event.target as Element)?.closest('.react-flow')) {
        console.log('poop1');
        return;
      }
      console.log(!(event.target as Element)?.closest('.react-flow'));
      if (elements !== null) {
        console.log('not null');
        if (selectedElements) {
          console.log(selectedElements);
          console.log(selectedElements.length);
        }
      }
    };

    const paste = (event: ClipboardEvent) => {

    };

    document.addEventListener('cut', cut as  EventListenerOrEventListenerObject);
    document.addEventListener('copy', copy as EventListenerOrEventListenerObject);
    document.addEventListener('paste', paste as EventListenerOrEventListenerObject);
  
    return () => {
      document.removeEventListener('cut', cut as EventListenerOrEventListenerObject);
      document.removeEventListener('copy', copy as EventListenerOrEventListenerObject);
      document.removeEventListener('paste', paste as EventListenerOrEventListenerObject);
    }
  });
}