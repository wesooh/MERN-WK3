import { useEffect, useState } from "react";

export default function API() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-4">Loading posts...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">API Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        className="p-2 border rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <li key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-bold mb-2 text-lg">{post.title}</h3>
            <p className="text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
