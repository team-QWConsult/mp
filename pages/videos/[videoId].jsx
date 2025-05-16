import React from "react";
import { getAllVideos, getVideoBySlug } from "../../utils/videos";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import Footer from "../../components/Footer";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import AgentCard from "../../components/AgentCard";
import { attributes } from "../../content/settings.md";
import { truncate } from "lodash";
import SEO from "../../components/SEO";

export default function VideoPage({ video }) {
  let videoId;

  if (!!video.link) {
    videoId = video.link.split("/").slice(-1).pop();
  }

  return (
    <>
      <SEO
        title={video.title}
        description={truncate(video.description, { length: 200 })}
        slug={`/videos/${video.slug}`}
        img={video.img}
      />
      <Nav />
      <Breadcrumbs
        title={video.title}
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Videos", link: "/" },
        ]}
      />
      <section className="w-full bg-primary text-white">
        <div className="container pt-4 grid md:grid-cols-[1fr_300px] gap-6">
          <div className="pb-6">
            <div
              data-oembed={video.link}
              data-oembed-type="video"
              data-oembed-provider="YouTube"
              className="w-full relative pt-[56.25%] overflow-hidden"
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                title={video.title}
                src={`https://www.youtube.com/embed/${videoId}?feature=oembed`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 rounded bg-white text-black mt-4">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {video.title}
              </h1>
              <article className="text-black">{video.description}</article>
            </div>
          </div>
          <div>
            <AgentCard
              title={attributes.siteName}
              phone={`${attributes.phone} | ${attributes.phone2}`}
              focus={false}
              closeFocus={() => {}}
            />
          </div>
        </div>
      </section>
      <SocialMediaCTA />
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const video = getVideoBySlug(params.videoId);

  return {
    props: { video },
  };
}

export async function getStaticPaths() {
  const videos = getAllVideos();

  return {
    paths: videos.map((video) => {
      return {
        params: {
          videoId: video.slug,
        },
      };
    }),
    fallback: false,
  };
}
