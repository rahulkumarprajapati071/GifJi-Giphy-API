import { AuthContext } from "@/provider/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GUEST_ROUTES = ["/login", "/register"];

const useAuthentication = () => {
  const { user } = AuthContext();
  const userInfo = user?.user || null;
  const router = useRouter();
  // const currentRoute = Window.location.pathname;

  // useEffect(() => {
  //   if (!userInfo && !GUEST_ROUTES.includes(currentRoute)) {
  //     router.push("/login");
  //   }

  //   if (userInfo && GUEST_ROUTES.includes(currentRoute)) {
  //     router.push("/home");
  //   }
  // }, [userInfo, currentRoute, router]);

  // Return some data if needed
  return { userInfo };
};

export default useAuthentication;
