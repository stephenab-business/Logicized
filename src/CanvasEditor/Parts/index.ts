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
import SRLatchEnable from './Components/Latches/SRLatchEnable/SRLatchEnable';
import DLatch from './Components/Latches/DLatch/DLatch';
import DLatchEnable from './Components/Latches/DLatchEnable/DLatchEnable';
import SRFlipFlop from './Components/FlipFlops/SRFlipFlop/SRFlipFlop';
import JKFlipFlop from './Components/FlipFlops/JKFlipFlop/JKFlipFlop';
import DFlipFlop from './Components/FlipFlops/DFlipFlop/DFlipFlop';
import TFlipFlop from './Components/FlipFlops/TFlipFlop/TFlipFlop';

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
    srLatch: SRLatch,
    srLatchEnable: SRLatchEnable,
    dLatch: DLatch,
    dLatchEnable: DLatchEnable,
    srFlipFlop: SRFlipFlop,
    jkFlipFlop: JKFlipFlop,
    dFlipFlop: DFlipFlop,
    tFlipFlop: TFlipFlop
};
