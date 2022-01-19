import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { auth, db } from "../features/firebase";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const SideFriendsChat = ({ avatar, username, id }) => {
  const [cureentuser] = useAuthState(auth);

  const handleCreateChat = async (id) => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("users", "array-contains", cureentuser.uid)
    );
    const qSnapshot = await getDocs(q);
    const chatExit = (friends_id) => {
      return !!qSnapshot.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friends_id)?.length > 0
      );
    };
    if (!chatExit(id)) {
      addDoc(chatsRef, { users: [cureentuser.uid, id] });
    }
  };

  return (
    <SideChatC onClick={() => handleCreateChat(id)}>
      <Avatar src={avatar} />
      <MessageC>
        <TitleC>
          <h2>{username}</h2>
        </TitleC>
      </MessageC>
      <ButtonC>Add Friends</ButtonC>
    </SideChatC>
  );
};

export default SideFriendsChat;

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
  h2 {
    font-size: 16px;
    font-weight: 400;
  }
`;

const ButtonC = styled.button`
  padding: 15px;
  border-radius: 6px;
  border: none;
  outline-width: 0;
  background-color: var(--secondBg);
  color: #fff;
  cursor: pointer;
`;
