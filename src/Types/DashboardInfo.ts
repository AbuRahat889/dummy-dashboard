export interface DashboardData {
  totalUsers: number;
  totalBookings: number;
  totalServices: number;
}

export interface DashboardInfoResponse {
  data: DashboardData;
}

export interface PerformanceData {
  month: string;
  value: number;
}

export interface DashboardPerformanceResponse {
  data: PerformanceData[];
}

export interface ChartProps {
  dashboardPerformance?: DashboardPerformanceResponse;
  selectedYear: number;
  onYearChange: (year: number) => void;
}
