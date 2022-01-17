import { OnLoadParams, Position, ElementId, Elements } from "inputs-and-outputs-renderer";
import React from "react";

export function createNode(event: React.DragEvent, reactFlowInstance: OnLoadParams<any> | undefined, getId: () => ElementId, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>) {
        //THIS IS WHERE NEW NODES WILL BE ADDED TO ENABLE DRAG AND DROP
        if (reactFlowInstance) {
            const passedType = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({ x: event.clientX - 285, y: event.clientY - 20});
            if (passedType === 'horizontal-input') {
                const type = 'input';
                const sourcePosition = Position.Right;
                const newNode = {
                    id: getId(),
                    type,
                    sourcePosition,
                    position,
                    data: { 
                        comment: false,
                        commentId: ''
                    },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'input') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { 
                        comment: false,
                        commentId: ''
                    },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'output') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { 
                        comment: false,
                        commentId: ''
                    },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'and') {
                const id = getId();
                const type = 'andGate';
                const data = { 
                    id,
                    label: 'AND',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                 };
                const newNode = {
                    id,
                    type,
                    position,
                    data,
                };
                setElements((elements) => elements.concat(newNode));
            } else if (passedType === 'or') {
                const id = getId();
                const type = 'orGate';
                const data = {
                    id,
                    label: 'OR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                }
                const sourcePosition = Position.LeftTop;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'nor') {
                const id = getId();
                const type = 'norGate';
                const data = {
                    id,
                    label: 'NOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                }
                const sourcePosition = Position.LeftTop;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'nand') {
                const id = getId();
                const type = 'nandGate';
                const data = {
                    id,
                    label: 'NAND',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 1,
                    comment: false,
                    commentId: ''
                }
                const sourcePosition = Position.LeftTop;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'xor') {
                const id = getId();
                const type = 'xorGate';
                const data = {
                    id,
                    label: 'XOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                }
                const sourcePosition = Position.LeftTop;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'xnor') {
                const id = getId();
                const type = 'xnorGate';
                const data = {
                    id,
                    label: 'XNOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 1,
                    comment: false,
                    commentId: ''
                }
                const sourcePosition = Position.LeftTop;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'not') {
                const id = getId();
                const type = 'notGate';
                const data = {
                    id,
                    input: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                };
                const sourcePosition = Position.Left;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'outputgate') {
                const id = getId();
                const type = 'outputGate';
                const data = {
                    id,
                    input: 0,
                    comment: false,
                    commentId: ''
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'inputgate') {
                const id = getId();
                const type = 'inputGate';
                const data = {
                    output: 1,
                    comment: false,
                    commentId: ''
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'inputGround') {
                const id = getId();
                const type = 'inputGate';
                const data = {
                    output: 0,
                    comment: false,
                    commentId: ''
                }
                const newNode = {
                    id,
                    type,
                    data,
                    position
                }
                setElements((elements) => elements.concat(newNode));
            }
        }
    }