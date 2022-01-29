import { NodeProps } from 'inputs-and-outputs-renderer';
import { useState, useEffect, FC } from 'react';

import './ClockNode.css';

interface ClockNodeProps {
    nodeProps: NodeProps;
    mode: string;
    clockTime: number;
    initialValue: boolean;
}

const ClockNode: FC<ClockNodeProps> = ({ nodeProps, mode, clockTime, initialValue }) => {
    // this allows us to use this same file for both rising edge and falling edge
    const [input, setInput] = useState<boolean>(initialValue);

    useEffect(() => {
        // If mode is simulating, start the clock
        if (mode === 'simulating') {
            setTimeout(() => {
                nodeProps.data.value = !input;
                setInput(!input);
            }, clockTime);
        }
        // Else, mode is editing, reset input
        else {
            nodeProps.data.value = initialValue;
            setInput(initialValue);
        }
    }, [input, mode]);

    return(
        <div className = "clock-node">
            {input}
        </div>
    );
}

export default ClockNode;