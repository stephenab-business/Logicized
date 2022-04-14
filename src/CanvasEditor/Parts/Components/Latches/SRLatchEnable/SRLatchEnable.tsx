import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './SRLatchEnable.scss';
import SRESymbol from './SR_Latch_Enable_Icon.png';


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
            data.inputOne = 0;
            data.inputTwo = 0;
            data.inputThree = 0;
            data.outputOne = 0;
            data.outputTwo = 0;
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
                { /*data.label + ': ' + data.outputOne + ', ' + data.outputTwo*/ }
                <img className='sre-latch-image' src={SRESymbol}></img>
                <Handle id = 'sre__output__one' className = 'sre__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'sre__output__two' className = 'sre__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRLatchEnable);