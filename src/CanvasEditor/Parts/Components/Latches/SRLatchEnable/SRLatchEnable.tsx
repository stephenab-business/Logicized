import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './SRLatchEnable.scss';


const SRLatchEnable: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number>(data.outputTwo);
    const inputPosition: Position[] = getInputPosition(sourcePosition, 3) as Position[];
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;


    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let reset: boolean = !!data.inputOne;
                let enable: boolean = !!data.inputTwo;
                let set: boolean = !!data.inputThree;
                const stateBool: boolean = enable ? (reset ? false : (set ? true : !!notOutput)) : false;
                const notStateBool: boolean = enable ? (set ? false : (reset ? true : !!output)) : false;
                const state: number = +stateBool;
                const notState: number = +notStateBool;
                data.outputOne = state;
                data.outputTwo = notState;
                setOutput(state);
                setNotOutput(notState);
            }, data.propDelay);
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
            <div className = 'sr__latch__enable'>
                <Handle id = 'sre__input__one' className = 'sre__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'sre__input__two' className = 'sre__input__two' type = 'target' position = {inputPosition[1] as Position} />
                <Handle id = 'sre__input__three' className = 'sre__input__three' type = 'target' position = { inputPosition[0] as Position } />
                <svg viewBox="0 0 414.426 398.955">
                    <rect className="sre-cls-1" x="75" y="2.5" width="264.426" height="393.955"/>
                    <line className="sre-cls-2" x1="75" y1="347.211" y2="347.211"/>
                    <line className="sre-cls-2" x1="75" y1="51.745" y2="51.745"/>
                    <line className="sre-cls-2" x1="339.426" y1="51.745" x2="414.426" y2="51.745"/>
                    <line className="sre-cls-2" x1="339.426" y1="347.211" x2="414.426" y2="347.211"/>
                    <text className="sre-cls-3" transform="translate(101.792 64.538)">S</text>
                    <text className="sre-cls-3" transform="translate(273.424 65.538)">Q</text>
                    <text className="sre-cls-3" transform="translate(269.44 364.29)">Q’</text>
                    <text className="sre-cls-3" transform="translate(99.392 363.29)">R</text>
                    <text className="sre-cls-3" transform="translate(100.4 214.778)">E</text>
                    <line className="sre-cls-2" x1="75" y1="199.477" y2="199.477"/>
                </svg>
                <Handle id = 'sre__output__one' className = 'sre__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'sre__output__two' className = 'sre__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRLatchEnable);