import React from "react";
import { Home, Contact } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    // { name: 'About', url: '#', icon: User },
    // { name: 'Projects', url: '#', icon: Briefcase },
    { name: "Contact Us", url: "#footer", icon: Contact },
  ];

  return (
    <div className="relative flex w-screen justify-between items-center">
      <Link href="/">
      <div className="absolute top-3 left-5 z-10 flex items-center">
        <Image
          src="/logo/imm.jpg"
          alt="qualityproperty logo"
          width={50}
          height={50}
          sizes="50px"
          className="mr-2 mt-1"
        />
        <p className="mt-1">Quality Property</p>
      </div>
      </Link>
      <NavBar items={navItems} />
      {/* <RainbowButton>sign up</RainbowButton> */}
    </div>
  );
}
