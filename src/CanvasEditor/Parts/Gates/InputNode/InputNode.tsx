import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import './InputNode.css';

const InputGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.Right }: NodeProps) => {
    const [negate, setNegate] = useState<boolean>(data.negateOutput);

    useEffect(() => {
        let clock: NodeJS.Timer;
        clock = setInterval(() => {
            if (data.negateOutput) {
                data.negateOutput = false;
                setNegate(!negate);
                data.output = +!!!data.output;
            }
        }, 0);

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return (
        <>
            <div className = "input__gate">
                <Handle id='input__output' className = 'input__output' type = 'source' position = {sourcePosition} />
                {data.output}
            </div>
        </>
    );
}

export default memo(InputGateNode);