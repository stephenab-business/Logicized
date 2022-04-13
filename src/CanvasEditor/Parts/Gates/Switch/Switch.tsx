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
                { data.output }
                <Handle id = 'switch__output' className = 'switch__output' type = 'source' position = {sourcePosition} />
            </div>
        </>
    );
}

export default memo(Switch);