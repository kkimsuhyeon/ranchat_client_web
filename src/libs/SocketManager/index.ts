import SocketWorker from "./SocketWorker";

class SocketWorkerManager {
  private worker: SocketWorker;

  constructor() {
    this.worker = new SocketWorker();
    this.worker.onmessage = (e) => {
      const { data } = e;
      console.log(data);
    };
  }

  connect() {
    this.worker.postMessage({
      type: "connect",
      message: "test1",
      url: "ws://localhost:4001",
    });
  }

  sendMessage1() {
    this.worker.postMessage({ type: "subscribe", channel: "room" });
  }

  sendMessage2() {
    this.worker.postMessage({ type: "subscribe", channel: "chatting" });
  }

  sendMessage3() {
    this.worker.postMessage({ type: "push", message: "test" })
  }

  disconnect() {
    this.worker.postMessage({ type: "disconnect" });
  }

  subscribeChannel() { }

  unsubscribeChannel() { }
}

export default new SocketWorkerManager();
