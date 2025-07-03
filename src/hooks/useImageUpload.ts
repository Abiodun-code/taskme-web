import { useRef, useState } from 'react';

type UseImageUploadOptions = {
  maxSizeMB?: number;
  multiple?: boolean;
  accept?: string;
  onChange?: (files: File[]) => void;
};

export const useImageUpload = ({
  maxSizeMB = 20,
  multiple = false,
  accept = 'image/*',
  onChange,
}: UseImageUploadOptions = {}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const openFileDialog = () => inputRef.current?.click();

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];
    const previewUrls: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size / 1024 / 1024 > maxSizeMB) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          previewUrls.push(reader.result as string);
          if (multiple) {
            setPreviews((prev) => [...prev, reader.result as string]);
          } else {
            setPreviews([reader.result as string]);
          }
        }
      };
      reader.readAsDataURL(file);
      validFiles.push(file);
    });

    setFiles(multiple ? (prev) => [...prev, ...validFiles] : validFiles);
    onChange?.(validFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return {
    inputRef,
    previews,
    files,
    handleDrop,
    handleFiles,
    openFileDialog,
    inputProps: {
      ref: inputRef,
      type: 'file',
      accept,
      multiple,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleFiles(e.target.files),
      hidden: true,
    },
  };
};
