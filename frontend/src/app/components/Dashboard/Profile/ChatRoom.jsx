import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { profile } from "./../../../api/backend/account";

var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState(null);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    profile()
      .then((res) => {
        setUserId(res.data.id);
        setUserName(res.data.firstname);
      })
      .catch(() => setErrorLog(true));
  }, []);

  const [userData, setUserData] = useState({
      username: userName ,
      receivername: userName,
      connected: false,
      message: "",
  });

  useEffect(() => {
      console.log(userData);
  }, [userData]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
      if (isPopupOpen) {
          disconnect();
      } else {
          setUserData({
              ...userData,
              username: userName,
              receivername: userName,
              connected: true
          });
          connect();
      }
      setIsPopupOpen(!isPopupOpen);
  };


  const connect = () => {
      let Sock = new SockJS("http://localhost:8080/ws");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
  };

  const disconnect = () => {
      if (stompClient) {
          stompClient.disconnect();
      }
  };

  const onConnected = () => {
      const connectedUsers = [...privateChats.keys()];
      connectedUsers.forEach(user => {
          if (!privateChats.has(user)) {
              privateChats.set(user, []);
              setPrivateChats(new Map(privateChats));
          }
      });
      stompClient.subscribe("/chatroom/public", onMessageReceived);
      stompClient.subscribe(
          "/user/" + userName + "/private",
          onPrivateMessage
      );
      userJoin();
  };

  const userJoin = () => {
      var chatMessage = {
          senderName: userName,
          status: "JOIN",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
      var payloadData = JSON.parse(payload.body);
      switch (payloadData.status) {
          case "JOIN":
              if (!privateChats.get(payloadData.senderName)) {
                  privateChats.set(payloadData.senderName, []);
                  setPrivateChats(new Map(privateChats));
              }
              break;
          case "MESSAGE":
              setPublicChats(prevChats => [...prevChats, payloadData]);
              break;
      }
  };

  const onPrivateMessage = (payload) => {
      console.log("chergement", payload);
      var payloadData = JSON.parse(payload.body);
      const chatList = privateChats.get(payloadData.senderName) || [];
      chatList.push(payloadData);
      privateChats.set(payloadData.senderName, chatList);
      setPrivateChats(new Map(privateChats));
  };

  const onError = (err) => {
      console.log(err);
  };

  const handleMessage = (event) => {
      const { value } = event.target;
      setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
      if (stompClient) {
          var chatMessage = {
              senderName: userName,
              message: userData.message,
              status: "MESSAGE",
          };
          console.log(chatMessage);
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
          setUserData({ ...userData, message: "" });
      }
  };

  const sendPrivateValue = () => {
      if (stompClient) {
          var chatMessage = {
              senderName: userName,
              receiverName: tab,
              message: userData.message,
              status: "MESSAGE",
          };

          if (userName !== tab) {
              const chatList = privateChats.get(tab) || [];
              chatList.push(chatMessage);
              privateChats.set(tab, chatList);
              setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({ ...userData, message: "" });
      }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={togglePopup}
      >
        Open Chat
      </button>
      {isPopupOpen && (
        <div
          className={`absolute bottom-20 right-0 ${
            tab ? "w-[700px]" : "w-[300px]"
          } bg-white border border-gray-300 shadow-lg`}
        >
          <div className="container">
            {userData.connected && (
              <div className="shadow-md border border-gray-300 rounded-lg p-4 mx-2 my-4 h-[400px] flex flex-row">
                <div
                  className={`member-list ${
                    tab ? "w-1/5" : "w-full"
                  } border-r-2 pr-3 transition-all duration-300`}
                >
                  <ul>
                    <h6 className="cursor-pointer bg-gray-100 border p-2 my-2 rounded">
                      Connecte
                    </h6>
                    {[...privateChats.keys()].map((name, index) => (
                      <li
                        onClick={() => {
                          setTab(name);
                        }}
                        className={`member ${
                          tab === name && "active"
                        } cursor-pointer bg-gray-100 border p-2 my-2 rounded`}
                        key={index}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
                {userData.connected && tab !== null && (
                  <div className="w-4/5 ml-4 ">
                    <ul className="h-4/5 border border-gray-900">
                      {privateChats.get(tab).map((chat, index) => (
                        <li
                          className={`message ${
                            chat.senderName === userName ? "self" : ""
                          } ${
                            chat.senderName !== userName
                              ? "flex-row-reverse"
                              : ""
                          } p-2 ${
                            chat.senderName !== userName
                              ? "bg-gray-100 text-black"
                              : "bg-gray-100 text-black"
                          } rounded shadow-md mb-2`}
                          key={index}
                        >
                          <div
                            className={`flex ${
                              chat.senderName === userName
                                ? "justify-end"
                                : "justify-start"
                            } items-center w-full`}
                          >
                            {chat.senderName !== userName && (
                              <div className="avatar px-3 bg-blue-500 py-1 rounded text-white">
                                {chat.senderName}
                              </div>
                            )}
                            <div className="message-data p-2">
                              {chat.message}
                            </div>
                            {chat.senderName === userName && (
                              <div className="avatar self px-3 bg-green-500 py-1 rounded text-white">
                                {chat.senderName}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="send-message flex items-center mt-4">
                      <input
                        type="text"
                        className="input-message border border-gray-300 rounded-l-full px-4 py-2 w-9/12"
                        placeholder="Enter the message"
                        value={userData.message}
                        onChange={handleMessage}
                      />
                      <button
                        type="button"
                        className="send-button bg-yellow-500 text-white px-4 py-2 rounded-r-full ml-2 cursor-pointer"
                        onClick={sendPrivateValue}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatRoom;