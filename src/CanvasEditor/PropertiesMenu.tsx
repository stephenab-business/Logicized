import { FC, useState, useEffect } from "react"
import { Elements, isEdge, Edge, Node, removeElements } from "inputs-and-outputs-renderer";
import { Container, Row, Col } from "react-bootstrap";
import { ConnectionMap } from "./CanvasEditor";

interface PropertiesMenuProps {
    selectedElements: Elements | null;
    elements: Elements;
    setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const PropertiesMenu: FC<PropertiesMenuProps> = ({selectedElements, elements, setElements}) => {
    const [typeOfElement, setTypeOfElement] = useState<boolean[]>([false, false, false, false, false, false, false]);

    const updateElements = () => {

    }

    const negateEdgeSource = () => {
        if (selectedElements) {
            const edge: Edge = selectedElements[0] as Edge;
            let source = edge.sourceHandle;
            let sourceNode = edge.source;
            if (edge.sourceHandle?.includes('input')) {
                source = edge.targetHandle;
                sourceNode = edge.target;
            }
            const node: Node = elements.find((element) => element.id === sourceNode) as Node;
            if (source?.includes('One')) {
                node.data.negateOutputOne = true;
            } else if (source?.includes('Two')) {
                node.data.negateOutputTwo = true;
            } else {
                node.data.negateOutput = true;
            }
        }
    }

    const negateEdgeTarget = () => {
        if (selectedElements) {
            const edge: Edge = selectedElements[0] as Edge;
            let target = edge.targetHandle;
            let targetNode = edge.target;
            if (edge.targetHandle?.includes('output')) {
                target = edge.sourceHandle;
                targetNode = edge.source;
            }
            const node: Node = elements.find((element) => element.id === targetNode) as Node;
            if (target?.includes('One')) {
                node.data.negateInputOne = true;
            } else if (target?.includes('Two')) {
                node.data.negateInputTwo = true;
            } else if (target?.includes('Three')) {
                node.data.negateInputThree = true;
            } else {
                node.data.negateInput = true;
            }
        }
    }

    const getCommentContent = (): string => {
        if (selectedElements) {
            const commentNode: Node = selectedElements[0] as Node;
            return commentNode.data.content;
        } else {
            return '';
        }
    }

    const onCommentChange = () => {

    }

    const hideComment = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.hide = true;
        }
    }

    const negateInput = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateInputOne = true;
        }
    }

    const negateInputOne = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateInputOne = true;
        }
    }

    const negateInputTwo = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateInputTwo = true;
        }
    }

    const negateInputThree = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateInputThree = true;
        }
    }

    const negateOutput = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateOutput = true;
        }
    }

    const negateOutputOne = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateOutputOne = true;
        }
    }

    const negateOutputTwo = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            node.data.negateOutputTwo = true;
        }
    }

    const disconnectInput = () => {
        if (selectedElements) {
            const node: Node = selectedElements[0] as Node;
            elements.forEach((element) => {
                if (isEdge(element) && node.data.parents.includes(element.id) && element.targetHandle?.includes('input')) {
                    // Remove Element
                    // Remove from Parents of this Node
                    // Remove from Children of Parent
                }
            })
        }
    }

    const disconnectInputOne = () => {

    }

    const disconnectInputTwo = () => {

    }

    const disconnectInputThree = () => {

    }

    const disconnectOutput = () => {

    }

    const disconnectOutputOne = () => {

    }

    const disconnectOutputTwo = () => {

    }


    /*
                    // If element is Node, and that Node has a Node Comment
                if (element.type !== 'nodeComment' && element.data.comment === true) {
                    const commentId = element.data.commentId;
                    const commentNode = elements.find((element) => element.id === commentId) as Node;
                    elementsToRemove.push(commentNode);
                } 
                // If element is Node, and that Node is a Node Comment
                else if (element.type === 'nodeComment') {
                    const commentId = element.data.id;
                    const parentNode = elements.find((element) => element.id === commentId) as Node;
                    parentNode.data.comment = false;
                    parentNode.data.commentId = '';
                }
    
    */
    const removeElement = () => {
        if (selectedElements) {
            selectedElements.forEach((element) => {
                if (!isEdge(element) && element.type !== 'nodeComment' && element.data.comment === true) {
                    const commentId = element.data.commentId;
                    const commentNode = elements.find((element) => element.id === commentId) as Node;
                    selectedElements.push(commentNode);
                } else if (!isEdge(element) && element.type === 'nodeComment') {
                    const commentId = element.data.id;
                    const parentNode = elements.find((element) => element.id === commentId) as Node;
                    parentNode.data.comment = false;
                    parentNode.data.commentId = '';
                }
            });
            setElements((elements) => removeElements(selectedElements, elements));
        }
    }

    const setType = () => {
        // 0 -> no selection
        // 1 -> edge selected
        // 2 -> flip flop selected
        // 3 -> comment selected
        // 4 -> clock selected
        // 5 -> basic gates selected
        // 6 -> multiple selected elements
        // will also need one for displays and latches
        if (selectedElements?.length === 0) {
            setTypeOfElement([true, false, false, false, false, false, false]);
        } else if (selectedElements?.length === 1) {
            if (selectedElements && isEdge(selectedElements[0])) {
                setTypeOfElement([false, true, false, false, false, false, false]);
            } else if (selectedElements[0]?.type?.includes('FlipFlop')) {
                setTypeOfElement([false, false, true, false, false, false, false]);
            } else if (selectedElements[0]?.type?.includes('Comment')) {
                setTypeOfElement([false, false, false, true, false, false, false]);
            } else if (selectedElements[0]?.type === 'clock') {
                setTypeOfElement([false, false, false, false, true, false, false]);
            } else if (selectedElements) {
                setTypeOfElement([false, false, false, false, false, true, false]);
            }
        } else {
            setTypeOfElement([false, false, false, false, false, false, true]);
        }
    }

    const resetType = () => {
        setTypeOfElement([true, false, false, false, false, false, false]);
    }

    useEffect(() => {
        setType();
    }, [selectedElements]);

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Row><h3>Properties</h3></Row>
                    {/* No Selection */}
                    {typeOfElement[0] &&
                        <div>
                            <Row><p>No Selection</p></Row>
                            <Row><hr></hr></Row>
                        </div>
                    }
                    {/* Edge Selected */}
                    {typeOfElement[1] &&
                        <div>
                            <Row><p>Edge Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row><button onClick = {negateEdgeSource}>Negate Input</button></Row>
                            <Row><button onClick = {negateEdgeTarget}>Negate Output</button></Row>
                        </div>
                    }
                    {/* Flip-Flop Selected */}
                    {typeOfElement[2] &&
                        <div>
                            <Row><p>Flip-Flop Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row>
                                <Col>
                                    <form>
                                        <div>
                                            <input id='initialOutOne' type='number' name='initialOutOne'></input>
                                            <label htmlFor='initialOutOne'>Initial Q</label>
                                        </div>
                                    </form>
                                </Col>
                                <Col>
                                    <form>
                                        <div>
                                            <input id='initialOutTwo' type='number' name='initialOutTwo'></input>
                                            <label htmlFor='initialOutTwo'>Initial Q'</label>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                            <Row>
                            <form>
                                <div>
                                    <input id='propDelay' type='number' name='propDelay'></input>
                                    <label htmlFor='propDelay'>Propogation Delay</label>
                                </div>
                            </form>
                            </Row>
                            <Row>
                            <form>
                                <div>
                                    <input id='setupTime' type='number' name='setup'></input>
                                    <label htmlFor='setupTime'>Setup Time</label>
                                </div>
                            </form>
                            </Row>
                            <Row>
                            <form>
                                <div>
                                    <input id='holdTime' type='number' name='hold'></input>
                                    <label htmlFor='holdTime'>Hold Time</label>
                                </div>
                            </form>
                            </Row>
                            <Row>
                                <Col>
                                    <button>Edge Triggered</button>
                                    <Row>
                                        <button>Rising Edge</button>
                                        <button>Falling Edge</button>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button>Negate Input One</button>
                                    <button>Negate Output</button>
                                </Col>
                                <Col>
                                    <button>Negate Clock Input</button>
                                </Col>
                                <Col>
                                    <button>Negate Input Two</button>
                                    <button>Negate Not Output</button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button>Remove Input One</button>
                                    <button>Remove Output</button>
                                </Col>
                                <Col>
                                    <button>Remove Clock Input</button>
                                </Col>
                                <Col>
                                    <button>Remove Input Two</button>
                                    <button>Remove Not Output</button>
                                </Col>
                            </Row>
                        </div>
                    }
                    {/* Comment Selected */}
                    {typeOfElement[3] &&
                        <div>
                            <Row><p>Comment Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row>
                                <form>
                                    <div>
                                        <input className="node-comment-edit" type="text" defaultValue={getCommentContent()} onChange={onCommentChange} autoComplete="off" />
                                        <label htmlFor='node-comment-edit'>Edit Comment</label>
                                    </div>
                                </form>
                            </Row>
                            <Row>
                                <button onClick={hideComment}>Hide Comment</button>
                            </Row>
                        </div>
                    }
                    {/* Clock Selected */}
                    {typeOfElement[4] &&
                        <div>
                            <Row><p>Clock Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row>
                                <form>
                                    <div>
                                        <input className='clockInterval' type='number' />
                                        <label htmlFor='clockInterval'>Clock Interval</label>
                                    </div>
                                </form>
                            </Row>
                            <Row>
                                <form>
                                    <div>
                                        <input id='propDelay' type='number' name='propDelay'></input>
                                        <label htmlFor='propDelay'>Propogation Delay</label>
                                    </div>
                                </form>
                            </Row>
                            <Row><button onClick={disconnectOutput}>Disconnect Output</button></Row>
                        </div>
                    }
                    {/* Gates Selected */}
                    {typeOfElement[5] &&
                        <div>
                            <Row><p>Gate Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row>
                                <form>
                                    <div>
                                        <input id='propDelay' type='number' name='propDelay'></input>
                                        <label htmlFor='propDelay'>Propogation Delay</label>
                                    </div>
                                </form>
                            </Row>
                            {/* {selectedElements && selectedElements[0].data.comment === true &&
                                <Row>
                                    <form>
                                        <div>
                                            <input className="node-comment-edit" type="text" defaultValue={getCommentContent()} onChange={onCommentChange} autoComplete="off" />
                                            <label htmlFor='node-comment-edit'>Edit Comment</label>
                                        </div>
                                    </form>
                                </Row>
                            } */}
                            <Row><button onClick={negateInputOne}>Negate Input One</button></Row>
                            <Row><button onClick={negateInputTwo}>Negate Input Two</button></Row>
                            <Row><button onClick={negateOutput}>Negate Output</button></Row>
                            <Row><button onClick={disconnectInputOne}>Disconnect Input One</button></Row>
                            <Row><button onClick={disconnectInputTwo}>Disconnect Input Two</button></Row>
                            <Row><button onClick={disconnectOutput}>Disconnect Output</button></Row>
                        </div>
                    }
                    {/* Multiple Selected */}
                    {typeOfElement[6] &&
                        <div>
                            <Row><p>Multiple Items Selected</p></Row>
                            <Row><hr></hr></Row>
                            <Row><button>Create Comment</button></Row>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    );
}