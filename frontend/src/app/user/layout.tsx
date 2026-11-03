export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard tunggal dipasang di root layout (features/auth/components/AuthGuard).
  return <>{children}</>;
}
