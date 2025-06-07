"use client";

import { api } from "@/api/axios";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        use_fedcm_for_prompt: true,
        use_fedcm_for_button: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt((notification) => {
        console.log("Prompt status:", notification);
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response) => {
    const idToken = response.credential;

    console.log(idToken);

    const res = await api.post("/auth/login/google", { idToken });

    console.log(res);
  };

  return <div id="googleBtn"></div>;
}

export default Login;
