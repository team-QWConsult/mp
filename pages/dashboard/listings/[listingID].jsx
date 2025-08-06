import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/widgets/Breadcrumbs";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import EditListing from "../../../components/listings/EditListing";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { API_ENDPOINT } from "../../../utils/constants";

export default function ListingsPage() {
  const router = useRouter();

  return (
    <main className="bg-gray-200">
      <Nav />
      <Breadcrumbs
        title="Listings"
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Dashboard", link: "/dashboard" },
          { title: "Listings", link: "/dashboard/listings" },
        ]}
      />
      <div className="min-h-screen py-4 container">
        {router.query.listingID == "new" ? (
          <EditListing />
        ) : (
          <EditListingWrapper listingID={router.query.listingID} />
        )}
      </div>
      <Footer />
    </main>
  );
}

const EditListingWrapper = ({ listingID }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      let res = await fetch(`${API_ENDPOINT}/properties/${listingID}`);
      let fetchedListing = await res.json();

      setData(fetchedListing);
      setLoading(false);
    }

    if (listingID) {
      fetchListing();
    }

    return () => {};
  }, [listingID]);

  return <>{loading ? <LoadingSpinner /> : <EditListing listing={data} />}</>;
};
