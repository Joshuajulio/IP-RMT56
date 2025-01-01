import { useNavigate } from "react-router";

function CreateProfile() {
  const navigate = useNavigate();

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to <span className="text-teal-600">SehatKu!</span> <br />{" "}
          <span className="text-gray-400 text-lg">Create Your Profile</span>{" "}
        </h2>
        <form className="space-y-6" onSubmit={handleCreateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your age"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal History
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="Enter your personal medical history or current symptoms"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family History
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="Enter your family medical history"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Allergy
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="List any food allergies"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drug Allergy
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="List any drug allergies"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 hover:text-white active:bg-teal-400 transition duration-300 shadow-lg hover:shadow-xl">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
