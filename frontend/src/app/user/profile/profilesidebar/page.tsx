import { PendaftarGate } from "@/features/pendaftaran/components/PendaftarGate";
import { ProfileSidebar } from "@/features/profile/components/ProfileSidebar";

export default function ProfileSidebarPage() {
  return (
    <PendaftarGate>
      <ProfileSidebar />
    </PendaftarGate>
  );
}
