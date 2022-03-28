import { useState } from 'react';
import { Elements, isNode, removeElements, } from 'inputs-and-outputs-renderer';
import React, { DragEvent, FC } from 'react';
import GatesIcon from '../pictures/Gates.svg';
import ComponentsIcon from '../pictures/Components.svg';
import DisplaysIcon from '../pictures/Display.svg';
import CustomComponentsIcon from '../pictures/Custom Component.svg';
import { Stack, Container, Row, Col } from 'react-bootstrap';

interface PartsMenuProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  elements: Elements;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const PartsMenu: FC<PartsMenuProps> = ({editing, setEditing, elements, setElements}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [tabClicked, setTabClicked] = useState<boolean[]>([true, false, false, false]);
                                                // parts, components, displays, custom

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

  const changeMode = () => {
    elements.forEach((element) => {
      if (isNode(element) && element.data.modeIsEditing !== undefined) {
        const newElements = elements;
        const index = newElements.findIndex((node) => node.id === element.id);
        setElements((elements) => removeElements(elements, elements));
        newElements[index].data = {
          ...element.data,
          modeIsEditing: !editing,
        }
        setElements((elements) => elements.concat(newElements));
      }
    });

    setEditing(!editing);
  }

  const onMouseHover = () => {
    setHovering(true);
  }

  const onMouseExit = () => {
    setHovering(false);
  }

  const onDragEnd = () => {
    setHovering(false);
  }

  const onPartsClick = () => {
    setTabClicked([true, false, false, false]);
  }

  const onCompClick = () => {
    setTabClicked([false, true, false, false]);
  }

  const onDisplayClick = () => {
    setTabClicked([false, false, true, false]);
  }

  const onCustomClick = () => {
    setTabClicked([false, false, false, true]);
  }

  const getClassName = () => {
    if (hovering) {
      return 'parts-menu col-md-3';
    }
    else {
      return 'parts-menu col-md-0';
    }
  }

  return (
    <aside className='parts-menu col-md-2' onMouseEnter={onMouseHover} onMouseLeave={onMouseExit}>
      <div className='parts-menu-background'>
        <div className='parts-menu-icons justify-content-center'>
          <Container>
            <Row>
            <Col>
              <Stack className='parts-stack justify-content-center' gap={4} style={{height: '100%'}}>
                <div className='gates-icon' onClick={onPartsClick}><img src = {GatesIcon}></img></div>
                <div className='components-icon' onClick={onCompClick}><img src = {ComponentsIcon}></img></div>
                <div className='displays-icon' onClick={onDisplayClick}><img src = {DisplaysIcon}></img></div>
                <div className='custom-comp-icon' onClick={onCustomClick}><img src = {CustomComponentsIcon}></img></div>
              </Stack>
            </Col>
            {tabClicked[0] && 
            <Col>
              <div>
                <h3>Parts</h3>
                <div className = 'dndnode-and' onDragStart = {(event: DragEvent) => onDragStart(event, 'and')} draggable>
                  AND
                </div>
                <div className="dndnode-not" onDragStart = {(event: DragEvent) => onDragStart(event, 'not')} draggable>
                  NOT
                </div>
                <div className="dndnode-input" onDragStart={(event: DragEvent) => onDragStart(event, 'inputgate')} draggable>
                  Input
                </div>
                <div className = "dndnode-ground" onDragStart={(event: DragEvent) => onDragStart(event, 'inputGround')} draggable>
                  Input Ground
                </div>
                <div className="dndnode-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'outputgate')} draggable>
                  Output
                </div>
                <div className="dndnode-or" onDragStart = {(event: DragEvent) => onDragStart(event, 'or')} draggable>
                  OR
                </div>
                <div className="dndnode-nor" onDragStart = {(event: DragEvent) => onDragStart(event, 'nor')} draggable>
                  NOR
                </div>
                <div className="dndnode-nand" onDragStart = {(event: DragEvent) => onDragStart(event, 'nand')} draggable>
                  NAND
                </div>
                <div className="dndnode-xor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xor')} draggable>
                  XOR
                </div>
                <div className="dndnode-xnor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xnor')} draggable>
                  XNOR
                </div>
                <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
                  Clock
                </div>
              </div>
            </Col>
            }
            {tabClicked[1] &&
            <Col>
              <h3>Components</h3>
              <div className="dndnode-sr" onDragStart = {(event: DragEvent) => onDragStart(event, 'srLatch')} draggable>
                  SR-Latch
              </div>
              <div className="dndnode-sre" onDragStart = {(event: DragEvent) => onDragStart(event, 'srLatchEnable')} draggable>
                  SR-Latch-Enable
              </div>
              <div className="dndnode-d" onDragStart = {(event: DragEvent) => onDragStart(event, 'dLatch')} draggable>
                  D-Latch
              </div>
              <div className="dndnode-de" onDragStart = {(event: DragEvent) => onDragStart(event, 'dLatchEnable')} draggable>
                  D-Latch-Enable
              </div>
              <div className="dndnode-t" onDragStart = {(event: DragEvent) => onDragStart(event, 'tLatch')} draggable>
                  T-Latch
              </div>
              <div className="dndnode-jk" onDragStart = {(event: DragEvent) => onDragStart(event, 'jkLatch')} draggable>
                  JK-Latch
              </div>
            </Col>
            }
            {tabClicked[2] && 
            <Col>
              <div>Displays</div>
            </Col>
            }
            {tabClicked[3] && 
            <Col>
              <div>Custom</div>
            </Col>
            }
            </Row>
          </Container>
        </div>
      </div>
{/* 
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row><div className='gates-icon'><img src = {GatesIcon}></img></div></Row>
            <Row><div className='components-icon'><img src = {ComponentsIcon}></img></div></Row>
            <Row><div className='displays-icon'><img src = {DisplaysIcon}></img></div></Row>
            <Row><div className='custom-comp-icon'><img src = {CustomComponentsIcon}></img></div></Row>
          </Col>
          <Col></Col>
        </Row>
      </Container> */}
            <button onClick={changeMode}>Change Mode</button>
    </aside>
  );
};


