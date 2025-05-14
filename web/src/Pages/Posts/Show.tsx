import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

type Post = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user: {
    name: string;
  };
  user_id: number;
};

export default function Show() {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);

  const getPosts = async () => {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();

    console.log(data);
    if (response.ok) {
      setPost(data.post);
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user.id === post?.user_id) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {post ? (
        <div
          key={post.id}
          className="p-10 m-8 bg-gray-200 shadow-lg rounded-lg"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <small>
                Create by {post.user?.name ?? "Unknown"} on{" "}
                {new Date(post.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>

          <p className="text-gray-500">{post.body}</p>

          {user && user.id === post.user_id && (
            <div>
              <Link to={`/posts/update/${post.id}`} className="text-green-500">
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="text-red-500">Delete</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </>
  );
}
