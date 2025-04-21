import React, { useState } from 'react';

type ImagePickerProps = {
  onImageChange: (base64Image: string) => void;
}
const ImagePicker = ({ onImageChange }: ImagePickerProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        onImageChange(base64Image); // Send the base64 string to parent component
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <input type="file" onChange={handleImageChange} />
  );
};

export default ImagePicker;
