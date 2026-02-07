"use client";

import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/redux/api/categories";
import {
  useCreateProductsMutation,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
} from "@/redux/api/productsApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomDropdown } from "../ui/dropdown";
import { FormInput } from "../ui/Input";
import Loader from "../ui/Loader";
import UploadMedia from "../ui/UploadMedia";

interface addCarForm {
  foodName: string;
  price: number;
  description: string;
  image: {
    urls: string;
    file: File;
  };
}

export default function AddProductForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const methods = useForm<addCarForm>({
    defaultValues: {
      description: "",
    },
  });

  const { register, handleSubmit } = methods;
  const params = useSearchParams();
  const type = params.get("type");
  const id = params.get("id");
  const router = useRouter();

  const { data: productData } = useGetSingleProductsQuery(id, { skip: !id });

  // get all categories for dropdown
  const { data: category } = useGetAllCategoriesQuery("");

  const formattedCategories =
    category?.data?.data?.map((item: any) => ({
      value: item?.id,
      label: item?.name,
    })) || [];
  /// set default values if editing
  useEffect(() => {
    if (productData?.data && type === "Edit") {
      const product = productData?.data;
      methods.reset({
        foodName: product.name,
        price: product.price,
        description: product.description,
      });
      setSelectedCategory(product.category?.id);
    }
  }, [productData, methods, type]);

  const [updateFN, { isLoading: isUpdating }] = useUpdateProductsMutation();
  const [createProuduceFN, { isLoading }] = useCreateProductsMutation();

  const formData = new FormData();

  const onSubmit: SubmitHandler<addCarForm> = async (data) => {
    const serviceInfo = {
      name: data.foodName,
      categoryId: selectedCategory,
      description: data.description,
      price: data.price,
    };
    formData.append("bodyData", JSON.stringify(serviceInfo));
    data?.image?.file && formData.append("productImage", data?.image?.file);

    try {
      if (type === "Edit" && id) {
        const res = await updateFN({ id, data: formData }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Product Updated Successfully");
          router.push("/medicine-list");
        }
      } else {
        const res = await createProuduceFN(formData).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Product Created Successfully");
          router.push("/medicine-list");
        }
      }
    } catch (error) {
      toast.error((error as string) || "Failed to create Car");
    }
  };

  return (
    <>
      <div className="max-w-[95%]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 max-w-2xl mx-auto"
          >
            {/* 1st row */}

            <div className="bg-white p-8  rounded-xl w-full space-y-3 ">
              <FormInput<addCarForm>
                name="foodName"
                label="Personal Hygiene"
                type="text"
                placeholder="Write here"
                className="bg-[#eaeef2]"
              />
              <FormInput<addCarForm>
                name="price"
                label="Price"
                type="number"
                placeholder="Write here"
                className="bg-[#eaeef2]"
              />

              <CustomDropdown
                options={formattedCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Category"
                label="Food Category"
              />

              <div className="">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Write here"
                  className="bg-[#eaeef2] px-3 py-3 border-0 rounded-lg min-h-[130px] resize-none w-full outline-none mb-5"
                  {...register("description")}
                />
                <UploadMedia
                  name="image"
                  label="Upload Image"
                  default={productData?.data?.image}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primaryColor text-white py-5 rounded-lg font-medium w-full"
            >
              {isLoading || isUpdating ? <Loader /> : "Create Medicin Item"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
