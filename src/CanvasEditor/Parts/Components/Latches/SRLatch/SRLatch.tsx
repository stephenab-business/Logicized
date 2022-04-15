import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './SRLatch.scss';


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
                <svg viewBox="0 0 414.426 398.955">
                    <rect className="sr-cls-1" x="75" y="2.5" width="264.426" height="393.955"/>
                    <line className="sr-cls-2" x1="75" y1="347.211" y2="347.211"/>
                    <line className="sr-cls-2" x1="75" y1="51.745" y2="51.745"/>
                    <line className="sr-cls-2" x1="339.426" y1="51.745" x2="414.426" y2="51.745"/>
                    <line className="sr-cls-2" x1="339.426" y1="347.211" x2="414.426" y2="347.211"/>
                    <text className="sr-cls-3" transform="translate(101.792 64.538)">S</text>
                    <text className="sr-cls-3" transform="translate(273.424 65.538)">Q</text>
                    <text className="sr-cls-3" transform="translate(269.44 364.29)">Q’</text>
                    <text className="sr-cls-3" transform="translate(99.392 363.29)">R</text>
                </svg>
                <Handle id = 'sr__output__one' className = 'sr__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'sr__output__two' className = 'sr__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRLatch);