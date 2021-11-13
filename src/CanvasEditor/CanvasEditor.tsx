import React, { useState, DragEvent, useEffect } from 'react';
import ReactFlow, {
    Background,
    addEdge,
    removeElements,
    ReactFlowProvider,
    Elements,
    Connection,
    Edge,
    OnLoadParams,
    ElementId,
    Position,
    Node,
    updateEdge,
    useStoreState
} from 'inputs-and-outputs-renderer';
import { PartsMenu } from './PartsMenu';
import AndGateNode from './Parts/AndGate/AndGateNode';
import InputGateNode from './Parts/InputNode/InputNode';
import OutputGateNode from './Parts/OutputNode/OutputNode';
import { useClipboardShortcuts } from './Functions/useClipboardShortcuts';
import './canvas.css';

// Any type of Node that is created must be passed as a type here
const nodeTypes = {
    andGate: AndGateNode,
    inputGate: InputGateNode,
    outputGate: OutputGateNode
};

const initialElements: Elements = [];

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const CanvasEditor = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements);
    const [selectedElements, setSelectedElements] = useState<Elements | null>([]);
    const storeSelected = useStoreState((state) => state.selectedElements);
    
    const onConnect = (params: Edge | Connection) => {
        setElements((elements) => addEdge(params, elements));
        console.log(elements);
    }
    const onElementsRemove = (elementsToRemove: Elements) => {
        setElements((elements) => removeElements(elementsToRemove, elements));
        console.log(elements);
    }
    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }

    // TESTING THE UPDATING OF A CONNECTION
    const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
        setElements((els) => updateEdge(oldEdge, newConnection, els));
        // Update the old path variables
        // Update the new connection variables
    }

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        // THIS IS WHERE NEW NODES WILL BE ADDED TO ENABLE DRAG AND DROP
        if (reactFlowInstance) {
            const passedType = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({ x: event.clientX - 285, y: event.clientY - 20});
            if (passedType === 'horizontal-input') {
                const type = 'input';
                const sourcePosition = Position.Right;
                const newNode = {
                    id: getId(),
                    type,
                    sourcePosition,
                    position,
                    data: { },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'input') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'output') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'and') {
                const id = getId();
                const type = 'andGate';
                const data = { 
                    id,
                    label: 'AND',
                    inputOne: 0,
                    inputTwo: 0,
                    output: 0
                 };
                const newNode = {
                    id,
                    type,
                    position,
                    data: data,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'outputgate') {
                const id = getId();
                const type = 'outputGate';
                const data = {
                    id,
                    input: 0
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'inputgate') {
                const id = getId();
                const type = 'inputGate';
                const data = {
                    output: 1,
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
        }
    }

    const onSelectionChange = (passedElements: Elements | null) => {
        if (selectedElements !== passedElements && passedElements !== null) {
            console.log(selectedElements);
            console.log(passedElements);
            setSelectedElements(removeElements(elements, elements));
            setSelectedElements(passedElements);
        }
    }

    useEffect(() => {
        onSelectionChange(storeSelected);
    });

    useClipboardShortcuts(elements, selectedElements, onElementsRemove, setElements);

    // For Debugging
    const onNodeClick = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        console.log(node);
    }

    return(
        <div className = "canvas-editor">
            <ReactFlowProvider>
            <PartsMenu />
                <div className = "reactflow-wrapper">
                    <ReactFlow 
                        elements = {elements}
                        onConnect = {onConnect}
                        onElementsRemove = {onElementsRemove}
                        onEdgeUpdate={onEdgeUpdate}
                        onLoad = {onLoad}
                        onDrop = {onDrop}
                        onDragOver = {onDragOver}
                        style = {{height: window.innerHeight}}
                        nodeTypes = {nodeTypes}
                        className = "flow-canvas"
                        nodesConnectable = {true}
                        onSelectionChange = {onSelectionChange}
                        onNodeDoubleClick = {onNodeClick}
                    >
                        <Background 
                            gap = {12}
                            size = {1}
                        />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );

}

export default CanvasEditor;