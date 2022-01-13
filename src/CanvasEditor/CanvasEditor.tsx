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
    useStoreState,
    XYPosition,
    isNode,
    useStoreActions
} from 'inputs-and-outputs-renderer';
import { PartsMenu } from './PartsMenu';
import AndGateNode from './Parts/AndGate/AndGateNode';
import InputGateNode from './Parts/InputNode/InputNode';
import OutputGateNode from './Parts/OutputNode/OutputNode';
import FreeCommentNode from './Parts/Comments/FreeComment/FreeCommentNode';
import NodeCommentNode from './Parts/Comments/NodeComment/NodeCommentNode';
import NotGateNode from './Parts/NotGate/NotGateNode';
import { useClipboardShortcuts } from './Functions/useClipboardShortcuts';
import './canvas.css';
import { setSelectedElements } from 'inputs-and-outputs-renderer/dist/store/actions';

// Any type of Node that is created must be passed as a type here
const nodeTypes = {
    andGate: AndGateNode,
    notGate: NotGateNode,
    inputGate: InputGateNode,
    outputGate: OutputGateNode,
    freeComment: FreeCommentNode,
    nodeComment: NodeCommentNode
};

const initialElements: Elements = [];

let passedSelection: Elements = [];
let currentSelection: Elements = [];

