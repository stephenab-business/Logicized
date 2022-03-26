import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './NorGateNode.css';

const NorGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.output);
    const inputPosition = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let inputOne: number = data.inputOne;
                let inputTwo: number = data.inputTwo;
                const boolOutput = !(!!inputOne) && !(!!inputTwo);
                const output = +boolOutput;
                data.output = output;
                setOutput(data.output);
            }, 0);
        }

        return () => {
            data.inputOne = 0;
            data.inputTwo = 0;
            data.output = 0;
            setOutput(0);
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'nor__gate'>
                <Handle id = 'nor__input__one' className = 'nor__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'nor__input__two' className = 'nor__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.output }
                <Handle id = 'nor__output' className = 'nor__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(NorGateNode);