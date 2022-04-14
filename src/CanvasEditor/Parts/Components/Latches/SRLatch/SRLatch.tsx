import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './SRLatch.scss';
import SRSymbol from './SR_Latch_Icon.png'


const SRLatch: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number | string>(data.outputTwo);
    const inputPosition: Position = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                if (data.inputOne !== 'undefined' && data.inputTwo !== 'undefined') {
                    let reset: boolean = !!data.inputOne;
                    let set: boolean = !!data.inputTwo;
                    let stateBool: boolean | string;
                    let notStateBool: boolean | string;
                    stateBool = reset ? false : (set ? true : (notOutput === 'undefined' ? 'undefined' : !!notOutput));
                    notStateBool = set ? false : (reset ? true : (output === 'undefined' ? 'undefined' : !!output));
                    if (reset === set && reset === false) {
                        stateBool = 'undefined';
                        notStateBool = 'undefined';   
                    }
                    const state: number = +stateBool;
                    const notState: number = +notStateBool;
                    data.outputOne = state;
                    data.outputTwo = notState;
                    setOutput(state);
                    setNotOutput(notState);
                }
                else {
                    data.outputOne = 'undefined';
                    data.outputTwo = 'undefined';
                    setOutput(data.outputOne);
                    setNotOutput(data.outputTwo);
                }
            }, data.propDelay);
        } else if (data.modeIsEditing) {
            data.inputOne = 'undefined';
            data.inputTwo = 'undefined';
            data.outputOne = 'undefined';
            data.outputTwo = 'undefined';
            setOutput(data.output);
            setNotOutput(data.outputTwo);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'sr__latch'>
                <Handle id = 'sr__input__one' className = 'sr__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'sr__input__two' className = 'sr__input__two' type = 'target' position = {inputPosition} />
                { /* data.label + ': ' + data.outputOne + ', ' + data.outputTwo*/ }
                <img className='sr-latch-image' src={SRSymbol}></img>
                <Handle id = 'sr__output__one' className = 'sr__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'sr__output__two' className = 'sr__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRLatch);