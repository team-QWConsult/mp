import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = router.asPath;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    }
  }, [pathname]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password === process.env.NEXT_PUBLIC_ADMIN_ACCESS) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem("auth", "true");
        setIsAuthenticated(true);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Invalid credentials");
      }, 2000);
    }
  };

  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-200">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthWrapper;
