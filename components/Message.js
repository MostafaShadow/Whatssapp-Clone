import React from "react";
import moment from "moment";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../features/firebase";

const Message = ({ userMessage, message, timestamp }) => {
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const MessageType = userMessage === userEmail ? MessageM : MessageY;
  return (
    <React.Fragment>
      {userMessage !== userEmail && (
        <MessageC >
          <MessageType>
            <TextC>{message}</TextC>
            <TimeStampC>{moment(timestamp).format("LT")}</TimeStampC>
          </MessageType>
        </MessageC>
      )}

      {userMessage === userEmail && (
        <MessageC>
          <MessageType>
            <TextC>{message}</TextC>
            <TimeStampC>{moment(timestamp).format("LT")}</TimeStampC>
          </MessageType>
        </MessageC>
      )}
    </React.Fragment>
  );
};

export default Message;

const MessageC = styled.div`
  display: flex;
`;

const MessageMain = styled.div`
  margin-bottom: 10px;
  position: relative;
  padding: 7px 15px;
  max-width: 70%;
`;
const TextC = styled.p`
  word-break: break-word;
`;
const MessageM = styled(MessageMain)`
  margin-left: auto;
  background-color: #056162;
  border-radius: 8px 0px 8px 8px;
  text-align: right;
  overflow: hidden;
`;
const MessageY = styled(MessageMain)`
  background-color: #262d31;
  border-radius: 0px 8px 8px 8px;
  margin-right: auto;
`;

const TimeStampC = styled.span`
  font-size: 10px;
  text-align: right;
`;
