import PropTypes from "prop-types";
import { api } from "../helpers/http-client";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

import Swal from "sweetalert2";

function Card({ drug }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: "10",
    drinkTime: "2x",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });
  const navigate = useNavigate();
  const handleAddDrug = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/ip/currentdrugs",
        {
          DrugId: drug.id,
          quantity: parseInt(formData.quantity),
          drinkTime: formData.drinkTime,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Drug added successfully",
      });
      setIsModalOpen(false);
      navigate("/mydrugs");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add drug",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
        <img
          src={drug.imgUrl}
          alt="Drug"
          className="w-full h-48 object-contain"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {drug.name}
          </h3>
          <div className="mt-auto space-y-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
              Add to my list
            </button>
            <Link
              to={`/drugs/${drug.id}`}
              className="w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition text-center block">
              See detail
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {drug.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
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
            <form onSubmit={handleAddDrug} className="space-y-4">
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
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

Card.propTypes = {
  drug: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  }),
};

export default Card;
