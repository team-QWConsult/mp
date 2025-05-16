const matter = require("gray-matter");
const fs = require("fs");
const { join } = require("path");
const { format, getUnixTime } = require("date-fns");

// Add markdown files in `content/videos`
const postsDirectory = join(process.cwd(), "content", "blog");

function getBlogPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const timestamp = getUnixTime(new Date(data.date));

  // display date
  const date = format(new Date(data.date), "MMMM dd, yyyy");

  return { slug: realSlug, ...data, date, timestamp, content };
}

function getAllBlogPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  let posts = slugs.filter((slug) => slug !== ".DS_Store");
  posts = posts.map((slug) => getBlogPostBySlug(slug));

  posts = posts.sort((a, b) => b.timestamp - a.timestamp);

  return posts;
}

const videosDirectory = join(process.cwd(), "content", "videos");

function getVideoBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(videosDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, ...data, content };
}

function getAllVideos() {
  const slugs = fs.readdirSync(videosDirectory);
  let videos = slugs.filter((slug) => slug !== ".DS_Store");
  videos = slugs.map((slug) => getVideoBySlug(slug));

  return videos;
}

const videos = getAllVideos();
const blogs = getAllBlogPosts();

//save to data.json
fs.writeFileSync(
  join(process.cwd(), "data.json"),
  JSON.stringify({ blogs: blogs.slice(0, 3), videos: videos.slice(0, 4) })
);
