import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './DFlipFlop.scss';

const DFlipFlop: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number | string>(data.outputTwo);
    const inputPosition: Position = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    const logic = () => {
        if (data.inputOne !== 'undefined') {
            let d: boolean = !!data.inputOne;
            data.outputOne = +d;
            data.outputTwo = +!d;
            setOutput(data.outputOne);
            setNotOutput(data.outputTwo);
        } else {
            data.outputOne = 'undefined';
            data.outputTwo = 'undefined';
            setOutput(data.outputOne);
            setNotOutput(data.outputTwo);
        }
    }

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
            <div className = 'd__flip__flop'>
                <Handle id = 'dff__input__one' className = 'dff__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'dff__input__two' className = 'dff__input__two' type = 'target' position = {inputPosition} />
                <svg viewBox="0 0 414.426 398.955">
                    <rect className="dff-cls-1" x="75" y="2.5" width="264.426" height="393.955"/>
                    <polygon className="dff-cls-1" points="100 346.73 75 332.296 75 361.164 100 346.73"/>
                    <line className="dff-cls-2" x1="75" y1="347.21" y2="347.21"/>
                    <line className="dff-cls-2" x1="75" y1="51.744" y2="51.744"/>
                    <line className="dff-cls-2" x1="339.426" y1="51.744" x2="414.426" y2="51.744"/>
                    <line className="dff-cls-2" x1="339.426" y1="347.21" x2="414.426" y2="347.21"/>
                    <text className="dff-cls-3" transform="translate(273.941 65.537)">Q</text>
                    <text className="dff-cls-3" transform="translate(269.957 364.289)">Q’</text>
                    <text className="dff-cls-3" transform="translate(114.077 362.125)">Clk</text>
                    <text className="dff-cls-3" transform="translate(101.24 65.767)">D</text>
                </svg>
                <Handle id = 'dff__output__one' className = 'dff__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'dff__output__two' className = 'dff__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(DFlipFlop);