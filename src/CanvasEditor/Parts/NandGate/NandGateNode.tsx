import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, ReactFlowState, Node, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../Functions/gateFunctions'
import './NandGateNode.css';

const NandGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
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
                const actualOutput = !(!!inputOne) || !(!!inputTwo);
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
            <div className = 'nand__gate'>
                <Handle id = 'nand__input__one' className = 'nand__input__one' type = 'source' position = {sourcePosition} onConnect = {onConnect} />
                <Handle id = 'nand__input__two' className = 'nand__input__two' type = 'source' position = {inputPosition} onConnect = {onConnect}/>
                { data.label }
                <Handle id = 'nand__output' className = 'nand__output' type = 'target' position = {outputPosition} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(NandGateNode);