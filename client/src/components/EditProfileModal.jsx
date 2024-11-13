import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserDetails } from "../actions/user";

const EditProfileModal = ({
  formData,
  setEditModalOpen,
  userId,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(formData);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    await dispatch(editUserDetails(formState, userId));
    localStorage.setItem("user", JSON.stringify({ ...formData, ...formState }));
    setLoading(false);
    setEditModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 dark:bg-gray-200 dark:text-gray-600 p-6 max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <button
            onClick={() => setEditModalOpen(false)}
            className="p-2 border border-black"
          >
            X
          </button>
        </div>

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formState.username}
          onChange={handleFormChange}
          placeholder="Username"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="headline"
        >
          Headline
        </label>
        <input
          id="headline"
          type="text"
          name="headline"
          value={formState.headline}
          onChange={handleFormChange}
          placeholder="Headline"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="bio"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleFormChange}
          placeholder="Bio"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <label
          className="text-sm font-semibold text-gray-700 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleFormChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300"
        />

        <button
          onClick={handleUpdateDetails}
          className="bg-blue-500 text-white px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        <button
          onClick={() => setEditModalOpen(false)}
          className="mt-3 text-gray-600 underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
