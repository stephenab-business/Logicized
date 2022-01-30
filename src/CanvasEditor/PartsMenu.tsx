import { Elements, isNode, removeElements, useStoreState } from 'inputs-and-outputs-renderer';
import React, { DragEvent, FC } from 'react';

interface PartsMenuProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  elements: Elements;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const PartsMenu: FC<PartsMenuProps> = ({editing, setEditing, elements, setElements}) => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

  const changeMode = () => {
    elements.forEach((element) => {
      if (isNode(element) && element.data.modeIsEditing !== undefined) {
        setElements((elements) => removeElements([element], elements));
        const nodeData = {
          ...element.data,
          modeIsEditing: !editing,
          output: element.data.initialValue,
        }
        const newNode = element;
        newNode.data = nodeData;
        setElements((elements) => elements.concat(newNode));
      }
    });
    setEditing(!editing);
  }

  return (
    <aside>
      {editing && 
      <div>
        <h3>Parts</h3>
        <div className="react-flow__node-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
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
      </div>
      }
      {!editing &&
        <div>
          <h3>Simulation Parts</h3>
          <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
            Clock
          </div>
        </div>
      }
      <button onClick={changeMode}>Change Mode</button>
    </aside>
  );
};