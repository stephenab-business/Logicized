import React, { useState, useEffect, FC } from 'react';
import { Handle, NodeProps, Position } from 'inputs-and-outputs-renderer';
import './ClockNode.css';

const ClockNode: FC<NodeProps> = ({ data, sourcePosition = Position.Right }) => {
    const [initialized, setInitialized] = useState<boolean>(data.initialized);
    const [output, setOutput] = useState<boolean>(!!data.initialValue);

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.initialized) {
            clock = setInterval(() => {
                data.output = +!!!data.output;
                setOutput(!!data.output);
            }, Number(data.clockInterval) + Number(data.propDelay));
        }

        else if (data.modeIsEditing && data.initialized) {
            data.output = data.initialValue;
            setOutput(!!data.initialValue);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);

    return(
        <>
            <div className = 'clock-node'>
                {initialized && 
                <div>
                    <svg viewBox="0 0 222.532 105">
                        <line className="clock-cls-1" x1="147.532" y1="52.5" x2="222.532" y2="52.5"/>
                        <rect className="clock-cls-2" x="2.5" y="2.5" width="145.032" height="100"/>
                        <text className="clock-cls-3" transform="translate(41.463 68.13)">Clk</text>
                    </svg>
                    <Handle id = 'clock__output' className = 'clock__output' type = 'source' position = {sourcePosition} />
                </div>
                }
            </div>
        </>
    );
}

export default ClockNode;