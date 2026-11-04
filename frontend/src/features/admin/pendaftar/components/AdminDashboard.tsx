"use client";

import { useRouter } from "next/navigation";
import { FilterTabs } from "../../components/FilterTabs";
import { SearchInput } from "../../components/SearchInput";
import { usePendaftarList } from "../hooks/usePendaftarList";
import { PendaftarTable } from "./PendaftarTable";

const FILTER_OPTIONS = [
  { value: "All", label: "All" },
  { value: "uncheck", label: "Unchecked" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
] as const;

export const AdminDashboard = () => {
  const router = useRouter();
  const {
    data,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    filteredData,
    handleStatusUpdate,
  } = usePendaftarList();

  if (loading) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen p-6 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen p-6 flex justify-center items-center'>
        <div className='text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div className='bg-[#F4F3F6] min-h-screen p-6'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4'>
        <FilterTabs
          options={FILTER_OPTIONS}
          active={filter}
          onChange={setFilter}
        />

        <SearchInput
          value={search}
          onChange={setSearch}
        />
      </div>

      <PendaftarTable
        rows={filteredData}
        total={data.length}
        onRowClick={(id) =>
          router.push(`/admin/infopendaftar/${id}`)
        }
        onStatusToggle={handleStatusUpdate}
      />
    </div>
  );
};
