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
            <div className = 'xnor__gate'>
                <Handle id = 'xnor__input__one' className = 'xnor__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'xnor__input__two' className = 'xnor__input__two' type = 'target' position = {inputPosition} />
                <svg viewBox="0 0 287.935 136.318">
                    <path className="xnor-cls-1" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                    <path className="xnor-cls-2" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                    <line className="xnor-cls-2" x1="212.935" y1="68.159" x2="287.935" y2="68.159"/>
                    <line className="xnor-cls-2" y1="34.852" x2="75" y2="34.852"/>
                    <line className="xnor-cls-2" y1="101.465" x2="75" y2="101.465"/>
                    <path className="xnor-cls-2" d="M37.5,133.818c18.258-21.6,24.79-47.557,24.79-65.659S55.758,24.1,37.5,2.5"/>
                    <circle className="xnor-cls-3" cx="225.377" cy="68.159" r="10"/>
                </svg>
                <Handle id = 'xnor__output' className = 'xnor__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(XnorGateNode);