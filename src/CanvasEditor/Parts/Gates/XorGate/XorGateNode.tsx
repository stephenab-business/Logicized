import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './XorGateNode.css';

const XorGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.output);
    const inputPosition = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let inputOne: number = data.inputOne;
                let inputTwo: number = data.inputTwo;
                const boolOutput = (!!inputOne || !!inputTwo) && (!(!!inputOne) || !(!!inputTwo));
                const output = +boolOutput;
                data.output = output;
                setOutput(data.output);
            }, data.propDelay);
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
            <div className = 'xor__gate'>
                <Handle id = 'xor__input__one' className = 'xor__input__one' type = 'target' position = {sourcePosition}  />
                <Handle id = 'xor__input__two' className = 'xor__input__two' type = 'target' position = {inputPosition} />
                <svg viewBox="0 0 287.935 136.318">
                    <path className="xor-cls-1" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                    <path className="xor-cls-2" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                    <line className="xor-cls-2" x1="212.935" y1="68.159" x2="287.935" y2="68.159"/>
                    <line className="xor-cls-2" y1="34.852" x2="75" y2="34.852"/>
                    <line className="xor-cls-2" y1="101.465" x2="75" y2="101.465"/>
                    <path className="xor-cls-2" d="M37.5,133.818c18.258-21.6,24.79-47.557,24.79-65.659S55.758,24.1,37.5,2.5"/>
                </svg>
                <Handle id = 'xor__output' className = 'xor__output' type = 'source' position = {outputPosition}  />
            </div>
        </>
    );
}

export default memo(XorGateNode);