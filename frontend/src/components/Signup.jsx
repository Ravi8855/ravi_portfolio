import { useState } from "react";
import { signup } from "../services/authService.js";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(data);
      alert("Account created!");
      window.location.href = "/login";
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
        <h1 className="text-xl mb-4">Signup</h1>

        <input
          type="text"
          placeholder="Name"
          className="mb-2 p-2 border w-full"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-2 p-2 border w-full"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border w-full"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="bg-green-600 text-white px-4 py-2 w-full rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
