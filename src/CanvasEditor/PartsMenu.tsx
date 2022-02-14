<<<<<<< HEAD
import { Elements, isNode, removeElements, } from 'inputs-and-outputs-renderer';
=======
<<<<<<< HEAD
import { Elements, isNode, removeElements, } from 'inputs-and-outputs-renderer';
=======
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
import React, { DragEvent, FC } from 'react';

interface PartsMenuProps {
  editing: boolean;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  elements: Elements;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const PartsMenu: FC<PartsMenuProps> = ({editing, setEditing, elements, setElements}) => {
<<<<<<< HEAD
=======
=======
  setEditing: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const PartsMenu: FC<PartsMenuProps> = ({editing, setEditing}) => {
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

  const changeMode = () => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
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

  

<<<<<<< HEAD
=======
=======
    setEditing(!editing);
  }

>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
  return (
    <aside>
      {editing && 
      <div>
        <h3>Parts</h3>
<<<<<<< HEAD
        {/* <div className="react-flow__node-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
=======
<<<<<<< HEAD
        {/* <div className="react-flow__node-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
=======
        <div className="react-flow__node-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
          Input Node
        </div>
        <div className="react-flow__node-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'output')} draggable>
          Output Node
        </div>
        <div className = "dndnode-horizontal-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'horizontal-input')} draggable>
          Horizontal Input Node
<<<<<<< HEAD
        </div> */}
=======
<<<<<<< HEAD
        </div> */}
=======
        </div>
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
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
<<<<<<< HEAD
        <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
          Clock
        </div>
=======
<<<<<<< HEAD
        <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
          Clock
        </div>
=======
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
      </div>
      }
      {!editing &&
        <div>
          <h3>Simulation Parts</h3>
          <div className="dndnode-clock" onDragStart = {(event: DragEvent) => onDragStart(event, 'clock')} draggable>
            Clock
          </div>
<<<<<<< HEAD
          <button></button>
=======
<<<<<<< HEAD
          <button></button>
=======
>>>>>>> 07a57989e6bb039742a68357a009bb1a87d4b15d
>>>>>>> 048ec59465fccf702f60c5a32f884538b15490ca
        </div>
      }
      <button onClick={changeMode}>Change Mode</button>
    </aside>
  );
};