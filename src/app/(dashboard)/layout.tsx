import DashboardNavbar from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-h-[100vh] overflow-hidden bg-[#eaeef2]">
      <ToastContainer />
      <Navbar />
      <div className="flex gap-0 md:gap-6 w-full h-full mt-9">
        <DashboardNavbar />
        <div className="w-full max-h-[95vh] overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
