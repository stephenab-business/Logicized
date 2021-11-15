import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, } from 'inputs-and-outputs-renderer';
import './NotGateNode.css';
import { getOutputPosition } from '../../Functions/gateFunctions';

const NotGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.Left }) => {
    const nodes = useStoreState((state) => state.nodes);
    const thisNode = nodes.find((node) => node.id === data.id);
    const outputPosition = getOutputPosition(sourcePosition);

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        if (thisNode) {
            let input: number;
            if (thisNode.data.inputConnected) {
                input = thisNode.data.input;
                const boolOutput = !(!!input); // the calculated boolean output
                const output = +boolOutput;
                thisNode.data.output = output;
            }
        }
    });

    const onConnect = (params: Connection | Edge) => {
        console.log(thisNode);
    }

    return(
        <>
            <div className = 'not__gate'>
                <Handle id = 'not__input' className = 'not__input' type = 'source' position = {sourcePosition} onConnect = {onConnect} />
                <Handle id = 'not__output' className = 'not__output' type = 'target' position = {outputPosition} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(NotGateNode);