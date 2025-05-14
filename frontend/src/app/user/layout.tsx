import { ProtectRoute } from "@/components/ProtectRoute";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectRoute allowedRoles={['user']}>
      {children}
    </ProtectRoute>
  );
}
