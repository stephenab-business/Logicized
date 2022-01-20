import InputGateNode from './InputNode/InputNode';
import OutputGateNode from './OutputNode/OutputNode';
import NotGateNode from './NotGate/NotGateNode';
import OrGateNode from './OrGate/OrGateNode';
import AndGateNode from './AndGate/AndGateNode';
import NorGateNode from './NorGate/NorGateNode';
import NandGateNode from './NandGate/NandGateNode';
import XorGateNode from './XorGate/XorGateNode';
import XnorGateNode from './XnorGate/XnorGateNode';
import FreeCommentNode from './Comments/FreeComment/FreeCommentNode';
import NodeCommentNode from './Comments/NodeComment/NodeCommentNode';

// Any type of Node that is created must be passed as a type here
export const nodeTypes = {
    inputGate: InputGateNode,
    outputGate: OutputGateNode,
    notGate: NotGateNode,
    orGate: OrGateNode,
    andGate: AndGateNode,
    norGate: NorGateNode,
    nandGate: NandGateNode,
    xorGate: XorGateNode,
    xnorGate: XnorGateNode,
    freeComment: FreeCommentNode,
    nodeComment: NodeCommentNode
};
