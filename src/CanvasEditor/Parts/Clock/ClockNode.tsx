import { Handle, NodeProps, Position, useStoreState, Node } from 'inputs-and-outputs-renderer';
import React, { useState, useEffect, FC } from 'react';
import { ConnectionMap } from '../../CanvasEditor';

import './ClockNode.css';

const ClockNode: FC<NodeProps> = ({ data, sourcePosition = Position.Right }) => {
    const [initialized, setInitialized] = useState<boolean>(data.initialized);
    const [rising, setRising] = useState<boolean>();
    const [clockTime, setClockTime] = useState<number>(data.clockInterval);
    const [output, setOutput] = useState<boolean>(!!data.initialValue);
    // const nodes = useStoreState((state) => state.nodes);
    // const childNodes: Node[] = [];

    const onRisingClick = () => {
        setRising(true);
    }

    const onFallingClick = () => {
        setRising(false);
    }

    const onChange = (event: any) => {
        setClockTime(event.target.value);
    }

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        data.clockInterval = clockTime;
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
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.initialized) {
            clock = setInterval(() => {
                // data.output = +(!(!!data.output));
                data.output = +!!!data.output;
                setOutput(!!data.output);
                // console.log(data.output);
            }, data.clockInterval);
        }

        else if (data.modeIsEditing && data.initialized) {
            data.output = data.initialValue;
            setOutput(!!data.initialValue);
        }

        return () => {
            clearInterval(clock);
        }
        // nodes.forEach((node) => {
        //     const children = data.children;
        //     children.forEach((child: ConnectionMap) => {
        //         if (child.nodeId === node.id) {
        //             childNodes.push(node);
        //         }
        //     });
        // });
        // let clock: NodeJS.Timer;
        // if (!data.modeIsEditing && data.initialized) {
        //     let start = new Date().getTime();
        //     let time = 0;

        //     const instan = () => {
        //         time += (+data.clockInterval);
        //         data.output = +(!(!!data.output));
        //         console.log(data.output);
        //         setOutput(!!data.output);
        //         let diff = (new Date().getTime() - start) - time;
        //         childNodes.forEach((node) => {
        //             node.data.delay = diff;
        //         });
        //         clock = setTimeout(instan, data.clockInterval - diff);
        //     }

        //     clock = setTimeout(instan, data.clockInterval);
        // }

        // return () => {
        //     clearTimeout(clock);
        // }

    }, [data]);

    return(
        <>
            <div className = 'clock-node'>
                {initialized && 
                <div>
                    <div>{data.output}</div>
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