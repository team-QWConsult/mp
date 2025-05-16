import React from "react";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import Footer from "../../components/Footer";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import VideosList from "../../components/VideosList";
import { getAllVideos } from "../../utils/videos";
import SEO from "../../components/SEO";

export default function VideosPage({ videos }) {
  return (
    <>
      <SEO
        slug="/videos"
        title="Videos"
        description="Discover expert real estate insights, property tours, and home-buying tips with our engaging video content at Zurafa Properties. Watch to learn more about Kenya thriving real estate market and investment opportunities."
      />
      <Nav />
      <Breadcrumbs
        title="Videos"
        breadcrumbs={[{ title: "Home", link: "/" }]}
      />
      <VideosList videos={videos} />
      <SocialMediaCTA />
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const videos = getAllVideos();

  if (!videos) {
    return {
      notFound: true,
    };
  }

  return {
    props: { videos },
  };
}
