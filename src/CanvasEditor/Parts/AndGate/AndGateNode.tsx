import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, } from 'inputs-and-outputs-renderer';
import './AndGateNode.css';

const AndGateNode: FC<NodeProps> = ({data}) => {
    const nodes = useStoreState((state) => state.nodes);
    const thisNode = nodes.find((node) => node.id === data.id);

    // Function that computes the actual output value of the AND gate
    useEffect(() => {
        if (thisNode) {
            let inputOne: number;
            let inputTwo: number;
            if (thisNode.data.inputOneConnected && thisNode.data.inputTwoConnected) {
                inputOne = thisNode.data.inputOne;
                inputTwo = thisNode.data.inputTwo;
                const actualOutput = !!inputOne && !!inputTwo;
                const output = +actualOutput;
                thisNode.data.output = output;
            }
        }
    });

    const onConnect = (params: Connection | Edge) => {
        console.log("onConnect has run");
        const thisNode = nodes.find((node) => node.id === data.id);
        console.log(thisNode);
    }

    return(
        <>
            <div className = 'and__gate'>
                <Handle id = 'input__one' className = 'and__input__one' type = 'source' position = {Position.LeftTop} onConnect = {onConnect} />
                <Handle id = 'and__input__two' className = 'and__input__two' type = 'source' position = {Position.LeftBottom} onConnect = {onConnect}/>
                { data.label }
                <Handle id = 'and__output' className = 'and__output' type = 'target' position = {Position.Right} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(AndGateNode);