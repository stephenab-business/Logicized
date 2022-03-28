import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './XnorGateNode.css';

const XnorGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.output);
    const inputPosition = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                if (data.inputOne !== 'undefined' && data.inputTwo !== 'undefined') {
                    let inputOne: number = data.inputOne;
                    let inputTwo: number = data.inputTwo;
                    const boolOutput = (!!inputOne && !!inputTwo) || (!!!inputOne && !!!inputTwo);
                    const output = +boolOutput;
                    data.output = output;
                    setOutput(data.output);
                }
                else {
                    data.output = 'undefined';
                    setOutput(data.output);
                }
            }, 0);
        } else if (data.modeIsEditing) {
            data.inputOne = 'undefined';
            data.inputTwo = 'undefined';
            data.output = 'undefined';
            setOutput(data.output);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'or__gate'>
                <Handle id = 'or__input__one' className = 'or__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'or__input__two' className = 'or__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.output}
                <Handle id = 'or__output' className = 'or__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(XnorGateNode);