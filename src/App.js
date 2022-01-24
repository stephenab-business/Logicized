import { ReactFlowProvider, useStore } from 'inputs-and-outputs-renderer';

import './App.scss';
import CanvasEditor from './CanvasEditor/CanvasEditor';

function App() {
  const defaultMode = 'editing';

  return (
    <div className="App">
      <ReactFlowProvider store={useStore}>
        <CanvasEditor mode={defaultMode} />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
