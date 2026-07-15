import React from "react";
import { useSignUp } from "./SignUpContext";
export default function Page2({ onPrev }) {
  const { preferences, handlePreferences } = useSignUp();

  return (
    <div>
      <h2>SignUp Page 2</h2>
      <ul>
        {preferences.map((preference) => (
          <li key={preference.name}>
            <input
              type="checkbox"
              name={preference.name}
              checked={preference.value}
              onChange={handlePreferences}
            />
            <label htmlFor={preference.name}>{preference.name}</label>
          </li>
        ))}
      </ul>
      <button onClick={onPrev}>Prev Page</button>
      <button>Submit</button>
    </div>
  );
}
