import { useState } from 'react';
import React, { DragEvent, FC } from 'react';
import GatesIcon from '../pictures/Gates.svg';
import GatesIconClicked from '../pictures/New-Gates-Clicked.svg';
import ComponentsIcon from '../pictures/Components.svg';
import ComponentsIconClicked from '../pictures/New-Component-Clicked.svg';
import DisplaysIcon from '../pictures/Displays.svg';
import DisplaysIconClicked from '../pictures/New-Displays-Clicked.svg';
import CustomComponentsIcon from '../pictures/Custom.svg';
import CustomComponentsIconClicked from '../pictures/New-Custom-Clicked.svg';
import { Stack, Container, Row, Col } from 'react-bootstrap';
import ClockIcon from '../pictures/Clock.svg';
import SwitchIcon from '../pictures/Switch.svg';
import NOT from '../pictures/NOT.svg';
import AND from '../pictures/AND.svg';
import OR from '../pictures/OR.svg';
import NAND from '../pictures/NAND.svg';
import NOR from '../pictures/NOR.svg';
import XOR from '../pictures/XOR.svg';
import XNOR from '../pictures/XNOR.svg';
import SRL from '../pictures/SR-Latch.svg';
import SREL from '../pictures/SRE-Latch.svg';
import DL from '../pictures/D-Latch.svg';
import DEL from '../pictures/DE-Latch.svg';
import SRFF from '../pictures/SR-FF.svg';
import JKFF from '../pictures/JK-FF.svg';
import DFF from '../pictures/D-FF.svg';
import TFF from '../pictures/T-FF.svg';


interface PartsMenuProps {
  editing: boolean;
}

