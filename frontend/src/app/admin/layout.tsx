import { AppProvider } from "../context/AppProviders";
import { ProtectRoute } from "@/components/ProtectRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
    <ProtectRoute allowedRoles={['admin']}>
      {children}
    </ProtectRoute>
    </AppProvider>
  );
}
