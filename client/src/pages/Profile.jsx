import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const profile = {
    id: 1,
    UserId: 1,
    name: "Joshua",
    age: 26,
    personalHistory: "Migraine, otot tegang, insomnia",
    familyHistory: "Diabetes, insomnia, tekanan darah tinggi",
    foodAllergy: "Susu, kunyit",
    drugAllergy: "cefadroxil",
    recommendation:
      "Berdasarkan riwayat kesehatan Anda, berikut adalah beberapa rekomendasi untuk mengatasi migrain, otot tegang, dan insomnia:\n\n \u2022 Untuk migrain:\n - Cobalah obat pereda nyeri OTC seperti ibuprofen (Advil, Motrin) atau naproxen (Aleve) dengan dosis yang direkomendasikan.\n - Jika migrain Anda parah, konsultasikan dengan dokter untuk kemungkinan penggunaan obat resep seperti triptan.\n - Hindari pemicu migrain seperti makanan tertentu, stres, atau perubahan pola tidur.\n\n \u2022 Untuk otot tegang:\n - Lakukan peregangan ringan dan latihan relaksasi secara teratur.\n - Aplikasikan kompres hangat pada area yang tegang.\n - Pertimbangkan penggunaan balsem atau krim pereda nyeri otot.\n\n \u2022 Untuk insomnia:\n - Cobalah suplemen melatonin dengan dosis hingga 10 mg sebelum tidur.\n - Pertimbangkan minum teh akar valerian organik sebagai alternatif alami.\n - Praktikkan kebersihan tidur yang baik, seperti menjaga jadwal tidur yang konsisten dan menghindari layar elektronik sebelum tidur.\n\nPenting untuk diingat:\n- Hindari penggunaan berlebihan obat pereda nyeri OTC karena dapat menyebabkan sakit kepala rebound.\n- Jika gejala Anda tidak membaik atau memburuk, segera kunjungi dokter.\n- Mengingat alergi obat Anda terhadap cefadroxil, selalu informasikan hal ini kepada tenaga medis sebelum menerima pengobatan baru.\n\nCatatan: Rekomendasi ini bersifat umum. Untuk perawatan yang lebih spesifik dan personal, disarankan untuk berkonsultasi dengan dokter.",
    createdAt: "2025-01-01T16:32:45.491Z",
    updatedAt: "2025-01-01T16:32:45.491Z",
  };

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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">
              Edit Profile
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Name</h2>
                <p className="text-gray-600">{profile.name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Age</h2>
                <p className="text-gray-600">{profile.age}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Personal History
                </h2>
                <p className="text-gray-600">{profile.personalHistory}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Family History
                </h2>
                <p className="text-gray-600">{profile.familyHistory}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Food Allergy
                </h2>
                <p className="text-gray-600">{profile.foodAllergy}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Drug Allergy
                </h2>
                <p className="text-gray-600">{profile.drugAllergy}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recommendation
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 whitespace-pre-line">
                {profile.recommendation}
              </p>
              <p className="text-sm text-teal-500 mt-4">
                Generated By Perplexity AI
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
