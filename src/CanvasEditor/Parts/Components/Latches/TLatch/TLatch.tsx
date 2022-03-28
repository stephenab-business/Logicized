import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './TLatch.scss';


const TLatch: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number>(data.outputTwo);
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let t: boolean = !!data.input
                let tAnd: boolean = t && !!output;
                let tAndNot: boolean = t && !!notOutput;
                const stateBool: boolean = !tAnd ? false : (tAndNot ? true : !!notOutput) ;
                const notStateBool: boolean = tAndNot ? false : (!tAnd ? true : !!output);
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
            <div className = 't__latch'>
                <Handle id = 't__input' className = 't__input__one' type = 'target' position = {sourcePosition} />
                { data.label + ': ' + data.outputOne + ', ' + data.outputTwo}
                <Handle id = 't__output__one' className = 't__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 't__output__two' className = 't__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(TLatch);