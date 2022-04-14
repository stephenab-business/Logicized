import { OnLoadParams, Position, ElementId, Elements } from "inputs-and-outputs-renderer";
import React from "react";
import { ConnectionMap } from "../CanvasEditor";

export function createNode(event: React.DragEvent, reactFlowInstance: OnLoadParams<any> | undefined, getId: () => ElementId, setElements: React.Dispatch<React.SetStateAction<Elements<any>>>, modeIsEditing: boolean) {
        if (reactFlowInstance) {
            const passedType = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({ x: event.clientX - 285, y: event.clientY - 20});
            const children: ConnectionMap[] = [];
            if (passedType === 'inputgate') {
                const id = getId();
                const type = 'inputGate';
                const data = {
                    output: 1,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateOutput: false,
                    propDelay: 0,
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
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateOutput: false,
                    propDelay: 0,
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'switch') {
                const id = getId();
                const type = 'switch';
                const data = {
                    output: 0,
                    comment: false,
                    commentId: '',
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateOutput: false,
                    propDelay: 0,
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'clock') {
                const id = getId();
                const type = 'clock';
                const data = {
                    output: null,
                    comment: false,
                    commentId: '',
                    clockInterval: 0,
                    initialValue: null,
                    initialized: false,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateOutput: false,
                    propDelay: 0,
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'not') {
                const id = getId();
                const type = 'notGate';
                const data = {
                    label: 'NOT', 
                    input: 0,
                    output: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInput: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
                    input: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInput: false,
                    parents: []
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            ////////////////////////////////////////////////
            //////////////////// Gates ////////////////////
            //////////////////////////////////////////////
            else if (passedType === 'and') {
                const id = getId();
                const type = 'andGate';
                const data = { 
                    label: 'AND',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
                 };
                const newNode = {
                    id,
                    type,
                    position,
                    data,
                };
                setElements((elements) => elements.concat(newNode));
            } 
            else if (passedType === 'or') {
                const id = getId();
                const type = 'orGate';
                const data = {
                    label: 'OR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
                    label: 'NOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
                    label: 'XOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
                    label: 'XNOR',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 1,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: null,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    parents: []
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
            //////////////////////////////////////////////////
            //////////////////// Latches ////////////////////
            ////////////////////////////////////////////////
            else if (passedType === 'srLatch') {
                const id = getId();
                const type = 'srLatch';
                const data = {
                    label: 'SR Latch',
                    inputOne: 0,
                    inputTwo: 0,
                    outputOne: 'undefined',
                    outputTwo: 'undefined',
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'srLatchEnable') {
                const id = getId();
                const type = 'srLatchEnable';
                const data = {
                    label: 'SR Latch Enable',
                    inputOne: 0,
                    inputTwo: 0,
                    inputThree: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutput: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'dLatch') {
                const id = getId();
                const type = 'dLatch';
                const data = {
                    label: 'D Latch',
                    input: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'dLatchEnable') {
                const id = getId();
                const type = 'dLatchEnable';
                const data = {
                    label: 'D Latch Enable',
                    inputOne: 0,
                    inputTwo: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            /////////////////////////////////////////////////////
            //////////////////// Flip-Flops ////////////////////
            ///////////////////////////////////////////////////
            else if (passedType === 'srFlipFlop') {
                const id = getId();
                const type = 'srFlipFlop';
                const data = {
                    label: 'SR Flip Flop',
                    inputOne: 0,
                    inputTwo: 0,
                    inputThree: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    falling: false,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateInputThree: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'jkFlipFlop') {
                const id = getId();
                const type = 'jkFlipFlop';
                const data = {
                    label: 'JK Flip Flop',
                    id: id,
                    inputOne: 0,
                    inputTwo: 0,
                    inputThree: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    falling: false,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateInputThree: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'dFlipFlop') {
                const id = getId();
                const type = 'dFlipFlop';
                const data = {
                    label: 'D Flip Flop',
                    inputOne: 0,
                    inputTwo: 0,
                    outputOne: 0,
                    outputTwo: 0,
                    falling: false,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateInputThree: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
            else if (passedType === 'tFlipFlop') {
                const id = getId();
                const type = 'tFlipFlop';
                const data = {
                    label: 'T Flip Flop',
                    inputOne: 0,
                    inputTwo: 0,
                    outputOne: 0,
                    outputTwo: 1,
                    initialState: 0,
                    initialNotState: 1,
                    falling: false,
                    comment: false,
                    commentId: '',
                    useClock: false,
                    clockInterval: 0,
                    children: children,
                    modeIsEditing: modeIsEditing,
                    negateInputOne: false,
                    negateInputTwo: false,
                    negateInputThree: false,
                    negateOutputOne: false,
                    negateOutputTwo: false,
                    propDelay: 0,
                    setupTime: 0,
                    holdTime: 0,
                    parents: []
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
        }
    }

export function getDataId(handleId: ElementId) {
    if (handleId.includes('one')) {
        return 'inputOne';
    }
    else if (handleId.includes('two')) {
        return 'inputTwo';
    }
    else if (handleId.includes('three')) {
        return 'inputThree';
    }
    else if (handleId.includes('four')) {
        return 'inputFour';
    }
    else if (handleId.includes('five')) {
        return 'inputFive';
    }
    else if (handleId.includes('six')) {
        return 'inputSix';
    }
    else if (handleId.includes('seven')) {
        return 'inputSeven';
    }
    else if (handleId.includes('eight')) {
        return 'inputEight';
    }
    else if (handleId.includes('nine')) {
        return 'inputNine';
    }
    else if (handleId.includes('ten')) {
        return 'inputTen';
    }
    else if (handleId.includes('eleven')) {
        return 'inputEleven';
    }
    else if (handleId.includes('twelve')) {
        return 'inputTwelve';
    }
    else if (handleId.includes('thirteen')) {
        return 'inputThirteen';
    }
    else if (handleId.includes('fourteen')) {
        return 'inputFourteen';
    }
    else if (handleId.includes('fifteen')) {
        return 'inputFifteen';
    }
    else if (handleId.includes('sixteen')) {
        return 'inputSixteen';
    } else {
        return 'input';
    }
}

export function getOutputDataId(handleId: string) {
    if (handleId.includes('one')) {
        return 'outputOne';
    }
    else if (handleId.includes('two')) {
        return 'outputTwo';
    }
    else {
        return 'output';
    }
}