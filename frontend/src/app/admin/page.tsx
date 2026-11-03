import AdminDashboard from "@/components/AdminDashboard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F5F4F7]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-bold mb-6">Data Masuk Pendaftar Magang</h2>

        <AdminDashboard />
      </main>
    </div>
  );
}
