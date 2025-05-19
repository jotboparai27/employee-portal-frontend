import { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token);
      navigate("/");
    } catch {
      setErr("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5eee6] px-2">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#e5e6ea]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Company Logo" className="h-14 mb-2" />
          <h1 className="text-2xl font-bold text-[#525c6b]">Employee Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {err && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded">{err}</div>
          )}
          <input
            type="email"
            className="border border-[#d5d7df] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#525c6b]"
            placeholder="Email address"
            value={email}
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-[#d5d7df] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#525c6b]"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-[#525c6b] hover:bg-[#313744] text-white font-semibold py-3 rounded mt-2 transition-colors ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* <div className="text-center mt-4 text-[#525c6b]">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-[#a57547] hover:underline font-semibold">
            Register
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
