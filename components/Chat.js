import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db, auth } from "../features/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getFriendsData from "./helper/getFriendsData";
import moment from "moment";
import { useRef } from "react";
import { useRouter } from "next/router";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuseChat from "./helper/MenuesChat";

const Chat = ({ chat, chat_id, message }) => {
  const [friends, setFriends] = useState({});
  const [messages, setMessages] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const chatEndRef = useRef(null);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const chatParse = JSON.parse(chat);

  useEffect(() => {
    setMessages(JSON.parse(message));
  }, []);
  const goEndChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    goEndChat();
  }, [messages]);

  useEffect(() => {
    const messageRef = collection(db, "chats", chat_id, "messages");
    const q = query(messageRef, orderBy("timestamp", "asc"));
    const getMessages = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data.timestamp?.toDate.getTime(),
        }))
      );
    });
    return getMessages;
  }, [chat_id]);

  useEffect(() => {
    if (chatParse.users?.length > 0) {
      getFriendsData(chatParse.users).then((data) => {
        setFriends(data);
      });
    }
  }, [chat_id]);

  // Add Emoji in input after select
  const addEmoji = (e) => {
    let codeEmo = e.unified.split("-");
    let codesArray = [];
    codeEmo.forEach((emo) => codesArray.push("0x" + emo));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // user active time
    const docRef = doc(db, "users", user?.uid);
    await setDoc(docRef, { lastSeen: serverTimestamp() }, { merge: true });
    const messagseRef = collection(db, "chats", chat_id, "messages");
    await addDoc(messagseRef, {
      timestamp: serverTimestamp(),
      message: input,
      useremail: user?.email,
      avatar: user?.photoURL,
    });
    // add letest message in sidebar
    const chatRef = doc(db, "chats", chat_id);
    setDoc(
      chatRef,
      {
        latestMessage: input,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setInput("");
  };

  return (
    <ChatC>
      <ChatContainerC>
        <HeaderC>
          <Avatar src={friends.avatar} />
          <HinfoC>
            <h2>{friends.username}</h2>
            <h4>
              Last Active : {moment(friends.lastSeen?.toDate()).fromNow()}
            </h4>
          </HinfoC>
          <IconC>
            <IconButton>
              <SearchIcon />
              <MenuseChat />
            </IconButton>
          </IconC>
        </HeaderC>
        <MessagesCotainerC onClick={() => setIsEmoji(false)}>
          {messages.map(({ message, id, timestamp, useremail }) => (
            <Message
              key={id}
              message={message}
              timestamp={timestamp}
              userMessage={useremail}
            />
          ))}
          <div ref={chatEndRef} style={{ marginTop: "5px" }}>
            {isEmoji && (
              <div onClick={(e) => e.stopPropagation()}>
                <Picker
                  onSelect={addEmoji}
                  style={{
                    maxWidth: "320px",
                    borderRadius: "20px",
                    position: "absolute",
                    bottom: "10vh",
                  }}
                  showPreview={false}
                  showSkinTones={false}
                  theme="dark"
                />
              </div>
            )}
          </div>
        </MessagesCotainerC>
        <InputContainerC>
          <IconinputC>
            <EmojiEmotionsIcon
              onClick={() => setIsEmoji(!isEmoji)}
              style={isEmoji ? { color: "#fcd82f" } : { color: "#ddd" }}
            />
          </IconinputC>
          <IconinputC>
            <AttachFileIcon style={{ transform: "rotate(15deg)" }} />
          </IconinputC>
          <InputC
            placeholder="Type a Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconinputC>
            <SendMessageC
              onClick={handleSendMessage}
              disabled={!input.trim() && true}
            >
              <SendIcon
                style={
                  !input.trim()
                    ? { color: "#ddd", pointerEvents: "none" }
                    : { color: "#9dffed" }
                }
              />
            </SendMessageC>
          </IconinputC>
        </InputContainerC>
      </ChatContainerC>
    </ChatC>
  );
};

export default Chat;

const ChatC = styled.div`
  width: 100%;
  height: 100vh;
`;
const ChatContainerC = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeaderC = styled.div`
  position: sticky;
  top: 0;
  z-index: 44636;
  display: flex;
  padding: 10px;
  height: 80px;
  align-items: center;
  border-bottom: var(--Line);
  background-color: var(--secondBg);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  h2 {
    text-transform: capitalize;
  }
`;

const MessagesCotainerC = styled.div`
  padding: 7vh 30px 0px 30px;
  flex: 1;
  background-image: url("/back.png");
  background-attachment: fixed;
  background-size: contain;
  max-height: 90vh;
  min-height: 90vh;
`;

const HinfoC = styled.div`
  margin-left: 5px;
  padding: 5px;
  > h2 {
    font-size: 20px;
    font-weight: 500;

    margin-bottom: 2px;
  }
  > h4 {
    font-size: 14px;
    color: var(--Line);
  }
`;

const IconC = styled.div`
  width: fit-content;
  margin-left: auto;
  cursor: pointer;
`;

const InputContainerC = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  z-index: 1000;
  background-color: var(--secondBg);
`;

const InputC = styled.input`
  flex: 1;
  outline-width: 0;
  border-radius: 20px;
  margin: 0px 15px;
  padding: 18px;
  background-color: #33383b;
  color: var(--Color);
  border: var(--Line);
`;
const IconinputC = styled.div`
  padding: 5px;
`;

const SendMessageC = styled.button`
  border: none;
  outline-width: 0;
  background-color: inherit;
`;
