"use client";

import { useEffect, useState } from "react";
import { bidangPeminatanService } from "@/service/master.service";
import type { BidangPeminatanOption } from "../types";

export function useBidangPeminatanOptions() {
  const [options, setOptions] = useState<
    BidangPeminatanOption[]
  >([]);

  useEffect(() => {
    bidangPeminatanService
      .getAll()
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching bidang peminatan data:",
          error
        );
      });
  }, []);

  return options;
}
