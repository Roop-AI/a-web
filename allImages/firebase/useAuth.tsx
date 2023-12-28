import { FirebaseConfig } from "@/interfaces/imageGenerationInterface";
import { useToast } from "@chakra-ui/react";
import { setCookie, deleteCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import auth from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UseFireBaseAuthProps {
  firebaseConfig: FirebaseConfig;
}

const useFireBaseAuth = ({ firebaseConfig }: UseFireBaseAuthProps) => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<auth.User | null>(null);
  const [loading, setLoading] = useState(true);
  let app: any;
  let authInstance: auth.Auth;
  const toast = useToast();

  if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  }

  const handleLogout = () => {
    signOut(authInstance).then((res) => {
      deleteCookie("userToken");
      deleteCookie("userId");
      deleteCookie("isNewUser");
      router.push("/");
    });
  };

  const authStateChangeHandler = (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
    } else {
      setAuthUser(authState);
      setCookie("userToken", authState.accessToken);
      setCookie("userId", authState.uid);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(authStateChangeHandler);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: authUser,
    loading,
    logOut: handleLogout,
  };
};
export default useFireBaseAuth;
