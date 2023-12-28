import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import firebaseConfig from "../lib/firebaseConfig";

interface PaidUsersData {
  id: string;
}

export async function FetchPaidUsersData(): Promise<{
    paidUsersData: PaidUsersData[];
}> {
  try {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, "users"));
    const paidUsersData: PaidUsersData[] = [];

    querySnapshot.forEach((doc) => {
      paidUsersData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      paidUsersData,
    };
  } catch (error) {
    // Handle the error (e.g., log or throw an error)
    throw new Error("Failed to fetch paid credits and subscription data");
  }
}
