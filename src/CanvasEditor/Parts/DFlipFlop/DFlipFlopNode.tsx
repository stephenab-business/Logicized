import React, { memo, FC, useEffect, useState } from 'react';

import { Handle, Position, NodeProps, useStoreState, Node } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../Functions/gateFunctions';
import './DFlipFlopNode.css';
import { ConnectionMap } from '../../CanvasEditor';



const DFlipFlopNode: FC<NodeProps> = ({ data, sourcePosition = Position.LeftTop }) => {
    const [output, setOutput] = useState<number>(data.output);
    const inputPosition = getInputPosition(sourcePosition);
    const outputPosition = getOutputPosition(sourcePosition);
  

    // Function that computes the actual output value of the D flip flop
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

       
    }, [data]);

    return(
        <>
            <div className = 'd__flip__flop'>
                <Handle id = 'input__one' className = 'd__flip__flop__input__one' type = 'target' position = {sourcePosition} />
                <Handle id = 'd__flip__flop__input__two' className = 'd__flip__flop__input__two' type = 'target' position = {inputPosition} />
                { data.label + ': ' + data.output}
                <Handle id = 'd__flip__flop__output' className = 'd__flip__flop__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(DFlipFlopNode);