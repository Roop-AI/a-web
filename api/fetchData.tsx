import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import firebaseConfig from "../lib/firebaseConfig";

interface UserActivityData {
  id: string;
}

export async function FetchUserActivityData(): Promise<{
  userActivityData: UserActivityData[];
}> {
  try {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, "user_activity"));
    const userActivityData: UserActivityData[] = [];

    querySnapshot.forEach((doc) => {
      userActivityData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      userActivityData,
    };
  } catch (error) {
    // Handle the error (e.g., log or throw an error)
    throw new Error("Failed to fetch user activity data");
  }
}