// DEFINE MORE ID FUNCTIONS SO THAT WE DON'T GET THESE BLAND ID'S FOR OUR NODES AND CAN ACTUALLY SEE WHICH IS WHICH
let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const CanvasEditor = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements);
    const storeSelected = useStoreState((state) => state.selectedElements);
    const setStoreSelected = useStoreActions((actions) => actions.setSelectedElements);
    // const [currentSelection, setCurrentSelection] = useState<Elements | null>(storeSelected);
    const nodeCommentOffset: number = 42;
    // let currentSelection: Elements = [];
    const [selectedElements, setSelectedElements] = useState<Elements>([]);

    const onConnect = (params: Edge | Connection) => {
        setElements((elements) => addEdge(params, elements));
        console.log(elements);
    }
    const onElementsRemove = (elementsToRemove: Elements) => {
        // If element is Node, and that Node has a Node Comment
        for (let i = 0; i < elementsToRemove.length; i++) {
            if (isNode(elementsToRemove[i])) {
                const node: Node = elementsToRemove[i] as Node;
                // If element is normal Node
                if (node.type !== 'nodeComment') {
                    if (node.data.comment === true) {
                        const id = node.data.commentId;
                        const commentNode = elements.find((element) => element.id === id) as Node;
                        elementsToRemove.push(commentNode);
                    }
                }
                // Else if element is Node Comment
                else if (node.type === 'nodeComment') {
                    const id = node.data.id;
                    const parentNode: Node = elements.find((element) => element.data.commentId === id) as Node;
                    parentNode.data.comment = false;
                    parentNode.data.commentId = '';
                }
            }
            
            // Else
        }
        setElements((elements) => removeElements(elementsToRemove, elements));
        console.log(elements);
    }
    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }

    // THIS ISN'T FINISHED
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
        
        //THIS IS WHERE NEW NODES WILL BE ADDED TO ENABLE DRAG AND DROP
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
                    data: { 
                        comment: false,
                        commentId: ''
                    },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'input') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { 
                        comment: false,
                        commentId: ''
                    },
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'output') {
                const newNode = {
                    id: getId(),
                    type: passedType,
                    position,
                    data: { 
                        comment: false,
                        commentId: ''
                    },
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
                    output: 0,
                    comment: false,
                    commentId: ''
                 };
                const newNode = {
                    id,
                    type,
                    position,
                    data,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'not') {
                const id = getId();
                const type = 'notGate';
                const data = {
                    id,
                    input: 0,
                    output: 0,
                    comment: false,
                    commentId: ''
                };
                const sourcePosition = Position.Top;
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                    sourcePosition,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'outputgate') {
                const id = getId();
                const type = 'outputGate';
                const data = {
                    id,
                    input: 0,
                    comment: false,
                    commentId: ''
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
                    comment: false,
                    commentId: ''
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                setElements((elements) => elements.concat(newNode));
            }
            else if (passedType === 'inputGround') {
                const id = getId();
                const type = 'inputGate';
                const data = {
                    output: 0,
                    comment: false,
                    commentId: ''
                }
                const newNode = {
                    id,
                    type,
                    data,
                    position
                }
                setElements((elements) => elements.concat(newNode));
            }
        }
    }

    // const blockComment = (event: React.MouseEvent<Element, MouseEvent>, selectedElements: Elements) => {
    //     if (selectedElements.length > 1) {
    //         // Press c
    //         // Get selection bounding rectangle
    //         // Pass the width of rect
    //         // Pass the height of rect
    //         // Create node and add to elements
    //         // Edit onNodeDrag to move all nodes that are in the Block Comment
    //         /* Edit onNodeDrag: 
    //             If the user moves a Node outside of the Block Comment, it will remove the Node from that Block Comment (no longer moves with Block Comment)
    //         */
    //     }
    // }

    // Creates a Node Comment if a node is clicked, enters Comment editing if a Comment is clicked
    const onNodeDoubleClick = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        if (node.type === 'freeComment' || node.type === 'nodeComment') {
            node.data.edit = true;
        } else if (node.data.comment !== true) {
            const divElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLDivElement;
            const width = divElement.offsetWidth;
            const position: XYPosition = { x: node.position.x, y: node.position.y - nodeCommentOffset};
            const id = getId();
            const type = 'nodeComment';
            const data = {
                id,
                content: '',
                initialized: false,
                edit: false,
                submitted: false,
                typing: false,
                width,
            };
            const newNode = {
                id,
                type,
                data,
                position,
            };
            
            setElements((elements) => elements.concat(newNode));
            node.data.comment = true;
            node.data.commentId = id;
            // Set the only selected element to be the Node Comment
            setStoreSelected([newNode]);
            currentSelection = [newNode];
        }
    }

    // Function handles the dragging of either a Node that has Node Comment attached, or a Node Comment that is attached to a Node
    const onNodeDrag = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        if (node.type === 'nodeComment') {
            // This means we are in the comment that is attached to a node
            // Find the corresponding node by using the comment id to find the comment id in the node.data.commentId
            const parentNode = elements.find((parentNode) => parentNode.data.commentId === node.id) as Node;
            const parentNodePos: XYPosition = { x: node.position.x, y: node.position.y + nodeCommentOffset };
            const updatedParentNode: Node = {
                ...parentNode,
                position: parentNodePos,
            }
            setElements(removeElements([parentNode], elements));
            setElements((elements) => elements.concat(updatedParentNode));
        } else if (node.data.comment === true) {
            // This means we are in the node that the comment is attached to
            // Find the comment id, use that to update its position along with the node position
            const commentId = node.data.commentId;
            const commentNode = elements.find((node) => node.id === commentId) as Node;
            const commentNodePos: XYPosition = { x: node.position.x, y: node.position.y - nodeCommentOffset };
            const updatedCommentNode: Node = {
                ...commentNode,
                position: commentNodePos,
            }
            setElements(removeElements([commentNode], elements));
            setElements((elements) => elements.concat(updatedCommentNode));
        }
    }

    // Function removes all selected elements whenever the canvas is just clicked
    const onPaneClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        if (reactFlowInstance) {
            setStoreSelected([]);
            onSelectionChange([]);
        }
    }

    // Function creates Free Comment at mouse location
    const onCanvasDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (reactFlowInstance) {
            const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
            const elementBelowIsCanvas = elementBelow?.classList.contains('react-flow__pane') || false;
            if (elementBelowIsCanvas) {
                const position = reactFlowInstance.project({ x: event.clientX - 285, y: event.clientY - 20});
                const id = getId();
                const type = 'freeComment';
                const data = {
                    id,
                    content: '',
                    initialized: false,
                    edit: false,
                    submitted: false,
                    typing: false
                };
                const newNode = {
                    id,
                    type,
                    data,
                    position,
                };
                
                setElements((elements) => elements.concat(newNode));
                
                // Set the only selected element to be the Node Comment
                setStoreSelected([newNode]);
                currentSelection = [newNode];   
            }
        }
    }

    // On any selection change, it unsets all of the previously selected values and will add only the newly selected elements
    const onSelectionChange = (passedElements: Elements | null) => {

        if (passedElements !== null && passedElements !== selectedElements) {
            console.log(currentSelection);
            console.log(passedElements);
            console.log(selectedElements);
            passedSelection = [];
            passedSelection = passedElements;
            console.log(passedSelection);
        } else {

        

        console.log(selectedElements);

        // Helper Function
        const removeStoreSelection = (id: ElementId) => {
            const currentStoreSelection = storeSelected;
            const index = currentStoreSelection?.findIndex((element) => element.id === id);
            const editedStoreSelection: Elements | null = [];
            if (currentStoreSelection) {
                for (let i = 0; i < currentStoreSelection.length; i++) {
                    if (i === index) {
                        continue;
                    } else {
                        editedStoreSelection.push(currentStoreSelection[i]);
                    }
                }
                setStoreSelected(editedStoreSelection);
            }
        } 

        if (passedElements !== null && currentSelection !== null) {
            if (currentSelection.length === 1 && isNode(currentSelection[0])) {
                if (currentSelection[0].type === 'nodeComment') {
                    const nodeComment: Node = currentSelection[0];
                    if (!nodeComment.data.initialized && nodeComment.data.content.length === 0) {
                        const parentNode: Node = elements.find((element) => element.data.commentId === nodeComment.id) as Node;
                        parentNode.data.comment = false;
                        parentNode.data.commentId = '';
                        currentSelection = [];
                        setElements((elements) => removeElements([nodeComment], elements));
                        removeStoreSelection(nodeComment.id);
                    } else if (nodeComment.data.edit && !nodeComment.data.typing) {
                        nodeComment.data.edit = false;
                    }
                    // CAN ADD A FEATURE HERE WHERE IF YOU CLICK OFF OF COMMENT, IT AUTOMATICALLY SUBMITS IT
                } else if (currentSelection[0].type === 'freeComment') {
                    const freeComment: Node = currentSelection[0];
                    if (!freeComment.data.initialized && !freeComment.data.typing) {
                        setElements((elements) => removeElements([freeComment], elements));
                        currentSelection = [];
                        removeStoreSelection(freeComment.id);
                    } else if (freeComment.data.edit && !freeComment.data.typing) {
                        freeComment.data.edit = false;
                    }
                }
            }
            currentSelection = passedElements;
        }
    }
    }



    useClipboardShortcuts(elements, storeSelected, onElementsRemove, setElements);

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
                        onNodeDoubleClick = {onNodeDoubleClick}
                        // onClick = {onCanvasClick}
                        onPaneClick={onPaneClick}
                        onDoubleClick = {onCanvasDoubleClick}
                        onNodeDrag = {onNodeDrag}
                        deleteKeyCode={['Backspace', 'x']}
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