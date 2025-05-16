import matter from 'gray-matter'
import fs from 'fs'
import { join } from 'path'

// Add markdown files in `content/locations`
const postsDirectory = join(process.cwd(), 'content', 'locations')

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { slug: realSlug, frontmatter: { ...data }, content }
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory)
  let posts = slugs.map((slug) => getPostBySlug(slug))
  posts = posts.sort((a,b) => (a.frontmatter.position - b.frontmatter.position))

  return posts
}