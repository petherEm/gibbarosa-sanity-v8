"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ForgotPassword from "@/components/account/forgot-password";
import Login from "@/components/account/login";
import Register from "@/components/account/register";
import { Box } from "@/components/shared/box";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
}

const LoginTemplate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");

  const [currentView, setCurrentView] = useState("sign-in");

  useEffect(() => {
    if (mode) {
      setCurrentView(mode);
      // Use this approach instead of router.replace to avoid full navigation
      window.history.replaceState(null, "", "/account");
    }
  }, [mode]);

  let Component = Login;
  switch (currentView) {
    case "sign-in":
      Component = Login;
      break;
    case "register":
      Component = Register;
      break;
    case "forgot-password":
      Component = ForgotPassword;
      break;
    default:
      break;
  }

  return (
    <Box className="flex w-full">
      <Component setCurrentView={setCurrentView} />
    </Box>
  );
};

export default LoginTemplate;
