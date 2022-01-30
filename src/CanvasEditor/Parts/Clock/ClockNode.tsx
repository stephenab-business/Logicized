import { Handle, NodeProps, Position } from 'inputs-and-outputs-renderer';
import React, { useState, useEffect, FC } from 'react';

import './ClockNode.css';

const ClockNode: FC<NodeProps> = ({ data, sourcePosition = Position.Right }) => {
    const [initialized, setInitialized] = useState<boolean>(data.initialized);
    const [rising, setRising] = useState<boolean>();
    const [clockTime, setClockTime] = useState<number>();
    const [output, setOutput] = useState<boolean>(!!data.initialValue);

    const onRisingClick = () => {
        console.log('rising');
        setRising(true);
    }

    const onFallingClick = () => {
        console.log('falling');
        setRising(false);
    }

    const onChange = (event: any) => {
        setClockTime(event.target.value);
    }

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        data.clockTime = clockTime;
        if (rising) {
            data.initialValue = 0;
            data.output = 0;
        } else {
            data.initialValue = 1;
            data.output = 1;
        }
        data.initialized = true;
        setInitialized(true);
    }

    useEffect(() => {
        if (!data.modeIsEditing && initialized) {
            setTimeout(() => {
                data.output = !output;
                setOutput(!output);
            }, data.clockTime);
        } else if (data.modeIsEditing && data.initialized) {
            data.output = data.initialValue;
            setOutput(!!data.initialValue);
        }
    }, [initialized, output, data]);

    // BUG:
    // Double clicking the increment button creates a comment node, which is should not do

    return(
        <>
            <div className = 'clock-node'>
                {initialized && 
                <div>
                    <div>{+output}</div>
                    <Handle id = 'clock__handle' className = 'clock__handle' type = 'source' position = {sourcePosition} />
                </div>
                }
                {!initialized &&
                    <div id = 'clock-modal' className='clock-modal'>
                        <form onSubmit={submit}>
                            <div>
                                <input id='rising' type='radio' onClick={onRisingClick} name='risingOrFalling' required></input>
                                <label htmlFor='rising'>Rising Edge</label>
                            </div>
                            <div>
                                <input id='falling' type='radio' onClick={onFallingClick} name='risingOrFalling' required></input>
                                <label htmlFor='falling'>Falling Edge</label>
                            </div>
                            <input type='number' onChange={onChange} required></input>
                            <button onClick={submit}>Ok</button>
                        </form>
                    </div>
                }
            </div>
        </>
    );
}

export default ClockNode;