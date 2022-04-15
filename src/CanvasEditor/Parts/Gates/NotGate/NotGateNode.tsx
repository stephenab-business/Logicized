import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getOutputPosition } from '../../../Functions/gateFunctions';
import './NotGateNode.css';


const NotGateNode: FC<NodeProps> = ({ data, sourcePosition = Position.Left }) => {
    const [output, setOutput] = useState<number | string>(data.output);
    const outputPosition = getOutputPosition(sourcePosition) as Position;

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                if (data.input !== 'undefined') {
                    let input: number = data.input;
                    const boolOutput = !!!input;
                    const output = +boolOutput;
                    data.output = output;
                    setOutput(data.output);
                }
                else {
                    data.output = 'undefined';
                    setOutput(data.output);
                }
            }, data.propDelay);
        } else if (data.modeIsEditing) {
            data.input = 'undefined';
            data.output = 'undefined';
            setOutput(data.output);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'not__gate'>
                <Handle id = 'not__input' className = 'not__input' type = 'target' position = {sourcePosition} />
                <svg viewBox="0 0 212 67.698">
                    <polygon className="not-cls-1" points="75 4.771 117 33.849 75 62.926 75 4.771"/>
                    <line className="not-cls-2" y1="33.849" x2="75" y2="33.849"/>
                    <line className="not-cls-2" x1="137" y1="33.849" x2="212" y2="33.849"/>
                    <circle className="not-cls-1" cx="127" cy="33.849" r="10"/></svg>
                <Handle id = 'not__output' className = 'not__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(NotGateNode);