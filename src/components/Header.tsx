import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home");
  };

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
        border-b
        border-b-2
        border-roTeal
        backdrop-blur
      "
    >
      <div className="flex items-center cursor-pointer" onClick={goToHome}>
        <Image
          src="/icon.png"
          alt="Logo"
          width={50}
          height={50}
          className="mr-2"
        />
        <h1 className="hidden md:block font-bold text-roAquaBlue text-4xl">
          Rising Oceans
        </h1>
      </div>

      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Header;
