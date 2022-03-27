import { Node, Elements } from "inputs-and-outputs-renderer";
import { ConnectionMap, TimeMap } from "../CanvasEditor";
import { getDataId, getOutputDataId } from "./createNode";

export function createConnection(sourceHandleId: string, targetNodeId: string, targetHandleId: string) {
    const targetDataId = getDataId(targetHandleId);
    const sourceDataId = getOutputDataId(sourceHandleId);
    const connection: ConnectionMap = {
        outputId: sourceDataId,
        nodeId: targetNodeId,
        dataId: targetDataId
    }

    return connection;
}

// This function will return an edited timeMapping
function traceConnections(childNode: Node, timeMapping: TimeMap, clockInterval: number, elements: Elements) {
    let newTimeMapping = timeMapping;
    const timeKeys = Array.from(timeMapping.keys());
    newTimeMapping.set(childNode.id, clockInterval);
    if (childNode.data.children.length !== 0) {
        const dataChildren: ConnectionMap[] = childNode.data.children;
        dataChildren.forEach((child) => {
            console.log(child);
            // If the node's id is already in the timeMapping, then we need to set a custom timing for node and all of its children
            if (timeKeys.includes(child.nodeId)) {
                const customClockInterval = 1000; // --> might need to add this as an easily accessed constant
                newTimeMapping.set(childNode.id, customClockInterval);
                const newChildNode: Node = elements.find((element) => element.id === child.nodeId) as Node;
                const childrenMap = traceConnections(newChildNode, timeMapping, customClockInterval, elements);
                newTimeMapping = new Map([...timeMapping, ...childrenMap]);
            } else {
                const newChildNode: Node = elements.find((element) => element.id === child.nodeId) as Node;
                const childrenMap = traceConnections(newChildNode, timeMapping, clockInterval, elements);
                newTimeMapping = new Map([...timeMapping, ...childrenMap]);
            }
        });
    }
    console.log(newTimeMapping);
    return newTimeMapping;
}

export function connectFunction(sourceNodeId: string, targetNodeId: string, sourceHandleId: string, targetHandleId: string, elements: Elements, timeMapping: TimeMap, setTimeMapping: React.Dispatch<React.SetStateAction<TimeMap>>) {

    let newElements = elements;
    let newTimeMapping = timeMapping;
    const parentNode: Node = elements.find((element) => element.id === sourceNodeId) as Node;
    const parentNodeIndex = newElements.findIndex((element) => element.id === sourceNodeId);
    const parentClock = timeMapping.get(sourceNodeId);
    const childNode: Node = elements.find((element) => element.id === targetNodeId) as Node;
    const timeKeys = Array.from(timeMapping.keys());
    const connection = createConnection(sourceHandleId, targetNodeId, targetHandleId);
    
    // Set the parentNode's child to include this new node
    if (newElements[parentNodeIndex].data.children !== undefined) {
        newElements[parentNodeIndex].data.children.push(connection);
    }    

    if (parentNode.type !== 'clock' && !timeKeys.includes(sourceNodeId)) {
        setTimeMapping(newTimeMapping);
    }

    if (parentClock) {
        newTimeMapping = traceConnections(childNode, newTimeMapping, parentClock, newElements);
    } else if (!parentClock && parentNode.type === 'clock') {
        const parentNodeClock = parentNode.data.clockInterval;
        newTimeMapping = traceConnections(childNode, newTimeMapping, parentNodeClock, newElements);
    }

    setTimeMapping(newTimeMapping);
}
