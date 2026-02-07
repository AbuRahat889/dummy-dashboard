"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetusersListQuery } from "@/redux/api/users";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "../ui/Input";
import Loader from "../ui/Loader";

// icons
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { useSendNotificationToAllMutation } from "@/redux/api/notificationApi";

interface NotificationForm {
  title: string;
  description: string;
  sendTo: string[];
}

export default function Notifications() {
  const methods = useForm<NotificationForm>({
    defaultValues: {
      title: "",
      description: "",
      sendTo: [],
    },
  });

  const { register, handleSubmit, setValue, watch, reset } = methods;

  const selectedUsers = watch("sendTo");

  const { data } = useGetusersListQuery({
    page: 1,
    limit: 15,
  });

  const userList = data?.data?.data || [];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [sendNotificationToAllFN, { isLoading: createLoading }] =
    useSendNotificationToAllMutation();

  const allOptions = [{ id: "All", fullName: "All" }, ...userList];

  const filteredItems = allOptions.filter((item: any) =>
    item.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isSelected = (item: any) => selectedUsers?.includes(String(item.id));

  const toggleSelect = (item: any) => {
    let updated: string[] = [];

    if (item.id === "All") {
      updated = ["All"];
    } else {
      updated = selectedUsers?.includes("All")
        ? [String(item.id)]
        : isSelected(item)
        ? selectedUsers.filter((id) => id !== String(item.id))
        : [...(selectedUsers || []), String(item.id)];
    }

    setValue("sendTo", updated);
  };

  const selectedLabel = (() => {
    if (!selectedUsers || selectedUsers.length === 0) return "";

    if (selectedUsers.includes("All")) return "All";

    const selectedNames = userList
      .filter((u: any) => selectedUsers.includes(String(u.id)))
      .map((u: any) => u.fullName);

    return selectedNames.join(", ");
  })();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (e.target.closest(".custom-select")) return;
      setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit: SubmitHandler<NotificationForm> = async (formData) => {
    const payload = {
      title: formData.title,
      body: formData.description,
      sendTo: formData.sendTo.includes("All")
        ? "All"
        : formData.sendTo.map((id) => Number(id)),
    };
    try {
      const res = await sendNotificationToAllFN(payload).unwrap();
      toast.success(res?.message || "Notification sent successfully");
      reset();
    } catch {
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="max-w-[95%]">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white p-8 rounded-xl w-full "
        >
          <div className="flex items-start gap-5 w-full">
            {/* LEFT */}
            <div className="w-full space-y-4">
              <FormInput<NotificationForm>
                name="title"
                label="Title"
                type="text"
                placeholder="Write title"
                className="bg-[#eaeef2]"
              />

              {/* CUSTOM SELECT */}
              <div className="relative custom-select ">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Send To
                </label>

                <input
                  type="text"
                  placeholder="Select users..."
                  value={isDropdownOpen ? searchValue : selectedLabel}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => {
                    setIsDropdownOpen(true);
                    setSearchValue("");
                  }}
                  readOnly={!isDropdownOpen}
                  className="w-full bg-[#eaeef2] px-4 py-3 rounded-lg outline-none cursor-pointer"
                />

                <IoIosArrowDown
                  className={`absolute right-4 top-[45px] text-gray-500 transition-all ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />

                {isDropdownOpen && (
                  <div className="absolute z-[9999] mt-2 w-full bg-white border rounded-lg shadow max-h-[220px] overflow-auto">
                    {filteredItems.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => toggleSelect(item)}
                        className="px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100"
                      >
                        <IoCheckmark
                          className={`mr-2 transition-all ${
                            isSelected(item)
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-75"
                          }`}
                        />
                        {item.fullName}
                      </div>
                    ))}

                    {filteredItems.length === 0 && (
                      <p className="text-center text-gray-500 py-6">
                        No search found
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Send Message
              </label>
              <textarea
                {...register("description")}
                placeholder="Write message"
                className="bg-[#eaeef2] px-3 py-3 rounded-lg min-h-[130px] resize-none w-full outline-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-primaryColor text-white py-5 rounded-lg font-medium w-full"
          >
            {createLoading ? <Loader /> : "Send Notification"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
