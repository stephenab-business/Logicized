import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions'
import './TFlipFlop.scss';
import TFFSymbol from './T_FF_Icon.png';

const TFlipFlop: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
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
                if (data.input !== 'undefined') {
                    let d: boolean = !!data.input;
                    const stateBool: boolean = d;
                    const notStateBool: boolean = !d;
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
            }, 0);
        } else if (data.modeIsEditing) {
            data.input = 'undefined';
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
            <div className = 't__latch'>
                <Handle id = 't__input' className = 't__input__one' type = 'target' position = {sourcePosition} />
                { /*data.label + ': ' + data.outputOne + ', ' + data.outputTwo*/}
                <img className='t-flip-flop-image' src={TFFSymbol}></img>
                <Handle id = 't__output__one' className = 't__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 't__output__two' className = 't__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(TFlipFlop);