import React, { useEffect } from "react";
import { useStoreState, isEdge, getConnectedEdges, Node, Edge, Elements, ElementId, FlowElement } from "inputs-and-outputs-renderer";

function getSelectedGraph(selectedElements: Elements, elements: Elements) {
  const allEdges: Edge[] = [];
  const allNodes: Node[] = [];
  const selectedNodes: Node[] = [];
  const selectedNodeIds: ElementId[] = [];
  elements.forEach((element: FlowElement) => {
    if (isEdge(element)) {
      allEdges.push(element);
    } else {
      allNodes.push(element);
    }
  });
  const edgeMap: { [id: ElementId]: Edge } = {};
  selectedElements.forEach((element: FlowElement) => {
    if (!isEdge(element)) {
      const connectedEdges = getConnectedEdges([element], allEdges);
      connectedEdges.forEach((edge) => (edgeMap[edge.id] = edge));
      selectedNodeIds.push(element.id);
      selectedNodes.push(element);
    }
  });
  const graph: Elements = selectedNodes;
  // pick edges which has both nodes present in selectedNodes
  Object.values(edgeMap).forEach((edge) => {
    if (
      selectedNodeIds.includes(edge.source) &&
      selectedNodeIds.includes(edge.target)
    ) {
      graph.push(edge);
    }
  });
  return graph;
}
const Format = "application/react-flow-format";

export function useClipboardShortcuts(elements: Elements | null, selectedElements: Elements | null, onElementsRemove: (elementsToRemove: Elements) => void, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>) {
  useEffect(() => {
    function cut(event: React.ClipboardEvent) {
      if (!(event.target as Element)?.closest(".react-flow")) {
        return;
      }
      //remove selected nodes from graph
      // copy to clipboard
      if (selectedElements && selectedElements.length) {
        if (elements !== null) {
          const data = JSON.stringify(getSelectedGraph(selectedElements, elements));
          event.clipboardData.setData(Format, data);
          event.preventDefault();
          onElementsRemove(selectedElements);
        }
      }
    }
    function copy(event: React.ClipboardEvent) {
      if (!(event.target as Element)?.closest(".react-flow")) {
        return;
      }
      if (elements !== null) {
        if (selectedElements && selectedElements.length) {
          console.log(getSelectedGraph(selectedElements, elements));
          const data = JSON.stringify(
            getSelectedGraph(selectedElements, elements)
          );
          event.clipboardData.setData(Format, data);
          
          event.preventDefault();
        }
      }
    }
    function paste(event: React.ClipboardEvent) {
      // read data from clipboard
      // add elements to graph
      // NOTES FOR STEPHEN:
      /*
      
      * Need to set the User Selection box around the pasted nodes
      * Need to redefine the copy function to where it will save the exact positions
      * Need to paste in the exact same positions but with a pre-defined offset
        * Offset will only apply if there is an Element that is currently in that position 
      * Need to set the selected values
        * I will need to pass in the setSelectedElements function
      
      */
      if (!(event.target as Element)?.closest(".react-flow")) {
        return;
      }
      try {
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
      } catch (error) {
        console.error(error);
      }
    }

    document.addEventListener("cut", cut as unknown as EventListenerOrEventListenerObject);
    document.addEventListener("copy", copy as unknown as EventListenerOrEventListenerObject);
    document.addEventListener("paste", paste as unknown as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener("cut", cut as unknown as EventListenerOrEventListenerObject);
      document.removeEventListener("copy", copy as unknown as EventListenerOrEventListenerObject);
      document.removeEventListener("paste", paste as unknown as EventListenerOrEventListenerObject);
    };
  }, [elements, onElementsRemove, selectedElements, setElements]);
}