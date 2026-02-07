"use client";

import {
  useState,
  useRef,
  useEffect,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { Card } from "antd";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  default?: string[]; // For multiple default images
}
export default function UploadMedia({
  name,
  label,
  default: defaultUrls,
}: Props) {
  const { setValue } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load default images for EDIT mode
  useEffect(() => {
    if (defaultUrls && defaultUrls.length) {
      setPreviews(defaultUrls);
      setFiles([]);
      setValue(
        name,
        defaultUrls.map((url) => ({ url, file: null })),
        { shouldValidate: true },
      );
    }
  }, [defaultUrls, name, setValue]);

  const handleBrowse = () => fileInputRef.current?.click();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    handleFiles(dropped);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
    e.target.value = "";
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((f) => f.type.startsWith("image/"));
    if (!validFiles.length) return alert("Only images allowed");

    const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
    const updatedPreviews = [...previews, ...newPreviews];
    const updatedFiles = [...files, ...validFiles];

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);

    // Update RHF field
    setValue(
      name,
      updatedFiles.map((file, i) => ({ file, url: updatedPreviews[i] })),
      { shouldValidate: true },
    );
  };

  const removeImage = (index: number) => {
    const removedPreview = previews[index];
    if (removedPreview) URL.revokeObjectURL(removedPreview);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);

    setValue(
      name,
      updatedFiles.map((file, i) => ({ file, url: updatedPreviews[i] })),
      { shouldValidate: true },
    );
  };

  return (
    <>
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <Card className="bg-[#f5f5f5] border-2 border-dashed border-primaryColor max-w-3xl">
        <div className="p-5 text-center space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${isDragOver ? "bg-white border-blue-300" : ""}`}
          >
            <Upload className="h-12 w-12 text-blue-500 mx-auto" />
            <p className="text-sm md:text-lg text-gray-700 mb-3">
              Drag & Drop your images
            </p>

            <button
              type="button"
              onClick={handleBrowse}
              className="bg-orange-500 text-sm rounded-md hover:bg-orange-600 text-white px-6 py-2 font-semibold"
            >
              Browse to Upload
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Preview Images */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 w-32 h-32"
                >
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
