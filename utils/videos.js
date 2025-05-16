import matter from "gray-matter";
import fs from "fs";
import { join } from "path";

// Add markdown files in `content/videos`
const postsDirectory = join(process.cwd(), "content", "videos");

export function getVideoBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, ...data, content };
}

export function getAllVideos() {
  const slugs = fs.readdirSync(postsDirectory);
  let videos = slugs.map((slug) => getVideoBySlug(slug));

  return videos;
}
