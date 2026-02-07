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
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

interface addCarForm {
  productName: string;
  price: number;
  quantity: number;
  description: string;
  image: {
    file: File | null;
    url?: string;
  };
}

export default function AddProductForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const methods = useForm<addCarForm>({
    defaultValues: {
      description: "",
    },
  });

  const { handleSubmit } = methods;
  const params = useSearchParams();
  const type = params.get("type");
  const id = params.get("id");
  const router = useRouter();

  // Dynamic import (important for Next.js)
  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

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
        productName: product.name,
        price: product.price,
        quantity: product.quantity,
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
      name: data.productName,
      quantity: data.quantity,
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
                name="productName"
                label="Product Name"
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
              <FormInput<addCarForm>
                name="quantity"
                label="Quantity"
                type="number"
                placeholder="Write here"
                className="bg-[#eaeef2]"
              />

              <CustomDropdown
                options={formattedCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Category"
                label="Product Category"
              />

              <div>
                <SunEditor
                  height="200px"
                  setOptions={{
                    buttonList: [
                      ["undo", "redo"],
                      ["bold", "underline", "italic"],
                      ["list", "align"],
                      ["link", "image"],
                      ["removeFormat"],
                    ],
                  }}
                  onChange={(content) => console.log(content)}
                />
              </div>
              <div className="">
                {/* <label
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
                /> */}
                <UploadMedia
                  name="image"
                  label="Upload Image"
                  // default={productData?.data?.image}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primaryColor text-white py-5 rounded-lg font-medium w-full"
            >
              {isLoading || isUpdating ? <Loader /> : "Create Product Item"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
