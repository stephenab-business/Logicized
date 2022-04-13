import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions'
import './TFlipFlop.scss';

const TFlipFlop: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.initialState);
    const [notOutput, setNotOutput] = useState<number | string>(data.initialNotState);
    const inputPosition: Position = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    const logic = () => {
        if (data.inputOne !== 'undefined') {
            let t: boolean = !!data.inputOne;
            if (t) {
                const state = data.outputOne;
                const notState = data.outputTwo;
                data.outputOne = notState;
                data.outputTwo = state;
                setOutput(data.outputOne);
                setNotOutput(data.outputTwo);
            }
        }
        else {
            data.outputOne = 'undefined';
            data.outputTwo = 'undefined';
            setOutput(data.outputOne);
            setNotOutput(data.outputTwo);
        }
    };

    useEffect(() => {
        let clock: NodeJS.Timer;
        let previousClock = +!!!data.initialClock;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                if (data.falling && previousClock === 0 && data.inputTwo === 1) {
                    logic();
                } else if (!data.falling && previousClock === 1 && data.inputTwo === 0) {
                    logic();
                }
                previousClock = data.inputTwo;
            }, Number(data.clockInterval) + Number(data.propDelay));
        } else if (data.modeIsEditing) {
            data.input = 'undefined';
            data.outputOne = data.initialState;
            data.outputTwo = data.initialNotState;
            setOutput(data.output);
            setNotOutput(data.outputTwo);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 't__flip__flop'>
                <Handle id = 'tff__input__one' className = 'tff__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'tff__input__two' className = 'tff__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.outputOne + ', ' + data.outputTwo}
                <Handle id = 'tff__output__one' className = 'tff__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'tff__output__two' className = 'tff__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(TFlipFlop);