import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-full bg-teal-100">{children}</div>;
}

export default Layout;
