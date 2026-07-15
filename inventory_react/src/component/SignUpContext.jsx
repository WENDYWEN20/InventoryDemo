import React, { useState, createContext, useContext } from "react";
const SignUpContext = createContext();
export default function SignUpProvider({ children }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    const [emailError, setEmailError] = useState("");
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(e.target.value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
  };
  const [preferences, setPreferences] = useState([
    { name: "JavaScript", value: false },
    { name: "Python", value: false },
    { name: "Ruby", value: false },
    { name: "Java", value: false },
  ]);
  const handlePreferences = (e) => {
    setPreferences(
      preferences.map((preference) =>
        preference.name === e.target.name
          ? { ...preference, value: e.target.checked }
          : preference
      )
    );
  };

  return (
    <SignUpContext.Provider
      value={{ user, handleChange, preferences, handlePreferences }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUp = () => useContext(SignUpContext);
