import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const drugs = [
    {
      id: 1,
      name: "Neurobion Forte 10 Tablet",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/126387_25-4-2024_14-55-30.png",
    },
    {
      id: 2,
      name: "Sumagesic 600 mg 4 Tablet",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/139389_10-6-2022_16-12-29-1665778861.jpeg",
    },
    {
      id: 3,
      name: "Cefixime 200 mg 10 Kapsul",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/516366_21-6-2023_10-49-38.png",
    },
    {
      id: 4,
      name: "Prednicort 4 mg 10 Tablet",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/60649_29-9-2023_10-51-3.png",
    },
    {
      id: 5,
      name: "Aza 20 Cream 10 g",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/266138_17-2-2022_18-25-14-1665775672.png",
    },
    {
      id: 6,
      name: "Cetirgi 10 mg 10 Tablet",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/688450_12-10-2021_13-11-51-1665825787.png",
    },
    {
      id: 7,
      name: "Imboost Force 10 Kaplet",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/436192_19-4-2024_17-39-33.png",
    },
    {
      id: 8,
      name: "Rhinos SR 10 Kapsul",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/324462_16-8-2022_10-39-10-1665787748.png",
    },
    {
      id: 9,
      name: "Astria 4 mg 4 Kapsul",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/753571_20-3-2024_13-31-30.png",
    },
    {
      id: 10,
      name: "Lansoprazole 30 mg 10 Kapsul",
      imgUrl:
        "https://d2qjkwm11akmwu.cloudfront.net/products/364403_10-12-2024_14-14-1.png",
    },
  ];
  return (
    <div>
      <nav className="bg-teal-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/icon.png" alt="logo" className="h-8 w-8" />
              <span className="text-white font-bold text-xl">SehatKu</span>
            </Link>
            <Link to="/" className="text-white hover:text-teal-200 transition">
              Find Drugs
            </Link>
          </div>

          <div className="relative">
            <button
              className="flex items-center text-white hover:text-teal-200 transition"
              onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Profile
                </Link>
                <Link
                  to="/drugtracking"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Drug Tracking
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for drugs..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {drugs.map((drug) => (
            <div
              key={drug.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
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
                  <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
                    Add to my list
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition">
                    See detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {"<"}
            </button>{" "}
            <input
              type="number"
              className="w-10 px-1 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              min="1"
              max="20"
            />
            <span className="text-gray-700">/20</span>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              {">"}
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default Home;
