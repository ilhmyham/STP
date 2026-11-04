import { PendaftarGate } from "@/features/pendaftaran/components/PendaftarGate";
import { ProfileForm } from "@/features/profile/components/ProfileForm";

export default function EditProfileFormPage() {
  return (
    <PendaftarGate>
      <ProfileForm />
    </PendaftarGate>
  );
}
