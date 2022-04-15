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

    const logic = () => {
        if (data.inputOne !== 'undefined' && data.inputThree !== 'undefined') {
            const set: boolean = !!data.inputOne;
            const reset: boolean = !!data.inputThree;
            if (set && reset) {
                data.outputOne = 'undefined';
                data.outputTwo = 'undefined';
                setOutput(data.outputOne);
                setOutput(data.outputTwo);
            } else if (set || reset) {
                data.outputOne = +set;
                data.outputTwo = +reset;
                setOutput(data.outputOne);
                setNotOutput(data.outputTwo);
            }
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
            data.inputOne = 'undefined';
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
                <svg viewBox="0 0 414.426 398.955">
                    <line className="srff-cls-1" x1="75" y1="199.477" y2="199.477"/>
                    <rect className="srff-cls-2" x="75" y="2.5" width="264.426" height="393.955"/>
                    <polygon className="srff-cls-2" points="100 199.477 75 185.043 75 213.911 100 199.477"/>
                    <line className="srff-cls-1" x1="75" y1="347.21" y2="347.21"/>
                    <line className="srff-cls-1" x1="75" y1="51.744" y2="51.744"/>
                    <line className="srff-cls-1" x1="339.426" y1="51.744" x2="414.426" y2="51.744"/>
                    <line className="srff-cls-1" x1="339.426" y1="347.21" x2="414.426" y2="347.21"/>
                    <text className="srff-cls-3" transform="translate(101.309 64.537)">S</text>
                    <text className="srff-cls-3" transform="translate(273.941 65.537)">Q</text>
                    <text className="srff-cls-3" transform="translate(269.957 364.289)">Q’</text>
                    <text className="srff-cls-3" transform="translate(98.909 363.289)">R</text>
                    <text className="srff-cls-3" transform="translate(114.077 214.873)">Clk</text>
                </svg>
                <Handle id = 'srff__output__one' className = 'srff__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'srff__output__two' className = 'srff__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRFlipFlop);