"use client";

import {
  useGetAllDashboardInfoQuery,
  useGetTotalEarningQuery,
} from "@/redux/api/dashboard";
import { useState } from "react";
import Chart from "./Charts";
import { StatCard } from "./StatCards";

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;
  const endYear = currentYear + 1;

  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), value: year });
  }
  return years;
};

function Dashboard() {
  const years = getYearOptions();

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState({
    value: currentYear,
    label: currentYear.toString(),
  });

  const { data: performanceData } = useGetTotalEarningQuery({
    year: selectedYear.value,
  });

  const { data } = useGetAllDashboardInfoQuery("");
  const dashboardInfo = data?.data;

  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-2xl">
        <StatCard
          title="Today's Orders"
          value={dashboardInfo?.todaysOrders || "0"}
          bg="bg-[#5891c9]"
        />
        <StatCard
          title="Total Earning"
          value={dashboardInfo?.totalEarning || "0"}
          bg="bg-[#7dbfc1]"
        />
        <StatCard
          title="Total Order"
          value={dashboardInfo?.totalOrders || "0"}
          bg="bg-[#6d9288]"
        />
        <StatCard
          title="Total Products"
          value={dashboardInfo?.totalProducts || "0"}
          bg="bg-[#c1b185]"
        />
      </div>

      <div className="">
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold text-textColor">Earning</h2>

            {/* Year Selector */}
            <select
              value={selectedYear.value}
              className="border-2 border-[#484848] rounded-lg px-5 py-1"
              onChange={(e) => {
                const yr = Number(e.target.value);
                setSelectedYear({ value: yr, label: yr.toString() });
              }}
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          {/* Chart */}
          <div className="">
            <Chart chartData={performanceData?.data?.chartData || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
