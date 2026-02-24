"use client";
import logo from "@/assets/logo.png";
import { MediaButton } from "@/components/ui/icon";
import Modal from "@/components/ui/modal";
import { navigation } from "@/constants/Navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogOutModa from "../LogOutModa";

const NavbarSlider = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const userRole = "SUPER_ADMIN";
  const userRole = "SUPERADMIN";
  // const userRole = Coockies.get("role");

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger Menu (mobile only) */}
      <div className="md:hidden absolute top-5 left-5 p-4 flex items-center justify-between bg-white shadow-xl z-[9] rounded-xl">
        <button onClick={toggleSidebar}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar (desktop) */}
      <div className="hidden md:flex gap-0 w-[276px] bg-white rounded-r-xl shadow-[0_-4px_16px_0_rgba(0,0,0,0.08),_4px_0_12.1px_0_rgba(0,0,0,0.08)]">
        <SidebarContent
          isOpen={true}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          path={path}
          userRole={userRole}
        />
      </div>

      {/* Drawer (mobile) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={toggleSidebar}
          ></div>

          <div className="relative z-50 w-[290px] bg-white h-full shadow-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <Image src={logo} alt="Logo" width={120} height={40} />
              <button onClick={toggleSidebar}>
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <SidebarContent
              isOpen={true}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              path={path}
              userRole={userRole}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarContent = ({
  isOpen,
  setIsModalOpen,
  path,
  isModalOpen,
  userRole,
}: {
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  path: string;
  isModalOpen: boolean;
  userRole: string | undefined;
}) => (
  <aside className="flex flex-col font-inter px-6 py-5 w-full h-[85vh] rounded-xl overflow-y-auto">
    <ul className="w-full">
      {navigation
        ?.filter((item) => item.role.includes(userRole ?? ""))
        .map((item) => (
          <li key={item.route}>
            <Link
              href={item.route}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-full transition-colors ${
                path === item.route
                  ? "bg-primaryColor text-white"
                  : "text-[#555555] hover:bg-primaryColor hover:text-white border-r-4 border-transparent"
              }`}
            >
              <span className="text-xl">
                {path === item.route ? item.whiteIcon : item.iconPath}
              </span>
              {isOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          </li>
        ))}
    </ul>

    <div className="py-4  w-full">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-red-600 bg-red-100 px-4 py-3 rounded-lg text-sm font-medium w-full"
      >
        <MediaButton type="logout" />
        {isOpen && <span>Log out</span>}
      </button>
    </div>

    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <LogOutModa />
    </Modal>
  </aside>
);

export default NavbarSlider;
