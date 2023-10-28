"use client";

import Footer from "@/src/components/sections/Footer";
import Navbar from "@/src/components/sections/Navbar";
import Profile from "@/src/components/sections/Profile";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between ">
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
};

export default page;
