
import { useState } from "react"
import axios from "axios";

const API_REGISTER = "https://localhost:7243/auth/register";
const API_LOGIN = "https://localhost:7243/auth/login";
function RegisterLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");

  const successMessage = "✅ Operation completed successfully.";
  const titleText = showRegister ? "Register" : "Login";
  const toggleText = showRegister ? "Register" : "Login";

  const getPasswordStrength = (value) => {
    if (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#\$%\^&\*]/.test(value)
    ) {
      return "strong";
    }
    if (value.length >= 6) return "medium";
    return "weak";
  };

  const handleRegister = async () => {
  if (!username || !password) {
    setErrorText("❌ Username or password is missing");
    setShowError(true);
    setShowSuccess(false);
    setTimeout(() => setShowError(false), 3000);
    return;
  }

  if (getPasswordStrength(password) === "weak") {
    setErrorText("❌ Weak password. Please use a stronger one.");
    setShowError(true);
    setShowSuccess(false);
    setTimeout(() => setShowError(false), 3000);
    return;
  }

  try {
    setIsSubmitting(true);

    await axios.post(API_REGISTER, {
      username,
      password,
    });

    setShowSuccess(true);
    setShowError(false);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    if (err.response?.status === 409) {
      setErrorText("❌ Username already exists");
    } else {
      setErrorText("❌ Registration failed");
    }
    setShowError(true);
    setShowSuccess(false);
    setTimeout(() => setShowError(false), 3000);
  } finally {
    setIsSubmitting(false);
  }
};

const handleLogin = async () => {
  if (!username || !password) {
    setErrorText("❌ Username or password is missing");
    setShowError(true);
    setShowLoginError(false);
    setShowSuccess(false);
    setTimeout(() => setShowError(false), 3000);
    return;
  }

  try {
    setIsSubmitting(true);
    const res = await axios.post(API_LOGIN, { username, password });

    localStorage.setItem("user_id", res.data.id);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("token", res.data.token);

    setShowSuccess(true);
    setShowError(false);
    setShowLoginError(false);

    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = "/musicapp";
    }, 1000);
  } catch (err) {
    setShowLoginError(true);
    setShowError(false);
    setShowSuccess(false);
    setTimeout(() => setShowLoginError(false), 3000);
  } finally {
    setIsSubmitting(false);
  }
};


  const submitHandler = showRegister ? handleRegister : handleLogin;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-white via-purple-700">
      <div className="bg-gradient-to-br from-white via-purple-700 to-black 
        text-white p-8 rounded-xl w-[500px] relative 
        shadow-[0_0_20px_#9333ea,_0_0_40px_#7f5af0]">

        <h2 className="text-2xl font-bold text-center mb-6">{titleText}</h2>

        <div className="mb-4">
          <label className="text-sm block mb-1">Username</label>
          <input
            type="text"
            value={username}
            disabled={isSubmitting || showSuccess}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-transparent border border-white/50 focus:outline-none"
            placeholder="Username"
          />
        </div>

        <div className="mb-4 relative">
          <label className="text-sm block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            disabled={isSubmitting || showSuccess}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              if (showRegister) {
                setPasswordStrength(getPasswordStrength(value));
              }
            }}
            className="w-full p-2 pr-16 rounded bg-transparent border border-white/50 focus:outline-none"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-white text-sm underline"
            title={showPassword ? "Hide" : "Show"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

          {showRegister && password && (
            <div className="text-xs mt-1 text-[90%]">
              <span
                className={
                  passwordStrength === "strong"
                    ? "text-green-400"
                    : passwordStrength === "medium"
                    ? "text-yellow-400"
                    : "text-red-700"
                }
              >
                {passwordStrength === "strong"
                  ? "Strong password"
                  : passwordStrength === "medium"
                  ? "Medium password"
                  : "Weak password"}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={submitHandler}
          disabled={isSubmitting || showSuccess}
          className="w-full rounded-lg bg-white text-black py-2 font-semibold hover:bg-gray-200 transition shadow-[0_0_10px_#9333ea,_0_0_30px_#00ffe0,_0_0_40px_#ff80bf]"
        >
          {toggleText}
        </button>

        <p className="text-xs text-center mt-4">
          {showRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setShowRegister(!showRegister);
              setUsername("");
              setPassword("");
              setPasswordStrength("");
              setShowError(false);
              setShowLoginError(false);
              setShowSuccess(false);
            }}
            className="underline font-bold"
          >
            {showRegister ? "Login" : "Register"}
          </button>
        </p>

        {showSuccess && (
          <div className="text-green-400 mt-3 text-center">
            {successMessage}
          </div>
        )}
        {showError && (
          <div className="text-red-400 mt-3 text-center">{errorText}</div>
        )}
        {showLoginError && (
          <div className="text-red-400 mt-3 text-center">
            ❌ Incorrect username or password.
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterLogin;
