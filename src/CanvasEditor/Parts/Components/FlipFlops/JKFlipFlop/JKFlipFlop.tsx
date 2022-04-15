import React, { memo, FC, useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './JKFlipFlop.scss';

const JKFlipFlop: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number | string>(data.outputTwo);
    const inputPosition: Position[] = getInputPosition(sourcePosition, 3) as Position[];
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    const logic = () => {
        if (data.inputOne !== 'undefined' && data.inputThree !== 'undefined') {
            const j: boolean = !!data.inputOne;
            const k: boolean = !!data.inputThree;
            if (j && k && data.output !== 'undefined' && data.notOutput !== 'undefined') {
                const state = data.outputTwo;
                const notState = data.outputOne;
                
                data.outputOne = state;
                data.outputTwo = notState;
                setOutput(data.outputOne);
                setNotOutput(data.outputTwo);
            } else if (j || k) {
                data.outputOne = +j;
                data.outputTwo = +k;
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
            <div className = 'jk__flip__flop'>
                <Handle id = 'jkff__input__one' className = 'jkff__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'jkff__input__two' className = 'jkff__input__two' type = 'target' position = {inputPosition[1]} />
                <Handle id = 'jkff__input__three' className = 'jkff__input__three' type = 'target' position = {inputPosition[0]} />
                <svg viewBox="0 0 414.426 398.955">
                    <line className="jkff-cls-1" x1="75" y1="199.477" y2="199.477"/>
                    <rect className="jkff-cls-2" x="75" y="2.5" width="264.426" height="393.955"/>
                    <polygon className="jkff-cls-2" points="100 199.477 75 185.043 75 213.911 100 199.477"/>
                    <line className="jkff-cls-1" x1="75" y1="347.21" y2="347.21"/>
                    <line className="jkff-cls-1" x1="75" y1="51.744" y2="51.744"/>
                    <line className="jkff-cls-1" x1="339.426" y1="51.744" x2="414.426" y2="51.744"/>
                    <line className="jkff-cls-1" x1="339.426" y1="347.21" x2="414.426" y2="347.21"/>
                    <text className="jkff-cls-3" transform="translate(101.309 64.537)">J</text>
                    <text className="jkff-cls-3" transform="translate(273.941 65.537)">Q</text>
                    <text className="jkff-cls-3" transform="translate(269.957 364.289)">Q’</text>
                    <text className="jkff-cls-3" transform="translate(98.909 363.289)">K</text>
                    <text className="jkff-cls-3" transform="translate(114.077 214.873)">Clk</text>
                </svg>
                <Handle id = 'jkff__output__one' className = 'jkff__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'jkff__output__two' className = 'jkff__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(JKFlipFlop);