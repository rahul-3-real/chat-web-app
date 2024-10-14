import { useState, useEffect } from "react";
import { VscSend } from "react-icons/vsc";
import { uniqBy } from "lodash";

import Avatar from "../components/Avatar";
import Logo from "../components/Logo";

const Chat = ({ id }) => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(messages);
  console.log(id);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      if (userId !== id) {
        people[userId] = username;
      }
    });
    setOnlinePeople(people);
  };

  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: messageData.text,
          recipient: messageData.recipient,
          sender: messageData.sender,
          isOur: false,
        },
      ]);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (newMessage && ws && selectedUserId) {
      ws.send(
        JSON.stringify({
          recipient: selectedUserId,
          sender: id,
          text: newMessage,
        })
      );
      setNewMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: newMessage,
          recipient: selectedUserId,
          sender: id,
          isOur: true,
        },
      ]);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, [id]);

  const messagesWithoutDups = uniqBy(messages, "_id");

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/4 p-5">
        <Logo />

        {Object.keys(onlinePeople).length === 0 && (
          <h5 className="text-xl">No one is online.</h5>
        )}

        {Object.keys(onlinePeople).map((userId) => (
          <Avatar
            key={userId}
            username={onlinePeople[userId]}
            userId={userId}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        ))}
      </div>

      <div className="bg-blue-50 w-3/4 flex flex-col p-5">
        <div className="flex flex-col-reverse flex-grow overflow-y-auto">
          {Object.keys(onlinePeople).length === 0 && (
            <h5 className="text-xl h-full w-full flex items-center justify-center text-gray-400">
              No one is online.
            </h5>
          )}

          {!selectedUserId && (
            <h5 className="text-xl h-full w-full flex items-center justify-center text-gray-400">
              Please select a user to chat.
            </h5>
          )}

          {selectedUserId && (
            <div className="flex flex-col gap-2">
              {messages.map((message, i) => (
                <div
                  key={`${i}`}
                  className={`flex ${
                    message.isOur ? "flex-row-reverse" : "flex-row"
                  } gap-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      message.recipient === id
                        ? "bg-white text-gray-600"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedUserId && (
          <form className="flex gap-2 mt-3" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here"
              className="bg-white flex-grow border rounded-sm p-2 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 py-2 px-4 text-white rounded-sm"
            >
              <VscSend />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
