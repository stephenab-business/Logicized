import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './NandGateNode.css';

const NandGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
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
                    const boolOutput = !(!!inputOne) || !(!!inputTwo);
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
            <div className = 'nand__gate'>
                <Handle id = 'nand__input__one' className = 'nand__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'nand__input__two' className = 'nand__input__two' type = 'target' position = {inputPosition} />
                <svg viewBox="0 0 287.935 136.32">
                    <path className="nand-cls-1" d="M222.049,68.16a65.664,65.664,0,0,1-65.66,65.66h-100V2.5h100a65.664,65.664,0,0,1,65.66,65.66"/>
                    <path className="nand-cls-2" d="M222.049,68.16a65.664,65.664,0,0,1-65.66,65.66h-100V2.5h100A65.664,65.664,0,0,1,222.049,68.16Z"/>
                    <line className="nand-cls-2" x1="222.049" y1="68.16" x2="287.935" y2="68.16"/>
                    <line className="nand-cls-2" y1="34.853" x2="56.389" y2="34.853"/>
                    <line className="nand-cls-2" y1="101.466" x2="56.389" y2="101.466"/>
                    <circle className="nand-cls-3" cx="235.377" cy="68.16" r="10"/>
                </svg>
                <Handle id = 'nand__output' className = 'nand__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(NandGateNode);