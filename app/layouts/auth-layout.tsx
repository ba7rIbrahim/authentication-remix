import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-full bg-teal-100">{children}</div>;
};

export default AuthLayout;
