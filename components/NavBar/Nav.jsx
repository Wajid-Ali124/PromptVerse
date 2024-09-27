"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { data: session } = useSession();
  let isLoggedIn = session?.user;
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.png" alt="PromptVerse Logo" width={100} height={100} />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/* Desktop Nav */}
      <DesktopNav signIn={signIn} signOut={signOut} providers={providers} isLoggedIn={isLoggedIn} />

      {/* Mobile Nav */}
      <MobileNav
        toggle={toggle}
        setToggle={setToggle}
        providers={providers}
        signIn={signIn}
        signOut={signOut}
        isLoggedIn={isLoggedIn}
      />
    </nav>
  );
};

export default Nav;
