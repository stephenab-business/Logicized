import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './JKLatch.scss';


const JKLatch: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number>(data.outputTwo);
    const inputPosition: Position = getInputPosition(sourcePosition) as Position;
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let j: boolean = !!data.inputOne;
                let k: boolean = !!data.inputTwo;
                const jAnd: boolean = j && !!notOutput;
                const kAnd: boolean = k && !!output; 
                const stateBool: boolean = jAnd ? false : (kAnd ? true : !!notOutput);
                const notStateBool: boolean = kAnd ? false : (jAnd ? true : !!output);
                // const stateBool: boolean = reset ? false : (set ? true : !!notOutput);
                // const notStateBool: boolean = set ? false: (reset ? true : !!output);
                const state: number = +stateBool;
                const notState: number = +notStateBool;
                data.outputOne = state;
                data.outputTwo = notState;
                setOutput(state);
                setNotOutput(notState);
            }, 0);
        } else if (data.modeIsEditing) {
            data.inputOne = 0;
            data.inputTwo = 0;
            data.outputOne = 0;
            data.outputTwo = 1;
            setOutput(data.output);
            setNotOutput(data.outputTwo);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'jk__latch'>
                <Handle id = 'jk__input__one' className = 'jk__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'jk__input__two' className = 'jk__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.outputOne + ', ' + data.outputTwo}
                <Handle id = 'jk__output__one' className = 'jk__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'jk__output__two' className = 'jk__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(JKLatch);