import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "", // required
    password: "", // required
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", formData)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h1>Login Form</h1>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          type="text"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        ></input>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
