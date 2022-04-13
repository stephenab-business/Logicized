import React, { memo, FC, useState, useEffect} from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import './OutputNode.css';

const OutputNodeGate: FC<NodeProps> = ({ data, sourcePosition = Position.Left }) => {
    const [input, setInput] = useState<number | string>(data.input);

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing) {
            clock = setInterval(() => {
                setInput(data.input);
            }, 0);
        } else if (data.modeIsEditing) {
            data.input = 'undefined';
            setInput(data.input);
        }

        return () => {
            clearInterval(clock);
        }
    }, [data]);


    return(
        <>
            <div className = "output__gate">
                <Handle id ='input__a' type = 'target' position = {sourcePosition} />
                {data.input}
            </div>
        </>
    );
}

export default memo(OutputNodeGate);