export const PartsMenu: FC<PartsMenuProps> = ({editing}) => {
  const [tabClicked, setTabClicked] = useState<boolean[]>([true, false, false, false]);
  // parts, components, displays, custom

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

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

  return (
    <Container className = 'parts-menu' fluid={true}>
      <Row className = 'justify-content-center'>
        <Col className = 'logo-col' xs = 'auto'>
            <div className = 'logo'>
                <svg viewBox="0 0 257 257">
                <rect className="logo-cls-1" x="0.5" y="0.5" width="256" height="256" rx="25.403"/>
                    <path className="logo-cls-2" d="M224.267,173.293a6.654,6.654,0,0,0-5.52,2.927h-19.94v.047c-1.847-16.134-16.107-28.694-33.427-28.694H117.127v12.474H96.66a6.7,6.7,0,0,0-1.987-1.987V137.02h12.314V88.767c0-17.32-12.56-31.58-28.694-33.427h.047V35.567a6.663,6.663,0,1,0-7.227-.167V55.34h.047C55.027,57.187,42.467,71.447,42.467,88.767V137.02H54.973l.007,53.427a6.664,6.664,0,1,0,9.207,9.22l52.94-.007v12.433H165.38c17.32,0,31.58-12.56,33.427-28.693v.047h19.78a6.666,6.666,0,1,0,5.68-10.154Zm-107.14,19.14H64.187a6.648,6.648,0,0,0-1.987-1.986V137.02H87.447v21.04a6.665,6.665,0,1,0,9.213,9.213h20.467Z"/>
                </svg>
            </div>
        </Col>
        <Col className = 'title-col' xs = 'auto'>
            <h2 className = 'title'>Logicized</h2>
        </Col>
      </Row>
      {editing &&
        <Row>
        <Col className = 'parts-icons col-md-3'>
          <Stack className='parts-stack justify-content-center' gap={4} style={{height: '100%'}}>
            {tabClicked[0] && 
              <div><img src = {GatesIconClicked} draggable = {false}></img></div>
            }
            {!tabClicked[0] &&
              <div className='gates-icon' onClick={onPartsClick}><img src = {GatesIcon} draggable = {false}></img></div>
            }
            {tabClicked[1] &&
              <div><img src={ComponentsIconClicked} draggable={false}></img></div>
            }
            {!tabClicked[1] &&
              <div className='components-icon' onClick={onCompClick}><img src = {ComponentsIcon} draggable = {false}></img></div>
            }
            {tabClicked[2] && 
              <div><img src = {DisplaysIconClicked} draggable={false}></img></div>
            }
            {!tabClicked[2] &&
              <div className='displays-icon' onClick={onDisplayClick}><img src = {DisplaysIcon} draggable = {false}></img></div>
            }
            {tabClicked[3] && 
              <div><img src={CustomComponentsIconClicked} draggable={false}></img></div>
            }
            {!tabClicked[3] &&
              <div className='custom-comp-icon' onClick={onCustomClick}><img src = {CustomComponentsIcon} draggable = {false}></img></div>
            }
          </Stack>
        </Col>
        <Col className = 'align-items-center actual-parts col-md-6' style={{width: '67%', padding: '10px', overflowY: 'scroll'}}>
          {tabClicked[0] && 
            <div>
              <div className="dndnode-input" onDragStart={(event: DragEvent) => onDragStart(event, 'inputgate')} draggable>
                Input
              </div>
              <div className = "dndnode-ground" onDragStart={(event: DragEvent) => onDragStart(event, 'inputGround')} draggable>
                Input Ground
              </div>
              <div className="dndnode-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'outputgate')} draggable>
                Output
              </div>
              <div className = "dndnode-switch" onDragStart={(event: DragEvent) => onDragStart(event, 'switch')} draggable>
                <img src={SwitchIcon}></img>
                Switch
              </div>
              <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
                <img src={ClockIcon}></img>
                Clock
              </div>
              <div className="dndnode-not" onDragStart = {(event: DragEvent) => onDragStart(event, 'not')} draggable>
                <img src={NOT}></img>
                NOT
              </div>
              <div className = 'dndnode-and' onDragStart = {(event: DragEvent) => onDragStart(event, 'and')} draggable>
                <img src={AND}></img>
                AND
              </div>
              <div className="dndnode-or" onDragStart = {(event: DragEvent) => onDragStart(event, 'or')} draggable>
                <img src={OR}></img>
                OR
              </div>
              <div className="dndnode-nand" onDragStart = {(event: DragEvent) => onDragStart(event, 'nand')} draggable>
                <img src={NAND}></img>
                NAND
              </div>
              <div className="dndnode-nor" onDragStart = {(event: DragEvent) => onDragStart(event, 'nor')} draggable>
                <img src={NOR}></img>
                NOR
              </div>
              <div className="dndnode-xor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xor')} draggable>
                <img src={XOR}></img>
                XOR
              </div>
              <div className="dndnode-xnor" onDragStart = {(event: DragEvent) => onDragStart(event, 'xnor')} draggable>
                <img src={XNOR}></img>
                XNOR
              </div>
            </div>
          }
          {tabClicked[1] &&
            <div>
              <div className="dndnode-sr" onDragStart = {(event: DragEvent) => onDragStart(event, 'srLatch')} draggable>
                <img src={SRL}></img>
                  SR-Latch
              </div>
              <div className="dndnode-sre" onDragStart = {(event: DragEvent) => onDragStart(event, 'srLatchEnable')} draggable>
                <img src={SREL}></img>
                  SR-Latch-Enable
              </div>
              <div className="dndnode-d" onDragStart = {(event: DragEvent) => onDragStart(event, 'dLatch')} draggable>
                <img src={DL}></img>
                  D-Latch
              </div>
              <div className="dndnode-de" onDragStart = {(event: DragEvent) => onDragStart(event, 'dLatchEnable')} draggable>
                <img src={DEL}></img>
                  D-Latch-Enable
              </div>
              <div className="dndnode-srff" onDragStart = {(event: DragEvent) => onDragStart(event, 'srFlipFlop')} draggable>
                <img src={SRFF}></img>
                  SR-Flip-Flop
              </div>
              <div className="dndnode-jkff" onDragStart = {(event: DragEvent) => onDragStart(event, 'jkFlipFlop')} draggable>
                <img src={JKFF}></img>
                  JK-Flip-Flop
              </div>
              <div className="dndnode-dff" onDragStart = {(event: DragEvent) => onDragStart(event, 'dFlipFlop')} draggable>
                <img src={DFF}></img>
                  D-Flip-Flop
              </div>
              <div className="dndnode-tff" onDragStart = {(event: DragEvent) => onDragStart(event, 'tFlipFlop')} draggable>
                <img src={TFF}></img>
                  T-Flip-Flop
              </div>
            </div>
          }
          {tabClicked[2] && 
            <div></div>
          }
          {tabClicked[3] && 
            <div></div>
          }
        </Col>
      </Row>
      }
    </Container>
  );
};