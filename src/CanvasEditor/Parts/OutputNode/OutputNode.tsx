import React, { memo, FC, useState, useEffect} from 'react';
import { Handle, Position, NodeProps, } from 'inputs-and-outputs-renderer';
import './OutputNode.css';



const OutputNodeGate: FC<NodeProps> = ({ data }) => {
    const [input, setInput] = useState<number>(data.input);

    useEffect(() => {
        let clock: NodeJS.Timer;
        if (!data.modeIsEditing && data.useClock) {
            clock = setInterval(() => {
                // console.log('ran');
                setInput(data.input);
                // console.log(data.input);
                // console.log('------');
            }, 0);
        } else if (data.modeIsEditing) {
            data.input = 0;
            setInput(data.input);
        }

        return () => {
            clearInterval(clock);
        }


        /* 
        var start = new Date().getTime(),
        time = 0,
        elapsed = 0.0;

        function instance()
        {
            time += 100;

            elapsed = Math.floor(time / 100) / 10;
            if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

            document.title = elapsed;

            var diff = (new Date().getTime() - start) - time;
            window.setTimeout(instance, (100 - diff));
        }

        window.setTimeout(instance, 100)
        */
       
        // let clock: NodeJS.Timer;
        // if (!data.modeIsEditing && data.useClock) {
        //     let start = new Date().getTime();
        //     let time = 0;

        //     const instan = () => {
        //         time += (+data.clockInterval);
        //         setInput(data.input);
        //         console.log(data.input);
        //         console.log('-----')
        //         let diff = (new Date().getTime() - start) - time;
        //         clock = setTimeout(instan, data.clockInterval - diff);
        //     }

        //     clock = setTimeout(instan, data.clockInterval - data.delay);
        // }

        // return () => {
        //     clearTimeout(clock);
        // }

    }, [data]);


    return(
        <>
            <div className = "output__gate">
                <Handle id ='input__a' type = 'target' position = {Position.Left} />
                {data.input}
            </div>
        </>
    );
}

export default memo(OutputNodeGate);