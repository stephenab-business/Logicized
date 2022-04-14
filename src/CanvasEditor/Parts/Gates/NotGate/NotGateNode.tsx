import React, { memo, FC, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import { getOutputPosition } from '../../../Functions/gateFunctions';
import './NotGateNode.css';
import NotSymbol from './Not_Gate_Icon.png';


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
                {/*data.label + ': ' + data.output*/}
                <img className='not-image' src={NotSymbol}></img>
                <Handle id = 'not__output' className = 'not__output' type = 'source' position = {outputPosition} />
            </div>
        </>
    );
}

export default memo(NotGateNode);