import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, ReactFlowState, Node, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../Functions/gateFunctions'
import './NorGateNode.css';

const NorGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
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
                const actualOutput = !!inputOne && !!inputTwo;
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
            <div className = 'nor__gate'>
                <Handle id = 'nor__input__one' className = 'nor__input__one' type = 'source' position = {sourcePosition} onConnect = {onConnect} />
                <Handle id = 'nor__input__two' className = 'nor__input__two' type = 'source' position = {inputPosition} onConnect = {onConnect}/>
                { data.label }
                <Handle id = 'nor__output' className = 'nor__output' type = 'target' position = {outputPosition} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(NorGateNode);