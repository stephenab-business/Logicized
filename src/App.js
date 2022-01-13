import { ReactFlowProvider, useStore } from 'inputs-and-outputs-renderer';

import './App.scss';
import CanvasEditor from './CanvasEditor/CanvasEditor';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider store={useStore}>
        <CanvasEditor />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
