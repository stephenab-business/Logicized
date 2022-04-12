import { FC, useState, useEffect } from "react"
import { FlowElement, Elements, isEdge } from "inputs-and-outputs-renderer";
import { Container, Row, Col } from "react-bootstrap";

interface PropertiesMenuProps {
    selectedElements: Elements | null;
    elements: Elements;
    setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const PropertiesMenu: FC<PropertiesMenuProps> = ({selectedElements, elements, setElements}) => {
    const [selected, setSelected] = useState<boolean>(false);
    const [typeOfElement, setTypeOfElement] = useState<boolean[]>([false, false, false, false, false, false]);

    const updateElements = () => {

    }

    const setType = () => {
        // 0 -> edge selected
        // 1 -> flip flop selected
        // 2 -> comment selected
        // 3 -> clock selected
        // 4 -> basic gates selected
        // 5 -> multiple selected elements
        // will also need one for displays and latches
        if (selectedElements?.length === 1) {
            if (selectedElements && isEdge(selectedElements[0])) {
                setTypeOfElement([true, false, false, false, false, false]);
            } else if (selectedElements[0]?.type?.includes('FlipFlop')) {
                setTypeOfElement([false, true, false, false, false, false]);
            } else if (selectedElements[0]?.type?.includes('Comment')) {
                setTypeOfElement([false, false, true, false, false, false]);
            } else if (selectedElements[0]?.type === 'clock') {
                setTypeOfElement([false, false, false, true, false, false]);
            } else if (selectedElements) {
                setTypeOfElement([false, false, false, false, true, false]);
            } else {
                setTypeOfElement([false, false, false, false, false, false]);
            }
        } else {
            setTypeOfElement([false, false, false, false, false, true]);
        }
    }

    const resetType = () => {
        setTypeOfElement([false, false, false, false, false, false]);
    }

    useEffect(() => {
        if (selectedElements === null) {
            setSelected(false);
        } else {
            setSelected(true);
            setType();
        }
    }, [selectedElements]);

    return (
        <aside className="properties-menu col-md-2">
            <h3>Properties</h3>
            {!selected && 
                <div>
                    <p>No Selection</p>
                    <hr></hr>

                </div>
            }
            {selected &&
                <div>
                    {typeOfElement[0] &&
                        <div className = 'menu-edge'>
                            <button>Negate Input</button>
                            <button>Negate Output</button>
                            <button>Delete</button>
                        </div>
                    }
                    {typeOfElement[1] &&
                        <Container className = 'menu-ff'>
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
                                    <button>Level Triggered</button>
                                    <Row>
                                        <button>Positive Level</button>
                                        <button>Negative Level</button>
                                    </Row>
                                </Col>
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
                            <Row>
                                <button>Delete</button>
                            </Row>

                        </Container>
                    }
                    {typeOfElement[2] &&
                        <div className = 'menu-comment'>

                        </div>
                    }
                    {typeOfElement[3] &&
                        <div className = 'menu-clock'>

                        </div>
                    }
                    {typeOfElement[4] &&
                        <div className = 'menu-node'>

                        </div>
                    }
                    {typeOfElement[5] &&
                        <div className = 'menu-multiple'>

                        </div>
                    }
                </div>
            }
        </aside>
    );
}