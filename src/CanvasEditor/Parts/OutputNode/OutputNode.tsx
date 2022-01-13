import React, { memo, FC, } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import './OutputNode.css';

const OutputNodeGate: FC<NodeProps> = ({ data }) => {
    return(
        <>
            <div className = "output__gate">
                <Handle id ='input__a' type = 'source' position = {Position.Left} />
                {data.input}
            </div>
        </>
    );
}

export default memo(OutputNodeGate);