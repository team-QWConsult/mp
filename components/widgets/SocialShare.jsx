import React from "react";
import { Mail } from "react-feather";
import { SITE_URL } from "../../utils/constants";
import FacebookIcon from "./FacebookIcon";
import LinkedinIcon from "./LinkedinIcon";
import TwitterIcon from "./TwitterIcon";

const SocialShare = ({ title, description, slug, img }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || SITE_URL}/${slug}`;

  const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}&quote=${title}`;

  const twitterShareLink = `https://twitter.com/share?url=${encodeURIComponent(
    shareUrl
  )}&text=${title}`;

  const linkedinShareLink = `https://linkedin.com/shareArticle?url=${encodeURIComponent(
    shareUrl
  )}&title=${title}`;

  const openLink = (link) => {
    if (typeof window !== "undefined") {
      window.open(
        link,
        "_blank",
        "location=yes,height=400,width=400,scrollbars=yes,status=yes"
      );
    }
  };

  return (
    <div className="flex flex-wrap">
      <a onClick={() => openLink(fbShareLink)}>
        <FacebookIcon className="bg-gray-100 p-3 hover:bg-charcoal hover:text-gold rounded bg-tertiary/10 text-tertiary h-8 box-content mr-3 mb-3" />
      </a>
      <a onClick={() => openLink(twitterShareLink)}>
        <TwitterIcon className="bg-gray-100 p-3 hover:bg-charcoal hover:fill-gold rounded bg-tertiary/10 fill-tertiary h-8 box-content mr-3 mb-3" />
      </a>
      <a onClick={() => openLink(linkedinShareLink)}>
        <LinkedinIcon className="bg-gray-100 p-3 hover:bg-charcoal hover:fill-gold rounded bg-tertiary/10 fill-tertiary h-8 box-content mr-3 mb-3" />
      </a>
      <a href={`mailto:?subject=${title}&amp;body=${shareUrl}`}>
        <Mail className="bg-gray-100 p-3 hover:bg-charcoal hover:text-gold rounded bg-tertiary/10 text-tertiary h-8 box-content mr-3 mb-3" />
      </a>
    </div>
  );
};

export default SocialShare;
