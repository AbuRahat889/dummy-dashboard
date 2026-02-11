// components/FormInput.tsx
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";

interface FormInputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  className?: string;
  required?: boolean;
}

export function FormInput<T extends FieldValues>({
  name,
  className,
  required = true,
  ...rest
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4 ">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {rest.label}
      </label>
      <input
        id={name}
        {...register(name, {
          required: required
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            : false,
          valueAsNumber: rest.type === "number", // convert input value to number if type is number
        })}
        {...rest}
        className={cn(
          "w-full px-3 py-3  rounded-xl text-[#999] text-base font-medium outline-none",
          error && "border-red-500",
          className,
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
