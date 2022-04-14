import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './DLatchEnable.scss';
import DLESymbol from './D_Latch_Enable_Icon.png';


const DLatchEnable: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
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
                    let d: boolean = !!data.inputOne;
                    let enable: boolean = !!data.inputTwo;
                    // const enableD: boolean = d && enable;
                    // const enableNotD: boolean = !d && enable;
                    // let stateBool: boolean | string;
                    // let notStateBool: boolean | string;
                    // stateBool = enableNotD ? false : (enableD ? true : (notOutput === 'undefined' ? 'undefined' : !!notOutput));
                    // notStateBool = enableD ? false : (enableNotD ? true : (output === 'undefined' ? 'undefined' : !!output));
                    let stateBool : boolean | string;
                    let notStateBool : boolean | string;
                    if (enable) {
                        stateBool = d;
                        notStateBool = !d;
                    }
                    else {
                        stateBool = !!output;
                        notStateBool = !!data.notOutput;
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
            <div className = 'de__latch'>
                <Handle id = 'de__input__one' className = 'de__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'de__input__two' className = 'd__input__two' type = 'target' position = {inputPosition} />
                { /*data.label + ': ' + data.outputOne + ', ' + data.outputTwo*/ }
                <img className='de-latch-image' src={DLESymbol}></img>
                <Handle id = 'de__output__one' className = 'de__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'de__output__two' className = 'de__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(DLatchEnable);