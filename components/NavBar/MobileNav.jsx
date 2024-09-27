import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const MobileNav = ({ toggle, setToggle, providers, signIn, signOut, isLoggedIn }) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="Profile Image"
              className="rounded-full"
              onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggle(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggle(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggle(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default MobileNav;
