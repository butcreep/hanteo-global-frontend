import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-[425px] h-[900px] mx-auto border border-gray-300 flex flex-col overflow-hidden">{children}</div>
  );
};

export default Layout;
