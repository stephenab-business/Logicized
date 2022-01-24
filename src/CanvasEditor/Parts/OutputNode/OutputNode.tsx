import React, { memo, FC, useState} from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'inputs-and-outputs-renderer';
import './OutputNode.css';

const OutputNodeGate: FC<NodeProps> = ({ data }) => {
    const onConnect = (params: Connection | Edge) => {
        console.log('this worked')
    }


    return(
        <>
            <div className = "output__gate">
                <Handle id ='input__a' type = 'source' position = {Position.Left} onConnect={onConnect}/>
                {data.input}
            </div>
        </>
    );
}

export default memo(OutputNodeGate);