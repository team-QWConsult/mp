import React from "react";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import { getReadingTime } from "../../utils/getReadingTime";
import Footer from "../../components/Footer";
import { getAllBlogPosts, getBlogPostBySlug } from "../../utils/getBlogPosts";
import markdownToHtml from "../../utils/markdownToHtml";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import FooterContacts from "../../components/FooterContacts";
import TrendingSearch from "../../components/TrendingSearch";
import SEO from "../../components/SEO";

export default function BlogPostPage({ data }) {
  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        slug={`/blog/${data.slug}`}
        img={data.featuredImage}
      />
      <Nav />
      <Breadcrumbs
        title={data.title}
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Blogs", link: "/blog" },
        ]}
      />
      <header className="py-12">
        <div className="container max-w-6xl">
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className={`font-bold text-3xl md:text-5xl leading-normal md:leading-normal mb-6 text-black`}
          >
            {data.title}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-display uppercase mb-3 text-black/60">
                Author
              </h4>
              <span>{data.author}</span>
            </div>
            <div>
              <h4 className="font-display uppercase mb-3 text-black/60">
                Publish Date
              </h4>
              <span>{data.date}</span>
            </div>
            <div>
              <h4 className="font-display uppercase mb-3 text-black/60">
                Reading TIme
              </h4>
              <span>{getReadingTime(data.html)} mins</span>
            </div>
          </div>
        </div>
      </header>
      <figure
        data-aos="fade-up"
        data-aos-delay="200"
        className="container max-w-6xl"
      >
        <img
          src={data.featuredImage}
          alt={data.title}
          className="rounded-2xl object-cover w-full h-auto"
        />
      </figure>
      <section className="container max-w-6xl my-6">
        <div className="bg-white rounded">
          <div className="md:p-4 py-10 max-w-3xl mx-auto">
            <article
              className="prose prose-xl md:prose-2xl"
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
          </div>
        </div>
      </section>
      <FooterContacts />
      <TrendingSearch />
      <SocialMediaCTA />
      <Footer />
    </>
  );
}

export const getStaticPaths = () => {
  const posts = getAllBlogPosts();

  return {
    paths: posts.map((i) => ({
      params: {
        slug: i.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = getBlogPostBySlug(params.slug);

  return {
    props: {
      data: {
        ...data,
        html: await markdownToHtml(data.content),
      },
    },
  };
};
