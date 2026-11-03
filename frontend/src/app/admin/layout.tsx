export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard tunggal dipasang di root layout (features/auth/components/AuthGuard).
  // AppProvider bersarang dihapus agar sesi hanya punya satu sumber.
  return <>{children}</>;
}
