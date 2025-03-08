import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

function App() {
  const location = useLocation();

  return (
    <MovieProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen w-full">
                <Loader className="animate-spin text-white" size={40} />
              </div>
            }
          >
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/movie-details" element={<MovieDetails />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </motion.div>
          </Suspense>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
