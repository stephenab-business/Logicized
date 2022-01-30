import React, { useState, DragEvent, useEffect, useRef, useCallback, FC, useMemo } from 'react';
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
    Node,
    updateEdge,
    useStoreState,
    XYPosition,
    isNode,
    useStoreActions,
    
} from 'inputs-and-outputs-renderer';
import { PartsMenu } from './PartsMenu';

import { nodeTypes } from './Parts';

import { useClipboardShortcuts } from './Functions/useClipboardShortcuts';
import './canvas.css';
import { createNode } from './Functions/createNode';
import { setNodeStyles, undoNodeSelection, undoNormalSelection } from './Functions/domFunctions';

const initialElements: Elements = [];
const initialSelected: Elements = [];

let localSelection: Elements = [];
let commentSelection: Node[] = [];

// DEFINE MORE ID FUNCTIONS SO THAT WE DON'T GET THESE BLAND ID'S FOR OUR NODES AND CAN ACTUALLY SEE WHICH IS WHICH
let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

interface CanvasEditorProps {
    mode: string;
}

// Mode will be either Editing or Simulating 
const CanvasEditor: FC<CanvasEditorProps> = ({ mode }) => {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements);
    const [selected, setSelected] = useState<Elements>(initialSelected);
    const [editing, setEditing] = useState<boolean>(mode === 'editing');
    const onGoingEdgeUpdate = useRef(false);
    const nodeCommentOffset: number = 42;
    const selectionKeys = ['ShiftLeft', 'ShiftRight', 'Shift'];
    const selecting = useRef(false);

    const onConnect = (params: Edge | Connection) => {
        setElements((elements) => addEdge(params, elements));
        console.log(elements);
    }

    const onElementsRemove = (elementsToRemove: Elements) => {
        // If element is Node, and that Node has a Node Comment
        for (let i = 0; i < elementsToRemove.length; i++) {
            if (isNode(elementsToRemove[i])) {
                const node: Node = elementsToRemove[i] as Node;
                // If element is any node type besides a Node Comment
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
        }
        setElements((elements) => removeElements(elementsToRemove, elements));
        console.log(elements);
    }

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }

    const onEdgeUpdateStart = useCallback(() => {
        onGoingEdgeUpdate.current = true;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
        onGoingEdgeUpdate.current = false;
        setElements((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (onGoingEdgeUpdate.current) {
            setElements((elements) => elements.filter((element) => element.id !== edge.id));
        }
    }, []);

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    const onDrop = (event: DragEvent) => {
        event.preventDefault();  
        createNode(event, reactFlowInstance, getId, setElements, editing);
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
            commentSelection = [newNode];
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
            onSelectionChange([]);
            undoNormalSelection();
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
                commentSelection = [newNode]; 
            }
        }
    } 

    const onSelectionDown = (event: KeyboardEvent) => {
        if (selectionKeys.includes(event.key) || selectionKeys.includes(event.code)) {
            console.log('true');
            selecting.current = true;
        }
    }

    const onSelectionUp = (event: KeyboardEvent) => {
        if (selectionKeys.includes(event.key) || selectionKeys.includes(event.code)) {
            console.log('false');
            selecting.current = false;
            if (localSelection.length !== 0) {
                setSelected(localSelection);
                console.log(localSelection);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onSelectionDown as EventListenerOrEventListenerObject);
        document.addEventListener('keyup', onSelectionUp as EventListenerOrEventListenerObject);

        return () => {
            document.removeEventListener('keydown', onSelectionDown as EventListenerOrEventListenerObject);
            document.removeEventListener('keyup', onSelectionUp as EventListenerOrEventListenerObject);
        }
    });

    // On any selection change, it unsets all of the previously selected values and will add only the newly selected elements
    const onSelectionChange = (passedElements: Elements | null) => {

        if (selecting.current && passedElements) {
            localSelection = passedElements;
            return;
        }

        // This fixes the forced styling from pasting
        elements.forEach((element) => {
            if (isNode(element) 
            && element.data.pasted !== undefined 
            && element.data.pasted === true
            && !passedElements?.includes(element)) {
                undoNodeSelection(element);
                delete element.data.pasted;
            } else if (isNode(element) && element.data.pasted !== undefined && element.data.pasted === true) {
                delete element.data.pasted;
            }
        });

        const deleteCommentNode = () => {
            const comment: Node = commentSelection[0];
            if (!comment.data.initialized && !comment.data.typing) {
                if (comment.type === 'nodeComment') {
                    const parentNode: Node = elements.find((element) => element.data.commentId === comment.data.id) as Node;
                    parentNode.data.comment = false;
                    parentNode.data.commentId = '';
                }
                commentSelection = [];
                setElements((elements) => removeElements([comment], elements));
            } else if (comment.data.edit && !comment.data.typing) {
                comment.data.edit = false;
                commentSelection = [];
            }
        }

        if (passedElements !== null) {
            console.log(passedElements);
            setSelected(passedElements);

            if (commentSelection.length !== 0) {
                if (passedElements.length !== 0) {
                    if (commentSelection[0].id !== passedElements[0].id) {
                        deleteCommentNode();
                    }
                } else {
                    deleteCommentNode();
                }
            }
        }

    }

    useEffect(() => {
        if (editing) {
            console.log('editing');
        } else {
            console.log('simulating');
        }
    }, [editing]);

    useClipboardShortcuts(elements, selected, setSelected, onElementsRemove, setElements, getId);

    // When using multi-selection on Mac, it will cause the setState hook to break in the onSelectionChange function
    // To resolve this, I have created a local array that will serve as a local storage of elements.
    // This useEffect hook detects any changes in the local array and will set the selected state
    // useEffect(() => {
    //     setSelected(localSelection);
    //     console.log(localSelection);
    // }, [localSelection]);

    return(
        <div className = "canvas-editor">
            <ReactFlowProvider>
                <PartsMenu editing = {editing} setEditing={setEditing} elements={elements} setElements={setElements} />
                <div className = "reactflow-wrapper">
                    <ReactFlow 
                        elements = {elements}
                        onConnect = {onConnect}
                        onElementsRemove = {onElementsRemove}
                        onEdgeUpdateStart={onEdgeUpdateStart}
                        onEdgeUpdate={onEdgeUpdate}
                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                        onLoad = {onLoad}
                        onDrop = {onDrop}
                        onDragOver = {onDragOver}
                        style = {{height: window.innerHeight}}
                        nodeTypes = {nodeTypes}
                        className = 'flow-canvas'
                        nodesConnectable = {true}
                        onSelectionChange = {onSelectionChange}
                        onNodeDoubleClick = {onNodeDoubleClick}
                        multiSelectionKeyCode={['Control', 'Meta']} // This is for multiple, individual selections
                        selectionKeyCode={selectionKeys} // This is for drag selecting
                        onPaneClick={onPaneClick}
                        onDoubleClick = {onCanvasDoubleClick}
                        onNodeDrag = {onNodeDrag}
                        deleteKeyCode={['Backspace', 'Delete']}
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