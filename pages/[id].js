import styled from "styled-components";
import Chat from "../components/Chat";
import { doc, getDoc, getDocs  , query , orderBy , collection } from "firebase/firestore";
import { db } from "../features/firebase";

const Chatbox = ({ chat, id  }) => {
  return (
    <ChatboxC>
      <ChatContainerC>
        <Chat chat={chat} chat_id={id} />
      </ChatContainerC>
    </ChatboxC>
  );
};

export default Chatbox;

export async function getServerSideProps(context) {
  // const messageRef = collection(db, "chats", context.query.id, "messages");
  // const q = query(messageRef, orderBy("timestamp", "asc"));
  // const qSnapshot = await getDocs(q);
  // const messages = qSnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   id: doc.id,
  //   timestamp: doc.data().timestamp?.toDate().getTime(),
  // }));
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);
  return {
    props: {
      chat: JSON.stringify(docSnap.data()) || null,
      id: context.query.id || null,
      // messages:JSON.stringify(messages) || null,
    },
  };
}

const ChatboxC = styled.div`
  width: 100%;
  height: 100vh;
  color: var(--Color);
`;

const ChatContainerC = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    width: 5px !important;
    height: 5px !important;
  }
  ::-webkit-scrollbar-corner {
    background-color: #000 !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
  }
  /* @media (max-width: 600px) {
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  } */
`;
