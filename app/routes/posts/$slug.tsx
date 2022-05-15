import { Post } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

type LoaderData = {post: Post, html: string}

export const loader: LoaderFunction = async ({params}) => {
  invariant(params.slug, "slug is required")

  const post = await getPost(params.slug)
  invariant(post, 'post not found')

  return json<LoaderData>({post, html: marked(post.markdown)})
}

export default function PostSlug() {
  const {post, html} = useLoaderData() as LoaderData
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Post: {post.title}
      </h1>
      <div dangerouslySetInnerHTML={ {__html: html} } />
    </main>
  );
}