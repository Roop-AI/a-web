import { useToast } from "@chakra-ui/react";
import { doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";
import { setCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const LoginWithGoogle = (fireconfig: any) => {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const dispatch = useDispatch();
  const app = initializeApp(fireconfig);
  const auth = getAuth(app);
  const db = getFirestore();
  const router = useRouter();
  const toast = useToast();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Handle Google login
      const user: any = result.user;
      const userDocRef = doc(db, "users", user.uid);
      console.log("result", result);
      console.log("user", user);
      // Check if the user already exists in the 'users' collection
      let firstName = "";
      let lastName = "";

      // Split displayName into first name and last name
      if (user.displayName) {
        const nameParts = user.displayName.split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts[nameParts.length - 1] || "";
      }
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        setCookie("isNewUser", "true");
        setCookie("userToken", user.accessToken);
        setCookie("userId", user.uid);
        // User is not found in the collection, meaning they are new
        const userData = {
          credits: 10,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
        };
        toast({
          title: "Sign-In Successful",
          status: "success",
          position: "top-right",
          duration: null,
          isClosable: true,
        });
        await setDoc(userDocRef, userData);
        router.push("/success");
        return;
      }
      setCookie("userToken", user.accessToken);
      setCookie("userId", user.uid);
      // Proceed with the Google user's data
      toast({
        title: "Sign-In Successful",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      router.push("/imageGeneration");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user: any = result.user;
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  return {
    handleGoogleLogin,
    handleFacebookLogin,
  };
};

export default LoginWithGoogle;
