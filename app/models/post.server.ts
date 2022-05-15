import { Post } from '@prisma/client'
import { prisma } from '~/db.server'

export async function getPosts(): Promise<Array<Post>> {
  return prisma.post.findMany()
}

export async function getPost(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { slug } })
}