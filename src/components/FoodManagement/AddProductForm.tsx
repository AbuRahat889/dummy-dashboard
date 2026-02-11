"use client";

import { Button } from "@/components/ui/button";
import { handleApiResponse } from "@/lib/handleApiResponse";
import { useGetAllCategoriesQuery } from "@/redux/api/categories";
import {
  useCreateProductsMutation,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
} from "@/redux/api/productsApi";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css";
import { CustomDropdown } from "../ui/dropdown";
import { FormInput } from "../ui/Input";
import Loader from "../ui/Loader";
import UploadMedia from "../ui/UploadMedia";

interface addCarForm {
  productName: string;
  price: number;
  discountPrice: number;
  quantity: number;
  description?: string;
  image: Array<{
    file: File | null;
    url?: string;
  }>;
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
      label: item?.categoryName,
    })) || [];

  // set default value for edit form
  useEffect(() => {
    if (productData?.data && type === "Edit") {
      const product = productData?.data;
      methods.reset({
        productName: product.productName,
        price: product.productPrice,
        discountPrice: product.discountPrice,
        quantity: product.productStock,
        description: product.productDescription,
      });
      setSelectedCategory(product.category?.id);
    }
  }, [productData, methods, type]);

  const [updateFN, { isLoading: isUpdating }] = useUpdateProductsMutation();
  const [createProuduceFN, { isLoading }] = useCreateProductsMutation();

  const formData = new FormData();

  const onSubmit: SubmitHandler<addCarForm> = async (data) => {
    const serviceInfo = {
      productName: data.productName,
      productCategory: selectedCategory,
      productDescription: data.description,
      productPrice: data.price,
      productStock: data.quantity,
      ...(data.discountPrice ? { discountPrice: data.discountPrice } : {}),
    };

    formData.append("bodyData", JSON.stringify(serviceInfo));
    // data?.image?.file && formData.append("productImage", data?.image?.file);

    data?.image?.forEach((img) => {
      if (img.file) {
        formData.append(`productImages`, img.file);
      }
    });

    const res = await handleApiResponse(
      type === "Edit" && id ? updateFN : createProuduceFN,
      type === "Edit" && id ? { id, data: formData } : formData,
      type === "Edit"
        ? "Product Updated Successfully"
        : "Product Created Successfully",
    );
    console.log(res);
    if (res?.success) {
      router.push("/product-list");
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
                name="discountPrice"
                label="Discount Price (%)"
                type="number"
                placeholder="Write here"
                className="bg-[#eaeef2]"
                required={false}
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
                  defaultValue={productData?.data?.productDescription || ""}
                  onChange={(content) =>
                    methods.setValue("description", content)
                  }
                />
              </div>
              <div className="">
                <UploadMedia
                  name="image"
                  label="Upload Image"
                  default={productData?.data?.productImages}
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
