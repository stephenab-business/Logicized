import { Node, Elements } from 'inputs-and-outputs-renderer';

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

function getAllDOMNodes() {
    return document.querySelectorAll('div[class^="react-flow__node react-flow"]');
}

function getAllDOMNodesAndEdges() {
    const allEdges = document.querySelectorAll('g[class^="react-flow__edge react-flow"]');
    const allNodes = document.querySelectorAll('div[class^="react-flow__node react-flow"]')
    const allElements = combineLists(allNodes, allEdges);
    return allElements;
}

export function undoNodesSelection(unsetNodesSelection: any) {
    const rectangleElements = document.getElementsByClassName('react-flow__nodesselection-rect react-draggable');
    const rectangle: Element = rectangleElements[0];
    if (rectangle) {
    rectangle.remove();
    }
    // Unset Node Selection
    unsetNodesSelection([]);
    // Remove the styling of the previously selected Nodes and Edges
    undoNormalSelection();
}

export function undoNormalSelection() {
    const allElements = getAllDOMNodesAndEdges();
    allElements.forEach((element) => {
        element.classList.remove('selected');
    });
}

export function undoNodeSelection(node: Node) {
    const allElements = getAllDOMNodes();
    allElements.forEach((element) => {
        const dataId = element.getAttribute('data-id');
        if (node.id === dataId) {
            element.classList.remove('selected');
        }
    })
}

export function setNodeStyles(selectedElements: Elements) {
    const allElements = getAllDOMNodesAndEdges();
    
    allElements.forEach((element) => {
        const dataId = element.getAttribute('data-id');
        selectedElements.forEach((selected) => {
            if (selected.id === dataId) {
                element.classList.add('selected');
            }
        });
    });
}