import { useEffect, useState } from "react";
import { api } from "../helpers/http-client";

import Swal from "sweetalert2";

function DrugTracking() {
  const [currentDrugs, setCurrentDrugs] = useState([]);
  const [pastDrugs, setPastDrugs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [formData, setFormData] = useState({
    DrugId: "",
    quantity: "",
    drinkTime: "",
    startDate: "",
    endDate: "",
  });

  const fetchCurrentDrugs = async () => {
    try {
      const response = await api.get("/ip/currentdrugs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCurrentDrugs(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchPastDrugs = async () => {
    try {
      const response = await api.get("/ip/pastdrugs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setPastDrugs(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleEditClick = (drug) => {
    console.log("Edit clicked for drug:", drug);
    setSelectedDrug(drug);
    setFormData({
      DrugId: drug.Drug.id,
      quantity: drug.quantity,
      drinkTime: drug.drinkTime,
      startDate: drug.startDate.split("T")[0],
      endDate: drug.endDate.split("T")[0],
    });
    setIsEditModalOpen(true);
  };

  const handleEditDrug = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/ip/currentdrugs/${selectedDrug.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Drug updated successfully",
      });
      setIsEditModalOpen(false);
      fetchCurrentDrugs();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update drug",
      });
    }
  };

  const handleDeleteDrug = async (drugId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/ip/currentdrugs/${drugId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          fetchCurrentDrugs();
          Swal.fire("Deleted!", "Drug has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete drug",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchCurrentDrugs();
    fetchPastDrugs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Drug Tracking</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Currently Consumed</h2>
        <div className="space-y-4">
          {currentDrugs.length === 0 ? (
            <div className="text-gray-500 text-left py-4">
              You are not taking any drugs
            </div>
          ) : (
            currentDrugs.map((drug) => (
              <div
                key={drug.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={drug.Drug.imgUrl}
                    alt={drug.Drug.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <h3 className="font-semibold text-lg text-center md:text-left">
                      {drug.Drug.name}
                    </h3>
                    <p className="text-gray-600">Quantity: {drug.quantity}</p>
                    <p className="text-gray-600">
                      Drink Time: {drug.drinkTime}
                    </p>
                    <p className="text-gray-600">
                      Period: {new Date(drug.startDate).toLocaleDateString()} -{" "}
                      {new Date(drug.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <button
                    onClick={() => handleEditClick(drug)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDrug(drug.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <div className="space-y-4">
          {pastDrugs.length === 0 ? (
            <div className="text-gray-500 text-left py-4">
              You haven{`'`}t consumed any drugs
            </div>
          ) : (
            pastDrugs.map((drug) => (
              <div
                key={drug.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={drug.Drug.imgUrl}
                    alt={drug.Drug.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <h3 className="font-semibold text-lg text-center md:text-left">
                      {drug.Drug.name}
                    </h3>
                    <p className="text-gray-600">Quantity: {drug.quantity}</p>
                    <p className="text-gray-600">
                      Drink Time: {drug.drinkTime}
                    </p>
                    <p className="text-gray-600">
                      Period: {new Date(drug.startDate).toLocaleDateString()} -{" "}
                      {new Date(drug.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit: {selectedDrug.Drug.name}
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditDrug} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drink Time
                </label>
                <select
                  name="drinkTime"
                  value={formData.drinkTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required>
                  <option value="1x">1x</option>
                  <option value="2x">2x</option>
                  <option value="3x">3x</option>
                </select>
              </div>{" "}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DrugTracking;
