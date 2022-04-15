import React, { memo, FC, useState } from 'react';
import { Handle, Position, NodeProps, XYPosition } from 'inputs-and-outputs-renderer';
import './Switch.scss';

let dragging: boolean = false;
const Switch: FC<NodeProps> = ({ data, sourcePosition = Position.Right }) => {
    const [output, setOutput] = useState<number>(data.output);
    const [position, setPosition] = useState<XYPosition>();

    const flipSwitch = () => {
        data.output = +!!!data.output;
        setOutput(data.output);
    }

    const onMouseDown = () => {
        dragging = false;
    }

    const onMouseMove = () => {
        dragging = true;
    }

    const onMouseUp = () => {
        if (!dragging) {
            flipSwitch();
        }
    }

    return(
        <>
            <div className = 'switch__gate' onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                <svg viewBox="0 0 243.973 105">
                    <line className="switch-cls-1" x1="82.274" y1="55.855" x2="157.274" y2="55.855"/>
                    <rect className="switch-cls-2" x="2.5" y="2.5" width="166.473" height="100"/>
                    <line className="switch-cls-1" x1="168.973" y1="52.5" x2="243.973" y2="52.5"/>
                    <line className="switch-cls-1" x1="98.973" y1="52.5" x2="168.973" y2="52.5"/>
                    <circle className="switch-cls-2" cx="101.274" cy="52.5" r="10"/>
                    <polyline className="switch-cls-1" points="2.5 52.5 23.941 52.5 96.457 13.339"/>
                </svg>
                <Handle id = 'switch__output' className = 'switch__output' type = 'source' position = {sourcePosition} />
            </div>
        </>
    );
}

export default memo(Switch);