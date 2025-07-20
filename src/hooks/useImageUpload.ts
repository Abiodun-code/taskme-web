import { useRef, useState } from 'react';

type UploadMode = 'image' | 'document';

type UseFileUploadOptions = {
  mode?: UploadMode; // 'image' or 'document'
  maxSizeMB?: number;
  multiple?: boolean;
  accept?: string; // Optional override
  onChange?: (files: File[]) => void;
};

export const useFileUpload = ({
  mode = 'image',
  maxSizeMB = 20,
  multiple = false,
  accept,
  onChange,
}: UseFileUploadOptions = {}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // Determine accepted MIME types based on mode
  const defaultAccept = mode === 'image'
    ? 'image/*'
    : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,.json,.xml,.html';

  const openFileDialog = () => inputRef.current?.click();

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];

    if (mode === 'image') setPreviews([]); // Reset previews for image mode

    Array.from(fileList).forEach((file) => {
      if (file.size / 1024 / 1024 > maxSizeMB) return;

      validFiles.push(file);

      // Generate preview only for images
      if (mode === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setPreviews((prev) =>
              multiple ? [...prev, reader.result as string] : [reader.result as string]
            );
          }
        };
        reader.readAsDataURL(file);
      }
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
    previews, // Only used when mode === 'image'
    files,
    handleDrop,
    handleFiles,
    openFileDialog,
    inputProps: {
      ref: inputRef,
      type: 'file',
      accept: accept || defaultAccept,
      multiple,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleFiles(e.target.files),
      hidden: true,
    },
  };
};
