import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Header = () => {
  return (
    <nav
      className="
        flex 
        justify-between 
        items-center 
        p-5
        bg-transparent 
        sticky 
        top-0 
        shadow-md
        z-50
      "
    >
      <div className="font-bold text-white">Rising oceans</div>

      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Header;
