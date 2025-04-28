import { Metadata } from "next";

import LoginTemplate from "@/components/account/_templates/login-template";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Gibbarosa account.",
};

export default function Login() {
  return <LoginTemplate />;
}
