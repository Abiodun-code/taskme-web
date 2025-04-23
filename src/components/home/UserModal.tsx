import React, { useState } from "react";
import CustomModal from "../../shared/Modal";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../services/store/Store";
import { uploadUserProfileImage } from "../../services/store/authenticated/update-image/updateImageSlice";
import useCurrentUser from "../../hooks/useCurrentUser";
import CustomButton from "../../shared/Button";
import Spinner from "../ui/Spinner";
import { fetchCurrentUser } from "../../services/store/authenticated/update-user/UpdateSlice";

const UserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file); // Save the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) {
      toast.info("No changes to save.");  // Just inform the user
      onClose(); // Close the modal gently
      return;
    }

    setIsSaving(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        const resultAction = await dispatch(uploadUserProfileImage({ profileImage: base64Image }));

        if (uploadUserProfileImage.fulfilled.match(resultAction)) {
          toast.success("Profile photo updated successfully! 🎉");
          await dispatch(fetchCurrentUser()); // <---- Fetch updated user profile 🔥
          setSelectedImage(null);
          setPreviewImage(null);
          onClose(); // Close after saving
        } else {
          toast.error(resultAction.payload || "Failed to update profile photo 😢");
        }
      } catch (error) {
        toast.error((error as Error).message || "Something went wrong! 🚨");
      } finally {
        setIsSaving(false);
      }
    };

    reader.readAsDataURL(selectedImage);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1 className="text-xl font-semibold font-inter mb-4 pt-4">User</h1>

        <div className="flex justify-center items-center flex-col gap-y-4">
          {/* Profile Image */}
          <div className="relative flex flex-col items-center">
            <div className={`border ${user?.profileImage ? 'border-white' : "border-neutral-700"} w-24 h-24 flex justify-center items-center rounded-full overflow-hidden`}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <p className="font-medium text-3xl font-inter capitalize text-center">
                  {user?.firstName?.charAt(0) || ""}
                </p>
              )}
            </div>

            {/* Upload Input */}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Upload Label/Button */}
            <label htmlFor="imageUpload" className="mt-2 cursor-pointer flex items-center gap-2 text-sm text-indigo-500 hover:underline">
              <MdOutlineFileUpload className="w-4 h-4" />
              Change Profile Photo
            </label>
          </div>

          {/* User Name & Email */}
          <h1 className="font-inter text-2xl font-semibold">
            {user?.firstName || ""} {user?.lastName}
          </h1>
          <p className="font-league font-light text-lg">{user?.email || ""}</p>
        </div>

        {/* Save Button */}
        <CustomButton className="my-4 w-full" onClick={handleSave}>
          {isSaving ? (
            <Spinner className="border-r-orange-400 border-l-blue-600 w-4 h-4" />
          ) : (
            <span className="text-sm font-semibold">Save</span>
          )}
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default UserModal;
