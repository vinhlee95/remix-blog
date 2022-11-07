import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPostListing } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListing>>
}

// Fetch posts from BE
export const loader = async () => {
  return json<LoaderData>({
    posts: await getPostListing(),
  });
};

export default function Admin() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <>
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className="text-blue-600 underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}