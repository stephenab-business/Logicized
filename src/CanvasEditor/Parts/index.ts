import InputGateNode from './Gates/InputNode/InputNode';
import OutputGateNode from './Gates/OutputNode/OutputNode';
import NotGateNode from './Gates/NotGate/NotGateNode';
import OrGateNode from './Gates/OrGate/OrGateNode';
import AndGateNode from './Gates/AndGate/AndGateNode';
import NorGateNode from './Gates/NorGate/NorGateNode';
import NandGateNode from './Gates/NandGate/NandGateNode';
import XorGateNode from './Gates/XorGate/XorGateNode';
import XnorGateNode from './Gates/XnorGate/XnorGateNode';
import FreeCommentNode from './Comments/FreeComment/FreeCommentNode';
import NodeCommentNode from './Comments/NodeComment/NodeCommentNode';
import ClockNode from './Gates/Clock/ClockNode';
import SRLatch from './Components/Latches/SRLatch/SRLatch';

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
    nodeComment: NodeCommentNode,
    clock: ClockNode,
    srLatch: SRLatch
};
