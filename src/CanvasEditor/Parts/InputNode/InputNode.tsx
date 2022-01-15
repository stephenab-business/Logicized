import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps, Connection, Edge, useStoreState } from 'inputs-and-outputs-renderer';
import './InputNode.css';

const InputGateNode: FC<NodeProps> = ({ data, targetPosition = Position.Right }: NodeProps) => {
    const nodes = useStoreState((state) => state.nodes);

    const onConnect = (params: Connection | Edge) => {
        const target = nodes.find((node) => node.id === params.target);
        if (target)
        console.log(target.data);
    }

    return (
        <>
            <div className = "input__gate">
                <Handle id='output__a' type = 'target' position = {targetPosition} onConnect = {onConnect} />
                {data.output}
            </div>
        </>
    );
}

export default memo(InputGateNode);