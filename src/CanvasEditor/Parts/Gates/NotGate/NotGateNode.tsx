import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import './NotGateNode.css';
import { getOutputPosition } from '../../../Functions/gateFunctions';

const NotGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.Left }) => {
    const [output, setOutput] = useState<number>(data.output);
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let input: number = data.input;
                const boolOutput = !(!!input); // the calculated boolean output
                const output = +boolOutput;
                data.output = output;
                setOutput(data.output);
            }, 0);
        }

        return () => {
            data.input = 0;
            data.output = 0;
            setOutput(0);
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'not__gate'>
                <Handle id = 'not__input' className = 'not__input' type = 'target' position = {sourcePosition} />
                {data.label + ': ' + data.output}
                <Handle id = 'not__output' className = 'not__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(NotGateNode);