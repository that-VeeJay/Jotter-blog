import { useContext, useState } from "react";
import Title from "../../Components/Title";
import { AppContext } from "../../Context/AppContext";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ErrorMessages = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

const initialValues: RegisterForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function Register() {
  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState<RegisterForm>(initialValues);

  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setFormData(initialValues);
      setErrors({});
    }
  };

  return (
    <>
      <Title title="Register" />

      <div className="flex items-center justify-center mt-30">
        <form
          onSubmit={handleRegister}
          className="w-[500px] p-10 rounded shadow space-y-5"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-3 w-full bg-gray-100 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              className="p-3 w-full bg-gray-100 rounded"
            />
          </div>

          <button className="bg-zinc-800 text-white w-full p-3 rounded hover:bg-zinc-700 transition duration-200s">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
