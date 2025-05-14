import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <nav>
          <div className="bg-zinc-800 text-white p-5 flex items-center justify-between px-10">
            <Link
              to="/"
              className="py-2 px-3 rounded hover:bg-zinc-700 transition duration-200"
            >
              Home
            </Link>
            {user ? (
              <div className="flex space-x-5 items-center">
                <p>Welcome back, {user.name}!</p>
                <Link
                  to="/create"
                  className="py-2 px-3 rounded hover:bg-zinc-700 transition duration-200"
                >
                  New Post
                </Link>
                <form onSubmit={handleLogout}>
                  <button className="text-red-500">Logout</button>
                </form>
              </div>
            ) : (
              <div className="space-x-5">
                <Link
                  to="/register"
                  className="py-2 px-3 rounded hover:bg-zinc-700 transition duration-200"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-3 rounded hover:bg-zinc-700 transition duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
