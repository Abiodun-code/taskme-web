import React, { useState } from "react";
import StepModal from "../shared/StepModal";
import useCurrentUser from "../hooks/useCurrentUser";
import Spinner from "./ui/Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store/Store";
import { uploadUserProfileImage } from "../services/store/authenticated/update-image/updateImageSlice";

const UserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, isLoading } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setPreviewImage(base64Image);

        // Upload to Firestore (store the image as base64 under photoURL field)
        await dispatch(uploadUserProfileImage({ profileImage: base64Image }));
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-0 z-30 bottom-0 right-0 bg-black bg-opacity-25 flex justify-center items-center left-0">
        <Spinner className="border-r-orange-400 border-l-blue-600 w-14 h-14" />
      </div>
    );
  }

  const StepOne = (
    <div>
      <h1 className="text-xl font-semibold font-inter mb-4 pt-4">User</h1>
      <div className="flex justify-center items-center flex-col gap-y-2">
        <div className={`border ${user?.profileImage ? 'border-white' : "border-neutral-700"} w-20 h-20 flex justify-center items-center rounded-full`}>
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <p className="font-medium text-2xl font-inter capitalize text-center">
              {user?.firstName?.charAt(0) || ""}
            </p>
          )}
        </div>

        {/* Upload Button */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />

        <h1 className="font-inter text-2xl font-semibold">
          {user?.lastName || ""} {user?.firstName}
        </h1>
        <p className="font-league font-light text-lg">{user?.email || ""}</p>
      </div>
    </div>
  );

  return (
    <StepModal
      isOpen={isOpen}
      onClose={onClose}
      steps={[StepOne]}
      onFinish={onClose}
    />
  );
};

export default UserModal;
