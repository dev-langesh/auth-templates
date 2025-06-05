"use client";

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
    const token = response.credential;

    console.log(token);

    // Send token to backend for verification
    // const res = await fetch("http://localhost:5000/api/auth/google", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ token }),
    // });

    // const data = await res.json();
    // console.log(data);
    // Save JWT / session here
  };

  return <div id="googleBtn"></div>;
}

export default Login;
