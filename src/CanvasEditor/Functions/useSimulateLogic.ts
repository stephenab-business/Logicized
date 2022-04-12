import React, { SetStateAction, useEffect } from "react";
import { ElementId, Elements, getIncomers, getOutgoers, isNode, Node, removeElements } from "inputs-and-outputs-renderer";
import { ConnectionMap, TimeMap } from "../CanvasEditor";

/* 

Things that should be enabled for simulation:
- Comments
- Dragging Nodes around
- Placing probes or timing devices


Things that should be disabled for simulation:
- onElementsRemove
- onConnect

*/

let set: boolean = false;
// const timeMapElements: Elements = [];
// const normalElements: Elements = [];
// const clockElements: Node[] = [];

export function useSimulateLogic(elements: Elements, editing: boolean, timeMapping: TimeMap, setElements: React.Dispatch<SetStateAction<Elements>>) {
    const timeKeys = Array.from(timeMapping.keys());

    useEffect(() => {
        let clock: NodeJS.Timer;

        // If in simulation mode
        if (!editing) {
            // Setting all of the initial data
            const sortedNodes = topologicalSort(elements);
            console.log(sortedNodes);
            if (!set) {
                set = true;
                sortedNodes.forEach((node) => {
                    if (timeKeys.includes(node.id)) {
                        node.data.useClock = true;
                        node.data.clockInterval = timeMapping.get(node.id);
                        node.data.children.forEach((child: ConnectionMap) => {
                            const childNode = sortedNodes.find((node) => node.id === child.nodeId);
                            if (childNode) {
                                childNode.data[child.dataId] = node.data[child.outputId];
                            }
                        });
                    } else {
                        node.data.children.forEach((child: ConnectionMap) => {
                            const childNode = sortedNodes.find((node) => node.id === child.nodeId);
                            if (childNode) {
                                childNode.data[child.dataId] = node.data[child.outputId];
                            }
                        })
                    }
                });
            }

            clock = setInterval(() => {
                sortedNodes.forEach((node) => {
                    node.data.children.forEach((child: ConnectionMap) => {
                        const childNode = sortedNodes.find((node) => node.id === child.nodeId);
                        if (childNode) {
                            childNode.data[child.dataId] = node.data[child.outputId];
                            // console.log('parent')
                            // console.log(node.type);
                            // console.log(node.data.output);
                            // console.log(childNode.type)
                            // console.log(node.data.output);
                            // console.log(childNode.data[child.dataId]);
                            // console.log('child')
                            // console.log(childNode.type)
                            // console.log(childNode.data[child.dataId]);
                        }
                    });
                });
            }, 0);
        }

        return () => {
            clearInterval(clock);
        }
    }, [editing]);
}

const topologicalSort = (elements: Elements): Node[] => {
    const nodes: Node[] = [];
    let sortedNodes: Node[] = [];

    // Push all Nodes to the nodes array
    elements.forEach((element) => {
        if (isNode(element)) {
            nodes.push(element);
        }
    });

    const visit = (node: Node) => {
        if (sortedNodes.find((element) => element.id === node.id) !== undefined) {
            console.log('yo1')
            return [] as Node[];
        }
        if (node.data.flagged) {
            console.log('yo2')
            return [] as Node[];   
        } 
        node.data.flagged = true;
        node.data.children.forEach((child: ConnectionMap) => {
            const childNode = nodes.find((element) => element.id === child.nodeId);
            if (childNode) {
                visit(childNode);
            }
        });
        node.data.flagged = false;
        const nodeIndex = nodes.findIndex((element) => element.id === node.id);
        nodes.splice(nodeIndex, 1);
        sortedNodes = [node, ...sortedNodes];
        return sortedNodes;
    }

    while (nodes.length > 0) {
        visit(nodes[0]);
    }

    return sortedNodes;
}

























                // // for each timeMap elements
                // clock = setInterval(() => {
                //     timeMapElements.forEach((element) => {
                //         // set the child data
                //         element.data.children.forEach((child: ConnectionMap) => {
                //             const childNode = elements.find((element) => element.id === child.nodeId);
                //             if (childNode) {
                //                 childNode.data[child.dataId] = element.data.output;
                //             }
                //         });
                //     });
                // }, 0);


// elements.forEach((element) => {
//     if (isNode(element)) {
//         if (timeKeys.includes(element.id)) {
//             element.data.useClock = true;
//             element.data.clockInterval = timeMapping.get(element.id);
//             element.data.children.forEach((child: ConnectionMap) => {
//                 const childNode = elements.find((element) => element.id === child.nodeId);
//                 if (childNode) {
//                     childNode.data.useClock = true;
//                     childNode.data.clockInterval = true;
//                 }
//             });
//         }
//     }
// });

// const setData = (parentNode: Node, map: ConnectionMap) => {
//     const childNode = elements.find((element) => element.id === map.nodeId);
//     if (childNode) {
//         childNode.data[map.dataId] = parentNode.data.output;
//         if (childNode.type === 'and' && timeMapping.get(childNode.id) === parentNode.data.clockInterval) {
//             const inputOne = childNode.data.inputOne;
//             const inputTwo = childNode.data.inputTwo;
//             const boolOutput = !!inputOne && !!inputTwo;
//             const output = +boolOutput;
//             childNode.data.output = output;
//             if (isNode(childNode) && childNode.data.children.length !== 0) {
//                 childNode.data.children.forEach((child: ConnectionMap) => {
//                     setData(childNode, child);
//                 });
//             }
//         } else if (isNode(childNode) && childNode.type === 'and' && timeMapping.get(childNode.id) !== parentNode.data.clockInterval) {
//             // find the clock that is the other parent
//             // remove that other clock from clockElements
//             // go down the whole children tree
//         }
//     }
// }


// clockElements.forEach((clock) => {
//     const children: ConnectionMap[] = clock.data.children;
//     children.forEach((child) => {
//         setData(clock, child);
//     });
// });



                    // timeMapElements.forEach((element) => {
                    //     element.data.children.forEach((child: ConnectionMap) => {
                    //         const childNode = elements.find((element) => element.id === child.nodeId);
                    //         if (childNode) {
                    //             childNode.data[child.dataId] = element.data.output;
                    //         }
                    //     })
                    // });

                    // Start at clocks
                        // make a counter
                        // If child node has a different value from clockInterval it means that there is two clocks, so stop there
                            // Traverse each of the clock's until they reach the childNode
                            // Once a clock has been found that reaches that node, select it
                            // THEN continue down the line
                        // Else set the values
                        // If there is no children left, move on to next clock
                        // increment counter
                        // Go through until counter === timeMapElements.length 







                    // if (isNode(element) && element.data.children.length !== 0) {
                    //     if (timeKeys.includes(element.id)) {
                    //         console.log('yo');
                    //         element.data.useClock = true;
                    //         element.data.clockInterval = timeMapping.get(element.id);
                    //     } else if (element.type === 'clock') {
                            
                    //     }
                    //     element.data.children.forEach((child: ConnectionMap) => {
                    //         const childNode = elements.find((element) => element.id === child.nodeId);
                    //         if (childNode) {
                    //             childNode.data[child.dataId] = element.data.output;
                    //             if (element.data.useClock) {
                    //                 childNode.data.useClock = true;
                    //                 childNode.data.clockInterval = element.data.clockInterval;
                    //             }
                    //         }
                    //     });
                    // }