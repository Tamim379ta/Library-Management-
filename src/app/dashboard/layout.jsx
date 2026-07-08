import { DashboardSidebar } from "@/components/shared/DashboardSideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;