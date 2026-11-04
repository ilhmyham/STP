"use client";

import { useEffect, useState } from "react";
import { pesertaService } from "@/service/servicePerserta";
import {
  buildPesertaUploadedFiles,
  emptyPesertaUploadedFiles,
} from "../lib/pesertaFiles";
import type {
  PesertaDetail,
  PesertaUploadedFiles,
} from "../types";

export function usePesertaDetail(id: string) {
  const [data, setData] = useState<PesertaDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] =
    useState<PesertaUploadedFiles>(
      emptyPesertaUploadedFiles
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pesertaData =
          await pesertaService.getById<PesertaDetail>(
            id
          );
        setData(pesertaData);
        setUploadedFiles(
          buildPesertaUploadedFiles(pesertaData)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, uploadedFiles };
}
