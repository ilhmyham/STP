
import Sidebar from "@/components/Sidebar";
import SettingCard from "@/components/SettingCard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F5F4F7]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-bold mb-6 text-black">Pengaturan Akun</h2>
        <SettingCard />

      </main>
    </div>
  );
}
