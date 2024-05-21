import { Checkbox } from "@/components/ui/checkbox";

function Option({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="baap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
      >
        {children}
      </label>
    </div>
  );
}

export default Option;
