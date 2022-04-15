import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './OrGateNode.css';

const OrGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.output);
    const inputPosition = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                if (data.inputOne !== 'undefined' && data.inputTwo !== 'undefined') {
                    let inputOne: number = data.inputOne;;
                    let inputTwo: number = data.inputTwo;
                    const boolOutput = !!inputOne || !!inputTwo;
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
            <div className = 'or__gate'>
                <Handle id = 'or__input__one' className = 'or__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'or__input__two' className = 'or__input__two' type = 'target' position = {inputPosition}/>
                {/* { data.label + ': ' + data.output } */}
                {/* <img className='or-image' src={OrSymbol}></img> */}
                <svg className = 'or-svg' viewBox="0 0 285.935 136.318">
                    <g id="Layer_2" data-name="Layer 2">
                        <path className="cls-1" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                        <path className="cls-2" d="M212.935,68.159c-27.775,64.636-93.208,65.659-93.208,65.659H56.389c18.258-21.6,24.79-47.557,24.79-65.659S74.647,24.1,56.389,2.5h63.338s65.433,1.023,93.208,65.659"/>
                        <line className="cls-2" x1="212.935" y1="68.159" x2="287.935" y2="68.159"/>
                        <line className="cls-2" y1="34.852" x2="75" y2="34.852"/>
                        <line className="cls-2" y1="101.466" x2="75" y2="101.466"/>
                        <path className="cls-1" d="M235.377,68.159a10,10,0,1,1-10-10,10,10,0,0,1,10,10"/>
                        <circle className="cls-2" cx="225.377" cy="68.159" r="10"/>
                        <path className="cls-1" d="M70.558,101.467a10,10,0,1,1-10-10,10,10,0,0,1,10,10"/>
                        <circle className="cls-2" cx="60.558" cy="101.467" r="10"/>
                        <path className="cls-1" d="M70.558,34.851a10,10,0,1,1-10-10,10,10,0,0,1,10,10"/>
                        <circle className="cls-2" cx="60.558" cy="34.851" r="10"/>
                    </g>
                </svg>
                <Handle id = 'or__output' className = 'or__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(OrGateNode);