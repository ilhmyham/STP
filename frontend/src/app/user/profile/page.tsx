"use client";

import { useRouter } from "next/navigation";
import { ProfileLayout } from "@/features/profile/components/ProfileLayout";
import { UserInfo } from "@/features/profile/components/UserInfo";

export default function Profil() {
  const router = useRouter();

  return (
    <ProfileLayout
      onMobileLogout={() => router.push("/")}
    >
      <UserInfo />
    </ProfileLayout>
  );
}
