export interface DataField {
  label: string;
  value: React.ReactNode;
}

export const DataSection = ({
  title,
  fields,
  withBreak = false,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 text-sm gap-y-5",
  titleClassName = "text-[#F53838] font-semibold mb-4 text-[22px]",
}: {
  title: string;
  fields: readonly DataField[];
  withBreak?: boolean;
  gridClassName?: string;
  titleClassName?: string;
}) => (
  <section className='bg-white rounded-2xl shadow p-6 mb-6'>
    <h2 className={titleClassName}>{title}</h2>
    <div className={gridClassName}>
      {fields.map((field) => (
        <div key={field.label}>
          <p className='text-[#636D7C]'>
            {field.label}
          </p>
          {withBreak && <br />}
          <p className='font-semibold'>{field.value}</p>
        </div>
      ))}
    </div>
  </section>
);
