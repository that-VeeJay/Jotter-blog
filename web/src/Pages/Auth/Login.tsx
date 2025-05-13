import { useContext, useState } from "react";
import Title from "../../Components/Title";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

type ErrorMessages = {
  email?: string;
  password?: string;
};

const initialValues: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginForm>(initialValues);

  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setFormData(initialValues);
      setErrors({});
      navigate("/");
    }
  };

  return (
    <>
      <Title title="Login" />

      <div className="flex items-center justify-center mt-30">
        <form
          onSubmit={handleLogin}
          className="w-[500px] p-10 rounded shadow space-y-5"
        >
          <div>
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 w-full bg-gray-100 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-3 w-full bg-gray-100 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <button className="bg-zinc-800 text-white w-full p-3 rounded hover:bg-zinc-700 transition duration-200s">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
