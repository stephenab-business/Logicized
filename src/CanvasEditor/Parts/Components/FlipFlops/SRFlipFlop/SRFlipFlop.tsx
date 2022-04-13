import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions'
import './SRFlipFlop.scss';

const SRFlipFlop: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number | string>(data.outputTwo);
    const inputPosition: Position[] = getInputPosition(sourcePosition, 3) as Position[];
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                const clockInput: boolean = !!data.inputTwo;
                if (clockInput) {
                    if (data.inputOne !== 'undefined' && data.inputThree !== 'undefined') {
                        const set: boolean = !!data.inputOne;
                        const reset: boolean = !!data.inputThree;
                        if (set && reset) {
                            data.outputOne = 'undefined';
                            data.outputTwo = 'undefined';
                            setOutput(data.outputOne);
                            setNotOutput(data.outputTwo);
                        } else if (set || reset) {
                            data.outputOne = +set;
                            data.outputTwo = +reset;
                            setOutput(data.outputOne);
                            setNotOutput(data.outputTwo);
                        }
                    } else {
                        data.outputOne = 'undefined';
                        data.outputTwo = 'undefined';
                        setOutput(data.outputOne);
                        setNotOutput(data.outputTwo);
                    }
                }
            }, 0);
        } else if (data.modeIsEditing) {
            data.inputOne = 'undefined';
            data.inputTwo = 'undefined';
            data.inputThree = 'undefined';
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
            <div className = 'sr__flip__flop'>
                <Handle id = 'srff__input__one' className = 'srff__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'srff__input__two' className = 'srff__input__two' type = 'target' position = {inputPosition[1]} />
                <Handle id = 'srff__input__three' className = 'srff__input__three' type = 'target' position = {inputPosition[0]} />
                { data.label + ': ' + data.outputOne + ', ' + data.outputTwo}
                <Handle id = 'srff__output__one' className = 'srff__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'srff__output__two' className = 'srff__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRFlipFlop);