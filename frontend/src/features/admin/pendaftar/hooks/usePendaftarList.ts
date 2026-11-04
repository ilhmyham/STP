"use client";

import { useEffect, useState } from "react";
import { PendaftarService } from "@/service/api";
import type {
  ApiPendaftar,
  PendaftarRow,
  PendaftarStatus,
} from "../../types";

const STATUS_ORDER: PendaftarStatus[] = [
  "uncheck",
  "diterima",
  "ditolak",
];

/** Data pendaftar untuk dashboard admin (filter masih client-side). */
export function usePendaftarList() {
  const [data, setData] = useState<PendaftarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData =
          await PendaftarService.getAll<ApiPendaftar>();

        const transformedData = apiData.map(
          (item: ApiPendaftar, index: number) => ({
            id: item.id_pendaftar,
            no: index + 1,
            tanggal: new Date(
              item.created_at
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            nama: item.nama,
            status: item.status,
            divisi: item.bidang_peminatan.nama_bidang,
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Gagal memuat data pendaftar");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (
    id: number,
    currentStatus: PendaftarStatus
  ) => {
    try {
      const currentIndex =
        STATUS_ORDER.indexOf(currentStatus);
      const newStatus =
        STATUS_ORDER[
          (currentIndex + 1) % STATUS_ORDER.length
        ];

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );

      await PendaftarService.updateStatus(
        id,
        newStatus
      );
    } catch (err) {
      console.error("Gagal mengupdate status:", err);

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: currentStatus }
            : item
        )
      );

      setError("Gagal mengupdate status");
    }
  };

  const filteredData = data.filter((row) => {
    const matchesFilter =
      filter === "All" || row.status === filter;
    const matchesSearch = row.nama
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    data,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    filteredData,
    handleStatusUpdate,
  };
}
