"use client";

import { useRouter } from "next/navigation";
import { FilterTabs } from "../../components/FilterTabs";
import { SearchInput } from "../../components/SearchInput";
import { usePesertaList } from "../hooks/usePesertaList";
import { PesertaTable } from "./PesertaTable";

const FILTER_OPTIONS = [
  { value: "All", label: "All" },
  { value: "On Going", label: "On Going" },
  { value: "Finished", label: "Finished" },
] as const;

export const UserDashboard = () => {
  const router = useRouter();
  const {
    filter,
    setFilter,
    search,
    setSearch,
    filteredData,
  } = usePesertaList();

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
          alt='search icon'
        />
      </div>

      <PesertaTable
        rows={filteredData}
        onEdit={(id) =>
          router.push(
            `/admin/infopendaftar/tambahdata/sunting/${id}`
          )
        }
        onView={(id) =>
          router.push(`/admin/users/datapeserta/${id}`)
        }
      />
    </div>
  );
};
