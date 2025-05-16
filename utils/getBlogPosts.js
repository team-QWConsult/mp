import matter from "gray-matter";
import fs from "fs";
import { join } from "path";
import { format, getUnixTime } from "date-fns";

// Add markdown files in `content/videos`
const postsDirectory = join(process.cwd(), "content", "blog");

export function getBlogPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const timestamp = getUnixTime(new Date(data.date));

  // display date
  const date = format(new Date(data.date), "MMMM dd, yyyy");

  return { slug: realSlug, ...data, date, timestamp, content };
}

export function getAllBlogPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  let posts = slugs.filter((slug) => slug !== ".DS_Store");
  posts = posts.map((slug) => getBlogPostBySlug(slug));

  posts = posts.sort((a, b) => b.timestamp - a.timestamp);

  return posts;
}
