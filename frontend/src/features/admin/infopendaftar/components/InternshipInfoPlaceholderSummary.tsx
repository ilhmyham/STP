import { DataSection } from "../../shared/components/DataSection";

export const InternshipInfoPlaceholderSummary = () => (
  <DataSection
    title='Data Informasi Magang'
    withBreak
    gridClassName='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'
    fields={[
      { label: "Supervisor/Mentor", value: "Robert" },
      {
        label: "No Handphone",
        value: "+62 8xxxxxxxxxxx",
      },
      { label: "Penempatan Magang", value: "Divisi IT" },
      { label: "Email", value: "aabb@gmail.com" },
      {
        label: "Tanggal Mulai Magang",
        value: "12 Februari 2025",
      },
    ]}
  />
);
