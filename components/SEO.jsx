import React from "react";
import Head from "next/head";
import includes from "lodash/includes";

import { attributes as baseSEO } from "../content/seo.md";

const SEO = ({ img = "/og-image.jpg", title, description, slug }) => {
  return (
    <Head>
      <title>{title ? `${title} - ${baseSEO.title}` : baseSEO.title}</title>
      <meta name="description" content={description || baseSEO.description} />
      <meta property="og:url" content={baseSEO.siteUrl + slug} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || baseSEO.title} />
      <meta
        property="og:description"
        content={description || baseSEO.description}
      />
      <meta
        property="og:image"
        content={includes(img, "http") ? img : baseSEO.siteUrl + img}
      />
      <meta property="og:image:width" content={1920} />
      <meta property="twitter:card" content="summary" />
    </Head>
  );
};

export default SEO;
