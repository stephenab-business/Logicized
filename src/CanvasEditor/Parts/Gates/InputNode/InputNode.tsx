import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import './InputNode.css';

const InputGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.Right }: NodeProps) => {
    return (
        <>
            <div className = "input__gate">
                <Handle id='output__a' type = 'source' position = {sourcePosition} />
                {data.output}
            </div>
        </>
    );
}

export default memo(InputGateNode);