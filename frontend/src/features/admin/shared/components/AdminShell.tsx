import Sidebar from "@/components/Sidebar";

export const AdminFormShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='flex min-h-screen bg-[#F5F4F7]'>
    <Sidebar />
    <main className='flex-1 p-10 ml-64'>{children}</main>
  </div>
);

export const AdminDetailShell = ({
  children,
  contentClassName = "flex-1 p-6 md:p-8 ml-0 md:ml-64",
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) => (
  <div className='bg-[#F4F3F6] min-h-screen flex'>
    <Sidebar />
    <div className={contentClassName}>{children}</div>
  </div>
);
