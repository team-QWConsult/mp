import React from "react";
import Nav from "../../components/Nav";
import Link from "next/link";
import { Layers, LogOut, Plus, Settings } from "react-feather";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }

    router.push("/"); // Redirect to home page or login page
  };

  return (
    <main className="bg-gray-200">
      <Nav />
      <Breadcrumbs
        title="Dashboard"
        breadcrumbs={[{ title: "Home", link: "/" }]}
      />
      <div className="container my-4 grid md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/listings"
          className="h-[200px] rounded bg-white p-4 flex items-center justify-center hover:ring"
        >
          <div className="text-center">
            <Layers className="h-12 w-auto inline-block mb-3" />
            <span className="block w-full">Listings</span>
          </div>
        </Link>
        <Link
          href="/dashboard/listings/new"
          className="h-[200px] rounded bg-white p-4 flex items-center justify-center hover:ring"
        >
          <div className="text-center">
            <Plus className="h-12 w-auto inline-block mb-3" />
            <span className="block w-full">Add Listings</span>
          </div>
        </Link>
        <Link
          href="/admin/index.html"
          target="__blank"
          className="h-[200px] rounded bg-white p-4 flex items-center justify-center hover:ring"
        >
          <div className="text-center">
            <Settings className="h-12 w-auto inline-block mb-3" />
            <span className="block w-full">Website Settings</span>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="h-[200px] rounded bg-white p-4 flex items-center justify-center hover:ring"
        >
          <div className="text-center">
            <LogOut className="h-12 w-auto inline-block mb-3" />
            <span className="block w-full">Logout</span>
          </div>
        </button>
      </div>
      <Footer />
    </main>
  );
}
