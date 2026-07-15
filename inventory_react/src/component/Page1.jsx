import React, { useState } from "react";
import { useSignUp } from "./SignUpContext";
export default function Page1({ onNext }) {
  const { user, handleChange } = useSignUp();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>email</label>
          <input type="text" value={user.email} name="email" onChange={handleChange} />
          <label> password</label>
          <input type="text" 
            value={user.password}
            name="password"
            onChange={handleChange} 
          />
          <label>Confirm Password</label>
          <input type="text" value={user.confirmPassword} name="confirmPassword" onChange={handleChange} />

          <button type='submit'>submit</button>
        </form>
        {/* {emailError && <p>{emailError}</p>} */}
      </div>

      <p className="read-the-docs">your email entered is {user.email}</p>
    </div>
  );
}
