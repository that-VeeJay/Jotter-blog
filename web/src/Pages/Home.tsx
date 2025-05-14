import { useEffect, useState } from "react";
import Title from "../Components/Title";
import { Link } from "react-router-dom";

type PostType = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user: {
    name: string;
  };
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();

    if (response.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Title title="Latest Posts" />

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="p-10 m-8 bg-gray-200 shadow-lg rounded-lg"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <small>
                  Create by {post.user.name} on{" "}
                  {new Date(post.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link to={`/posts/${post.id}`} className="text-blue-500">
                Read more
              </Link>
            </div>

            <p className="line-clamp-3 text-gray-500">{post.body}</p>
          </div>
        ))
      ) : (
        <p>There are no posts available.</p>
      )}
    </>
  );
}
