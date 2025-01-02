import { useEffect, useState } from "react";
import { api } from "../helpers/http-client";
import { Link, useParams } from "react-router";

import Swal from "sweetalert2";

function DrugDetail() {
  const { id } = useParams();
  const [drug, setDrug] = useState({
    name: "",
    description: "",
    imgUrl: "",
    composition: "",
    dosage: "",
  });
  const fetchDrugById = async () => {
    try {
      const response = await api.get(`/ip/drugs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data);
      setDrug(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch drug",
      });
    }
  };

  useEffect(() => {
    fetchDrugById();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{drug.name}</h1>
          <Link
            to={`/`}
            className="hidden md:block bg-gray-100 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-200 transition text-center">
            {"<< Home"}
          </Link>{" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={drug.imgUrl}
              alt={drug.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{drug.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Composition</h2>
              <p className="text-gray-700">{drug.composition}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Dosage</h2>
              <p className="text-gray-700">{drug.dosage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrugDetail;
