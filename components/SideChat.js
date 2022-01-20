import styled from "styled-components";
import moment from "moment";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { auth } from "../features/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getFriendsData from "./helper/getFriendsData";

const SideChat = ({ users, id, timestamp, latestMessage }) => {
  const [friends, setFriends] = useState({});
  const [active, setActive] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const sideChatRef = useRef(null);
  const handleOpenChat = () => {
    router.push(`/${id}`);
  };


  useEffect(() => {
    if (users.length > 0) {
      getFriendsData(users).then((data) => {
        setFriends(data);
      });
    }
  });

  const handleSliceString = (string, n) => {
    return string?.split("").length > n ? string.slice(0, n) : string;
  };

  return (
    <SideChatC
      ref={sideChatRef}
      onClick={handleOpenChat}
  
    >
      <Avatar src={friends.avatar} style={{ width: "53px", height: "53px" }} />
      <MessageC>
        <TitleC>
          <h2>{friends.username}</h2>
          <h3>{timestamp ? moment(timestamp?.toDate()).format("LT") : ""}</h3>
        </TitleC>
        <TextC>
          <h2>{handleSliceString(latestMessage, 30)}</h2>
        </TextC>
      </MessageC>
    </SideChatC>
  );
};

export default SideChat;

const SideChatC = styled.div`
  display: flex;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  cursor: pointer;
  min-height: 70px;
  max-height: 90px;
  padding-left: 15px;
  word-break: break-word;
  transition: 100ms ease;
  border-bottom: var(--Line);
  border-top: var(--Line);
  :hover {
    background-color: var(--secondBg);
  }
`;

const MessageC = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px 0px 12px 15px;
`;
const TitleC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--Color);
  h2 {
    width: fit-content;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: bold;
  }
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
`;
const TextC = styled.div`
  color: var(--Color);
  margin-top: 4px;
  h2 {
    font-size: 16px;
    font-weight: 400;
  }
`;
