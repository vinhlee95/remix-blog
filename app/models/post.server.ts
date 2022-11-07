import { Post } from '@prisma/client'
import { prisma } from '~/db.server'

/**
 * Return a list of posts with all fields
 * 
 * @returns {Promise<Post[]>}
 */
export async function getPosts(): Promise<Array<Post>> {
  return prisma.post.findMany()
}

/**
 * Return a list of posts having only the fields specified in the `select` argument,
 * these are what the FE actually needs to render the page.
 * 
 * @returns {Promise<Array<Post>>}
 */
export async function getPostListing(): Promise<Array<Pick<Post, 'slug' | 'title'>>> {
  return prisma.post.findMany({
    select: {
      title: true,
      slug: true,
    }
  })
}

export async function getPost(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { slug } })
}