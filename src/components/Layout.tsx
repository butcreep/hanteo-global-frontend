import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen sm:w-[425px] sm:h-[900px] mx-auto border border-gray-300 flex flex-col overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
