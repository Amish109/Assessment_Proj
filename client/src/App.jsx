import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithPopup, provider, signOut } from "./firebase";
import LoginButton from "./components/LoginButton";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="">
      {user ? (
        // <Profile user={user} logout={logout}/>
        <>
          <Navbar user={user} logout={logout} login={login}/>
          <div className="min-h-screen px-2.5">
           <Outlet/>
          </div>
          <Footer/>
        </>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
          <LoginButton onClick={login} type={'login'}/>
        </div>
      )}
    </div>
  );
}
