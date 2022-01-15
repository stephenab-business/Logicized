import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, ReactFlowState, Node, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../Functions/gateFunctions'
import './XorGateNode.css';

const XorGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const inputPosition = getInputPosition(sourcePosition);
    const outputPosition = getOutputPosition(sourcePosition);
    const nodes = useStoreState((state: ReactFlowState) => state.nodes);
    const thisNode = nodes.find((node: Node) => node.id === data.id);

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        if (thisNode) {
            let inputOne: number;
            let inputTwo: number;
            if (thisNode.data.inputOneConnected && thisNode.data.inputTwoConnected) {
                inputOne = thisNode.data.inputOne;
                inputTwo = thisNode.data.inputTwo;
                const actualOutput = (!!inputOne || !!inputTwo) && (!(!!inputOne) || !(!!inputTwo));
                const output = +actualOutput;
                thisNode.data.output = output;
            }
        }
    });

    const onConnect = (params: Connection | Edge) => {
        console.log(thisNode);
        console.log(params);
    }

    return(
        <>
            <div className = 'xor__gate'>
                <Handle id = 'xor__input__one' className = 'xor__input__one' type = 'source' position = {sourcePosition} onConnect = {onConnect} />
                <Handle id = 'xor__input__two' className = 'xor__input__two' type = 'source' position = {inputPosition} onConnect = {onConnect}/>
                { data.label }
                <Handle id = 'xor__output' className = 'xor__output' type = 'target' position = {outputPosition} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(XorGateNode);