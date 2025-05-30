import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/widgets/Breadcrumbs";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { Edit, Edit3, Trash } from "react-feather";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

export default function ListingsPage() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      let res = await fetch("/api/get-listings");
      let fetchedListings = await res.json();

      if (fetchedListings.success) {
        setListings(fetchedListings.data);
      }
      setLoading(false);
    }

    fetchListings();

    return () => {};
  }, []);

  return (
    <main className="bg-gray-200">
      <Nav />
      <Breadcrumbs
        title="Listings"
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Dashboard", link: "/dashboard" },
        ]}
      />
      <div className="min-h-screen container w-full p-4">
        <div className="mb-4 w-full flex justify-between items-center">
          <h1 className="uppercase">My Listings</h1>

          <Link
            href="/dashboard/listings/new"
            className="px-5 py-2.5 rounded bg-primary text-white"
          >
            Add New
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {listings.map((i) => (
              <Link
                href={`/dashboard/listings/${i.id}`}
                className="p-4 rounded w-full bg-white mb-2 flex gap-4"
                key={i.marketing_title}
              >
                <img
                  src={
                    i.images && i.images.length > 0
                      ? i.images[0].url
                      : "/img/land.jpg"
                  }
                  alt=""
                  className="h-[120px] w-[120px] object-cover rounded"
                />
                <div>
                  <h3 className="mb-2 font-bold">{i.marketing_title}</h3>
                  <span className="block mb-2">
                    {i.price_unit}{" "}
                    {i.offer === "sale"
                      ? (i.sale_price || 0).toLocaleString()
                      : (i.rent_price || 0).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center p-2 px-6 rounded-full border gap-3">
                      <Edit3 />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button className="hidden sm:flex items-center p-2 px-6 rounded-full border gap-3">
                      <Trash />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            {!loading && listings.length === 0 && (
              <h3 className="text-3xl font-bold block my-[100px] text-center">
                You have not added any listings.
              </h3>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
