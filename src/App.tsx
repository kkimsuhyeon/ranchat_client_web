import React, { useCallback } from "react";

import manager from "libs/SocketManager";

function App() {
  const testClick = useCallback(() => {
    manager.sendMessage1();
  }, []);

  const testClick2 = useCallback(() => {
    manager.sendMessage2();
  }, []);

  const testClick3 = useCallback(() => {
    manager.sendMessage3();
  }, []);

  const testClose = useCallback(() => {
    manager.disconnect();
  }, []);

  const testOpen = useCallback(() => {
    manager.connect();
  }, []);

  return (
    <div>
      <button onClick={testOpen}>open</button>
      <button onClick={testClick}>click</button>
      <button onClick={testClick2}>click2</button>
      <button onClick={testClick3}>click3</button>
      <button onClick={testClose}>close</button>
    </div>
  );
}

export default App;
