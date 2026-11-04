"use client";

import { useEffect, useState } from "react";
import { pesertaService } from "@/service/servicePerserta";
import type { PesertaRow } from "../../types";

/** Data peserta magang untuk dashboard admin (filter masih client-side). */
export function usePesertaList() {
  const [data, setData] = useState<PesertaRow[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await pesertaService.getAll<PesertaRow>();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    const matchesFilter =
      filter === "All" || row.status === filter;
    const matchesSearch = (row.pendaftar?.nama ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    data,
    filter,
    setFilter,
    search,
    setSearch,
    filteredData,
  };
}
