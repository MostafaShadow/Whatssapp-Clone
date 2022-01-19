import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../features/firebase";
import Menues from "./helper/Menues";
import ChatIcon from "@mui/icons-material/Chat";
import SideFriendsChat from "./SideFriendsChat";
import SideChat from "./SideChat";
import { useAuthState } from "react-firebase-hooks/auth";
const Sidebar = () => {
  const [sideChatFriends, setSideChatFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [showAllChats, setShowAllChats] = useState(false);
  const [user] = useAuthState(auth);
 
  // get users
  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("users", "array-contains", user?.uid));
    const unsubscribe = onSnapshot(q, (shot) => {
      setChats(shot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  // get Data and set data in setSideChatFriends
  useEffect(() => {
    async function getData() {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("email", "!=", user?.email));
      const qSnapshot = await getDocs(q);
      setSideChatFriends(
        qSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getData();
  }, []);


  return (
    <SidebarC>
      <SideContainerC>
        <SideHeaderC>
          <Avatar
            src={user?.photoURL}
            style={{ width: "45px", height: "45px", cursor: "pointer" }}
          />
          <IconsC>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <Menues />
          </IconsC>
        </SideHeaderC>

        <ContainerAddChat>
          <AddchatC onClick={(e) => setShowAllChats(!showAllChats)}>
            {" "}
            {showAllChats ? "Go to  chat friends." : "Add Friends ?"}
          </AddchatC>
        </ContainerAddChat>
        <TitleC>
          {!showAllChats
            ? chats.length
              ? "Chat friends."
              : ""
            : "All chats  ."}
        </TitleC>
        <SideChatContainerC>
          {!showAllChats ? (
            <>
              {chats.length ? (
                chats.map(({ id, users, latestMessage, timestamp }) => (
                  <SideChat
                    key={id}
                    id={id}
                    users={users}
                    latestMessage={latestMessage}
                    timestamp={timestamp}
                  />
                ))
              ) : (
                <DontchatC>
                  <h6>{`You don't have any friends ,`} </h6>
                  <h6> {`Please click on add friends.`}</h6>
                </DontchatC>
              )}
            </>
          ) : (
            <>
              {sideChatFriends?.map(({ id, avatar, username }) => (
                <SideFriendsChat
                  key={id}
                  avatar={avatar}
                  username={username}
                  id={id}
                  
                />
              ))}
            </>
          )}


        </SideChatContainerC>
      </SideContainerC>
    </SidebarC>
  );
};

export default Sidebar;

const SidebarC = styled.main`
  background-color: var(--bgColor);
  min-width: 300px;
  max-width: 450px;
  margin: 0px auto;
  border-right: var(--Line);
  flex: 0.3;
`;
const SideContainerC = styled.div``;
const SideHeaderC = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: var(--Line);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  background-color: var(--secondBg);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const AvatarI = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
    transition: all 200ms linear;
  }
`;
const IconsC = styled.div`
  padding: 5px;
`;

const SideChatContainerC = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 3px !important;
    height: 4px !important;
  }

  max-height: 100vh;
`;

const ContainerAddChat = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: var(--Line);
  margin-bottom: 5px;
`;
const AddchatC = styled.button`
  padding: 20px;
  margin: 4px auto;
  background-color: inherit;
  color: #fff;
  border: none;
  outline-width: 0;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
`;

const TitleC = styled.h3`
  font-size: 18px;
  font-weight: 200;
  opacity: 0.6;
  padding: 3px 20px;
`;

const DontchatC = styled.div`
  padding: 10px;
  text-align: center;
  margin-top: 20px;

  h6 {
    font-size: 16px;
    margin-top: 5px;
    color: #ccc;
    font-weight: 200;
  }
`;
