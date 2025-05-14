import { useContext, useState } from "react";
import Title from "../../Components/Title";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

type PostForm = {
  title: string;
  body: string;
};

type ErrorMessages = {
  title?: string[];
  body?: string[];
};

export default function Create() {
  const navigate = useNavigate();

  const { token } = useContext(AppContext);

  const initialValues: PostForm = { title: "", body: "" };
  const [formData, setFormData] = useState<PostForm>(initialValues);

  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Title title="Create new post" />

      <div className="flex items-center justify-center mt-30">
        <form
          onSubmit={handleCreate}
          className="w-[500px] p-10 rounded shadow space-y-5"
        >
          <div>
            <input
              type="text"
              placeholder="Post title"
              className="p-3 w-full bg-gray-100 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
            )}
          </div>
          <div>
            <textarea
              rows={10}
              placeholder="Post body"
              className="p-3 w-full bg-gray-100 rounded"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body[0]}</p>
            )}
          </div>
          <button className="bg-zinc-800 text-white w-full p-3 rounded hover:bg-zinc-700 transition duration-200s">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
