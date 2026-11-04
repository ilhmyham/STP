import { PendaftarGate } from "@/features/pendaftaran/components/PendaftarGate";
import { UserInfo } from "@/features/profile/components/UserInfo";

export default function UserInfoPage() {
  return (
    <PendaftarGate>
      <UserInfo />
    </PendaftarGate>
  );
}
