import React, { DragEvent } from 'react';

export const PartsMenu = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
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
    </aside>
  );
};