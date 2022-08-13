import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../supabase/client";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.auth.signIn({ email });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (client.auth.user()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="example@si.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};
