"use client";

import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";
import {
  useCreateCategoryMutation,
  useGetSingleCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categories";
import { toast } from "react-toastify";
import { useEffect } from "react";

type FormData = {
  categoryName: string;
  photos?: {
    file: File;
  }; // Add photos property to match usage
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
  const { handleSubmit, reset } = methods;
  // get single category data when editing
  const { data: categoryData } = useGetSingleCategoriesQuery(categorieId, {
    skip: !categorieId,
  });

  //set default values when editing
  useEffect(() => {
    if (categorieId && categoryData?.data) {
      methods.reset({
        categoryName: categoryData?.data?.name,
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
    formData.append("bodyData", JSON.stringify({ name: data?.categoryName }));
    data?.photos?.file && formData.append("image", data?.photos?.file);

    try {
      if (categorieId) {
        const res = await updateCategoryFN({
          id: categorieId,
          formData,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Category updated successfully");
          setIsModalOpen(false);
          reset();
        }
      } else {
        const res = await createCategoryFN(formData).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Category created successfully");
          setIsModalOpen(false);
          reset();
        }
      }
    } catch (error) {
      toast.error((error as string) || "Failed to upload document");
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
