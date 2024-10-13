import { useState, useEffect } from "react";
import { VscSend } from "react-icons/vsc";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId }) => {
      people[userId] = userId;
    });
    setOnlinePeople(people);
  };

  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/4 p-5">
        {Object.keys(onlinePeople).map((people) => (
          <h4 key={people}>{people}</h4>
        ))}
      </div>

      <div className="bg-blue-50 w-3/4 flex flex-col p-5">
        <div className="flex-grow">
          <h4>Message with selected person</h4>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message here"
            className="bg-white flex-grow border rounded-sm p-2 outline-none"
          />

          <button className="bg-blue-500 py-2 px-4 text-white rounded-sm">
            <VscSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
