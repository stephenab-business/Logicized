import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions';
import './SRLatch.scss';


const SRLatch: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.outputOne);
    const [notOutput, setNotOutput] = useState<number>(data.outputTwo);
    const inputPosition = getInputPosition(sourcePosition);
    const outputPosition = getOutputPosition(sourcePosition, 2);
    const outputOnePosition: Position = outputPosition[0] as Position;
    const outputTwoPosition: Position = outputPosition[1] as Position;
    // const nodes = useStoreState((state) => state.nodes);
    // const childNodes: Node[] = [];

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let set: boolean = !!data.inputTwo;
                let reset: boolean = !!data.inputOne;
                // if (set) {
                //     const boolNotOutput = false;
                //     const otherOutput = +boolNotOutput;
                //     data.outputTwo = otherOutput;
                //     setNotOutput(otherOutput);
                // } else {
                //     const boolNotOutput = !set && !!!output;
                //     const otherOutput = +boolNotOutput;
                //     data.outputTwo = otherOutput;
                //     setNotOutput(otherOutput);
                // }
                // if (reset) {
                //     const actualOutput = 0;
                //     data.outputOne = actualOutput;
                //     setOutput(actualOutput);
                // } else {
                //     const boolOutput = !reset && !!!notOutput;
                //     const actualOutput = +boolOutput;
                //     data.outputOne = actualOutput;
                //     setOutput(actualOutput);
                // }
                const boolOutput = !reset && !!!notOutput;
                const actualOutput = +boolOutput;
                const boolNotOutput = !set && !!!output;
                const otherOutput = +boolNotOutput;
                data.outputOne = actualOutput;
                data.outputTwo = otherOutput;
                setOutput(actualOutput);
                setNotOutput(otherOutput);
            }, 0);
        } else if (data.modeIsEditing) {
            data.inputOne = 0;
            data.inputTwo = 0;
            data.outputOne = 0;
            data.outputTwo = 1;
            setOutput(data.output);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'sr__latch'>
                <Handle id = 'sr__input__one' className = 'and__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'sr__input__two' className = 'and__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.outputOne + ', ' + data.outputTwo}
                <Handle id = 'sr__output__one' className = 'sr__output__one' type = 'source' position = {outputOnePosition} />
                <Handle id = 'sr__output__two' className = 'sr__output__two' type = 'source' position = {outputTwoPosition} />
            </div>
        </>
    );
}

export default memo(SRLatch);