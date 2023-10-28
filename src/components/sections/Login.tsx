import React, { useState } from "react";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import login from "@/src/service/login";
import useStore from "@/src/store/store";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { githubLogin, googleLogin } from "@/src/service/0auth";
import { useSession, signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setSession, setUser, setRealTime } = useStore();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login(email, password);
    console.log("data", data);
    if (!data) {
      throw new Error("User not found.");
    }

    setSession(data.session);
    setUser(data.user);
    console.log("Login successful.");
    if (data.session !== null) {
      await router.push("/");
    }
    return data;
  };

  const googleSignIn = async () => {
    const data = await googleLogin();
    if (!data) {
      throw new Error("Google login failed.");
    }
    await setSession(data);
    await setUser(data);
    return data;
  };

  const githubSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await githubLogin();
    if (!data) {
      throw new Error("Github login failed.");
    }
    await setSession(data);
    await setUser(data);
    return data;
  };

  return (
    <div className="flex justify-center items-center pt-16 pb-32 hero-bg">
      <form
        onSubmit={handleSignIn}
        className="text-white flex flex-col justify-center items-center gap-8 pt-14 pb-12 px-20 shadow-md border border-pink-200 rounded-tr-3xl rounded-bl-3xl py-4 form-bg rounded-md"
      >
        <h1 className="text-lg text-white font-medium underline underline-offset-4 border-2 border-teal-200 py-3 px-4 bg-slate-400 rounded-lg">
          Sign in
        </h1>
        <div className="w-full flex flex-col gap-6 pt-4 pb-6">
          <Input
            value={email}
            label="Email"
            placeholder="Enter Email"
            setState={setEmail}
          />
          <Input
            type="password"
            value={password}
            label="Password"
            placeholder="Enter Password"
            setState={setPassword}
          />
        </div>
        <Button
          text={"Sign in"}
          className="px-6 py-2 shadow-sm bg-teal-300 rounded-md text-slate-600 font-semibold hover:shadow-md hover:shadow-pink-200 active:scale-110"
        />
        <p className="">Or log in with:</p>

        <div className="w-full flex justify-center items-center gap-2 pb-6 ">
          <h3 className="text-sm">
            Need a new account?{" "}
            <span
              onClick={() => router.push("/registration")}
              className="text-teal-200 hover:text-teal-100 cursor-pointer hover:underline underline-offset-4"
            >
              Register here
            </span>
            .
          </h3>
        </div>
        <div className="w-full flex justify-center gap-10 pb-2">
          <FcGoogle
            size={30}
            onClick={googleSignIn}
            className="cursor-pointer hover:scale-110"
          />
          {/* <ImGithub
            size={30}
            onClick={}
            className="cursor-pointer hover:scale-110"
          /> */}
          <button onClick={() => signIn()}>github</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
