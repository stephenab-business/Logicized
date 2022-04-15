import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getOutputPosition } from '../../../../Functions/gateFunctions';
import './DLatch.scss';


const DLatch: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number | string>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number | string>(data.outputTwo);
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
            }, data.propDelay);
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
            <div className = 'd__latch'>
                <Handle id = 'd__input' className = 'd__input__one' type = 'target' position = {sourcePosition} />
                <svg viewBox="0 0 414.426 398.955">
                    <rect className="dl-cls-1" x="75" y="2.5" width="264.426" height="393.955"/>
                    <line className="dl-cls-2" x1="75" y1="51.745" y2="51.745"/>
                    <line className="dl-cls-2" x1="339.426" y1="51.745" x2="414.426" y2="51.745"/>
                    <line className="dl-cls-2" x1="339.426" y1="347.211" x2="414.426" y2="347.211"/>
                    <text className="dl-cls-3" transform="translate(101.24 65.767)">D</text>
                    <text className="dl-cls-3" transform="translate(273.44 65.767)">Q</text>
                    <text className="dl-cls-3" transform="translate(269.456 364.519)">Q’</text>
                </svg>
                <Handle id = 'd__output__one' className = 'd__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'd__output__two' className = 'd__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(DLatch);