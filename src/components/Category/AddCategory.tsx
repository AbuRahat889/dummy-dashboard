"use client";

import { Button } from "@/components/ui/button";
import { handleApiResponse } from "@/lib/handleApiResponse";
import {
  useCreateCategoryMutation,
  useGetSingleCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categories";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";

type FormData = {
  categoryName: string;
  photos?: {
    file: File | null;
    url?: string;
  }[];
};

interface AddCategoryProps {
  setIsModalOpen: (isOpen: boolean) => void;
  categorieId?: string;
}

export default function AddCategory({
  setIsModalOpen,
  categorieId,
}: AddCategoryProps) {
  const methods = useForm<FormData>({});
  const { handleSubmit } = methods;
  // get single category data when editing
  const { data: categoryData } = useGetSingleCategoriesQuery(categorieId, {
    skip: !categorieId,
  });

  //set default values when editing
  useEffect(() => {
    if (categorieId && categoryData?.data) {
      methods.reset({
        categoryName: categoryData?.data?.categoryName,
      });
    }
  }, [categorieId, categoryData, methods]);

  // update category mutation
  const [updateCategoryFN, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  // Create category mutation
  const [createCategoryFN, { isLoading }] = useCreateCategoryMutation();
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append(
      "bodyData",
      JSON.stringify({ categoryName: data?.categoryName }),
    );

    data?.photos?.forEach((img: any) => {
      if (img.file) {
        formData.append(`images`, img.file);
      }
    });

    const res = await handleApiResponse(
      categorieId && categoryData?.data ? updateCategoryFN : createCategoryFN,
      categorieId && categoryData?.data
        ? { id: categorieId, formData }
        : formData,
      categorieId && categoryData?.data
        ? "Category Updated Successfully"
        : "Category Created Successfully",
    );
    if (res?.success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Spa Name and Price */}

          <FormInput<FormData>
            name="categoryName"
            label="Category Name"
            placeholder="Type your documents name"
            className="bg-[#e8e8e9]"
          />
          {/* Upload Image */}
          <UploadMedia name="photos" />
          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-primaryColor text-white py-3 rounded-lg font-medium w-48"
          >
            {isLoading || isUpdating
              ? "Uploading..."
              : categorieId
                ? "Update Category"
                : "Create Category"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
