import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../Functions/gateFunctions';
import './AndGateNode.css';
import { ConnectionMap } from '../../CanvasEditor';



const AndGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.output);
    const inputPosition = getInputPosition(sourcePosition);
    const outputPosition = getOutputPosition(sourcePosition);
    // const nodes = useStoreState((state) => state.nodes);
    // const childNodes: Node[] = [];

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                let inputOne: number = data.inputOne;
                let inputTwo: number = data.inputTwo;
                const boolOutput = !!inputOne && !!inputTwo;
                const output = +boolOutput;
                data.output = output;
                setOutput(output);
            }, 0);
        } else if (data.modeIsEditing) {
            data.inputOne = 0;
            data.inputTwo = 0;
            data.output = 0;
            setOutput(data.output);
        }

        return () => {
            clearInterval(clock);
        }

        // let clock: NodeJS.Timer;
        // if (!data.modeIsEditing && data.useClock) {
        //     let start = new Date().getTime();
        //     let time = 0;
        //     const instan = () => {
        //         time += (+data.clockInterval);
        //         let inputOne = data.inputOne;
        //         let inputTwo = data.inputTwo;
        //         const actualOutput = !!inputOne && !!inputTwo;
        //         const output = +actualOutput;
        //         data.output = output;
        //         console.log(inputOne);
        //         console.log(inputTwo);
        //         console.log(output);
        //         setOutput(data.output);
        //         let diff = (new Date().getTime() - start) - time;
        //         childNodes.forEach((node) => {
        //             node.data.delay = diff;
        //         });
        //         clock = setTimeout(instan, data.clockInterval - diff);
        //     }

        //     clock = setTimeout(instan, data.clockInterval - data.delay);
        // }

        // return () => {
        //     clearTimeout(clock);
        // }
    }, [data]);

    return(
        <>
            <div className = 'and__gate'>
                <Handle id = 'input__one' className = 'and__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'and__input__two' className = 'and__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.output}
                <Handle id = 'and__output' className = 'and__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(AndGateNode);