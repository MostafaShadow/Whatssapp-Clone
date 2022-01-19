import { doc, getDoc } from "firebase/firestore";
import { db } from "../../features/firebase";
import { getAuth } from "firebase/auth";

async function getFriendsData(users) {
  const { currentUser } = getAuth();
  const friend_id = users?.filter((user) => user !== currentUser?.uid);
  const docRef = doc(db, "users", friend_id[0]);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export default getFriendsData;
