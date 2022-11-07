import type { Post } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

type LoaderData = {post: Post}

export const loader: LoaderFunction = async ({params}) => {
  invariant(params.slug, "slug is required")

  const post = await getPost(params.slug)
  invariant(post, 'post not found')

  return json<LoaderData>({post})
}

export default function AdminEditPost() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Edit: {post.title}</h1>
      <input style={{border: '1px solid grey'}} />
    </main>
  );
}