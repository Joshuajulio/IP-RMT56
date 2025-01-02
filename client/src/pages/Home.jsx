import { useEffect, useState } from "react";

import Card from "../components/Card";
import { api } from "../helpers/http-client";

import Swal from "sweetalert2";

function Home() {
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [page, setPage] = useState(localStorage.getItem("page") || 1);
  const [count, setCount] = useState(0);

  const fetchDrugs = async () => {
    try {
      const response = await api.get("/ip/drugs", {
        params: {
          q: searchQuery,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setDrugs(response.data.data);
      setCount(response.data.totalPage);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch drugs",
        text: `${error.response.data.message}`,
      });
    }
  };
  useEffect(() => {
    fetchDrugs();
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("page", page);
  }, [searchQuery, page]);

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Search for drugs..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
          <button
            onClick={() => {
              setSearchQuery("");
              setPage(1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {drugs.map((drug) => (
            <div key={drug.id}>
              <Card drug={drug} key={drug.id} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(+page - 1)}
              className={`px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {"<"}
            </button>{" "}
            <input
              type="number"
              className="w-10 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
              value={page}
              onChange={(e) => setPage(parseInt(e.target.value))}
              min="1"
              max="20"
            />
            <span className="text-gray-700">/{count}</span>
            <button
              disabled={page === count}
              onClick={() => setPage(+page + 1)}
              className={`px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                page === count ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {">"}
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default Home;
