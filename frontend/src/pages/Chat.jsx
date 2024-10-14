import { useState, useEffect } from "react";
import { VscSend } from "react-icons/vsc";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";

const Chat = ({ id }) => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
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
        <Logo />

        {Object.keys(onlinePeople).length <= 1 && (
          <h5 className="text-xl">No one is online.</h5>
        )}

        {Object.keys(onlinePeople).map((people) => {
          if (people !== id) {
            return (
              <Avatar
                key={people}
                username={onlinePeople[people]}
                userId={people}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
            );
          }
        })}
      </div>

      <div className="bg-blue-50 w-3/4 flex flex-col p-5">
        <div className="flex-grow">
          {Object.keys(onlinePeople).length <= 1 && (
            <h5 className="text-xl h-full w-full flex items-center justify-center text-gray-400">
              No one is online.
            </h5>
          )}

          {!selectedUserId && (
            <h5 className="text-xl h-full w-full flex items-center justify-center text-gray-400">
              Please select a user to chat.
            </h5>
          )}
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
