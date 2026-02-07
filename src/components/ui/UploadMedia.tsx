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
  default?: string;
}
export default function UploadMedia({
  name,
  label,
  default: defaultUrl,
}: Props) {
  const { setValue } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const [, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load default image for EDIT mode
  useEffect(() => {
    if (defaultUrl) {
      setPreview(defaultUrl);
      setFile(null);

      setValue(name, { url: defaultUrl, file: null }, { shouldValidate: true });
    }
  }, [defaultUrl, name, setValue]);

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
    if (dropped[0]) handleFile(dropped[0]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      alert("Only images allowed");
      return;
    }

    const url = URL.createObjectURL(f);

    // Store new image (single)
    setPreview(url);
    setFile(f);

    // Set RHF field
    setValue(name, { url: null, file: f }, { shouldValidate: true });
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);

    setValue(name, { url: null, file: null }, { shouldValidate: true });
  };

  return (
    <>
      {label && <label className="block mb-2 font-medium">{label}</label>}

      {!preview ? (
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
                Drag & Drop your image
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
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </Card>
      ) : (
        <div className="pt-6 max-w-xs">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group w-32 h-32">
            <Image src={preview} alt="preview" fill className="object-cover" />

            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
