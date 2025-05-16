const matter = require("gray-matter");
const fs = require("fs");
const { join } = require("path");
const { format, getUnixTime } = require("date-fns");

// Add markdown files in `content/videos`
const postsDirectory = join(process.cwd(), "content", "listings");

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

function main() {
  let posts = getAllBlogPosts();

  //save to file data.json
  fs.writeFileSync("data.json", JSON.stringify(posts));
}

main();