/*
 * 
 * 
 *     <aside>
      {editing && 
      <div>
        <h3>Parts</h3>
        {/* <div className="react-flow__node-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
          Input Node
        </div>
        <div className="react-flow__node-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'output')} draggable>
          Output Node
        </div>
        <div className = "dndnode-horizontal-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'horizontal-input')} draggable>
          Horizontal Input Node
        </div>
        <div className = 'dndnode-and' onDragStart = {(event: DragEvent) => onDragStart(event, 'and')} draggable>
          AND
        </div>
        <div className="dndnode-not" onDragStart = {(event: DragEvent) => onDragStart(event, 'not')} draggable>
          NOT
        </div>
        <div className="dndnode-input" onDragStart={(event: DragEvent) => onDragStart(event, 'inputgate')} draggable>
          Input
        </div>
        <div className = "dndnode-ground" onDragStart={(event: DragEvent) => onDragStart(event, 'inputGround')} draggable>
          Input Ground
        </div>
        <div className="dndnode-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'outputgate')} draggable>
          Output
        </div>
        <div className="dndnode-or" onDragStart = {(event: DragEvent) => onDragStart(event, 'or')} draggable>
          OR
        </div>
        <div className="dndnode-nor" onDragStart = {(event: DragEvent) => onDragStart(event, 'nor')} draggable>
          NOR
        </div>
        <div className="dndnode-nand" onDragStart = {(event: DragEvent) => onDragStart(event, 'nand')} draggable>
          NAND
        </div>
        <div className="dndnode-xor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xor')} draggable>
          XOR
        </div>
        <div className="dndnode-xnor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xnor')} draggable>
          XNOR
        </div>
        <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
          Clock
        </div>
      </div>
      }

      {!editing &&
        <div>
          <h3>Simulation Parts</h3>
          <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
            Clock
          </div>
          <button></button>
        </div>
      }
    </aside>
 *  
 * 
 */