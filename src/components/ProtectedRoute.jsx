import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const location = useLocation();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }


  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold">Access Restricted</h2>
          <p className="text-gray-400 mt-2">
            You must be signed in to view your favorites.
          </p>
          <div className="mt-4">
            <button
              onClick={() => openSignIn({ redirectUrl: location.pathname })}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg text-white"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
