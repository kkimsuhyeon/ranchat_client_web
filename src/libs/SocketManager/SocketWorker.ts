/* eslint-disable no-restricted-globals */
function work() {
  let socket: WebSocket | null = null;

  function send1() {
    socket?.send(JSON.stringify({ type: "subscribe", channel: "room" }));
  }

  function send2() {
    socket?.send(JSON.stringify({ type: "subscribe", channel: "chatting" }));
  }

  function send3() {
    socket?.send(JSON.stringify({ type: "push", message: "test" }))
  }

  function onMessage(event: MessageEvent<{ type: string; url: string; channel: string }>) {
    const { data } = event;

    if (data.type === "connect") {
      socket = new WebSocket("ws://localhost:4001");

      socket.onopen = () => {
        console.log("open");
      };

      socket.onmessage = (e: MessageEvent) => {
        const { data } = e;
        console.log(data);
      };

      socket.onerror = (e) => {
        console.log(e);
        console.log("error");
      };

      socket.onclose = () => {
        console.log("close");
      };
    }

    if (data.type === "subscribe" && data.channel === "room") {
      send1();
    }

    if (data.type === "subscribe" && data.channel === "chatting") {
      send2();
    }

    if (data.type === "push") {
      send3();
    }

    if (data.type === "disconnect") {
      socket?.close();
    }
  }

  self.onmessage = onMessage;
}

class SocketWorker extends Worker {
  constructor() {
    const url = URL.createObjectURL(new Blob([`(${work.toString()})()`]));
    super(url);
    URL.revokeObjectURL(url);
  }
}

export default SocketWorker;
