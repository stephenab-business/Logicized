import React, { memo, FC, useEffect, useState } from 'react';
<<<<<<< HEAD

import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions'
import './AndGateNode.css';
import AndSymbol from './And_Gate_Icon.png'; 
=======
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../Functions/gateFunctions';
import './AndGateNode.css';
>>>>>>> 9e93b261609cc8fd130158aba8d8b00c6258d96c

const AndGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.output);
    const inputPosition = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition) as Position;
<<<<<<< HEAD

    // Function that computes the actual output value of the AND gate
=======
    
>>>>>>> 9e93b261609cc8fd130158aba8d8b00c6258d96c
    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
<<<<<<< HEAD
                let inputOne: number = data.inputOne;;
                let inputTwo: number = data.inputTwo;
                const boolOutput = !!inputOne || !!inputTwo;
                const output = +boolOutput;
                data.output = output;
                setOutput(data.output);
            }, 0);
=======
                if (data.inputOne !== 'undefined' && data.inputTwo !== 'undefined') {
                    let inputOne: number = data.inputOne;
                    let inputTwo: number = data.inputTwo;
                    const boolOutput = !!inputOne && !!inputTwo;
                    const output = +boolOutput;
                    data.output = output;
                    setOutput(output);
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
>>>>>>> 9e93b261609cc8fd130158aba8d8b00c6258d96c
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
            <div className = 'and__gate'>
                <Handle id = 'and__input__one' className = 'and__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'and__input__two' className = 'and__input__two' type = 'target' position = {inputPosition}/>
                {/* { data.label + ': ' + data.output } */}
                <img className='and-image' src={AndSymbol}></img>
                <Handle id = 'and__output' className = 'and__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(AndGateNode);