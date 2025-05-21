//pages/sitemap.xml.js
import { attributes as data } from "../content/seo.md";
import { attributes as settings } from "../content/settings.md";
import { listingsAPI } from "../utils/listingsAPI";
import { propertiesLinks, quickLinks, servicesLinks } from "../utils/menu";
import { kebabCase, snakeCase } from "lodash";

const SITE_URL = data.siteUrl;

function generateSiteMap(listings) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${quickLinks.map(
       (i) => `
        <url>
            <loc>${SITE_URL + i.link}</loc>
        </url>
     `
     )}

     ${data.topSearches.map(
       (i) => `
        <url>
            <loc>${SITE_URL + i.link}</loc>
        </url>
     `
     )}

     ${settings.topLocations.map(
       (i) => `
        <url>
            <loc>${SITE_URL + "/properties-for-sale-in-" + snakeCase(i)}</loc>
        </url>
     `
     )}

     ${settings.topLocations.map(
       (i) => `
        <url>
            <loc>${SITE_URL + "/house-for-sale-in-" + snakeCase(i)}</loc>
        </url>
     `
     )}

     ${settings.topLocations.map(
       (i) => `
        <url>
            <loc>${SITE_URL + "/land_plot-for-sale-in-" + snakeCase(i)}</loc>
        </url>
     `
     )}

     ${settings.topLocations.map(
       (i) => `
        <url>
            <loc>${SITE_URL + "/apartment-for-sale-in-" + snakeCase(i)}</loc>
        </url>
     `
     )}
     
     ${listings
       .map((i) => {
         return `
       <url>
           <loc>${SITE_URL}/properties/${i.property_type}-for-${i.offer}-at-${
           kebabCase(i.town_suburb) || kebabCase(i.city_region)
         }-${i.id}</loc>
       </url>
     `;
       })
       .join("")}
       
     ${servicesLinks
       .map((i) => {
         return `
       <url>
           <loc>${SITE_URL + i.link}</loc>
       </url>
     `;
       })
       .join("")}

     ${propertiesLinks
       .map((i) => {
         return `
       <url>
           <loc>${SITE_URL + "/" + i.slug}</loc>
       </url>
     `;
       })
       .join("")}

     ${propertiesLinks
       .map((i) => {
         return `
       <url>
           <loc>${SITE_URL + "/" + i.slug + "-for-sale"}</loc>
       </url>
     `;
       })
       .join("")}

     ${propertiesLinks
       .map((i) => {
         return `
       <url>
           <loc>${SITE_URL + "/" + i.slug + "-for-rent"}</loc>
       </url>
     `;
       })
       .join("")}
     
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site

  const listingRes = await listingsAPI({});
  const listings = listingRes.listings;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(listings);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
