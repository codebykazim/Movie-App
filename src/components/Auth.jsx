import React, { useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Auth({ isMobile }) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const returnTo = localStorage.getItem("returnTo");
      localStorage.removeItem("returnTo");
      if (returnTo) {
        navigate(returnTo);
      }
    }
  }, [isSignedIn, navigate]);

  return (
    <div className={`${isMobile ? "w-full" : ""}`}>
      <SignedOut>
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          onClick={() =>
            window.Clerk.openSignIn({
              redirectUrl: window.location.href,
            })
          }
        >
          Login
        </button>
      </SignedOut>

      <SignedIn>
        <div
          className={`flex items-center ${
            isMobile ? "flex-col space-y-4" : "space-x-4"
          }`}
        >
          <UserButton afterSignOutUrl="/" />
          <button
            className="bg-red-600 px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
            onClick={() => window.Clerk.signOut()}
          >
            Logout
          </button>
        </div>
      </SignedIn>
    </div>
  );
}

export default Auth;
