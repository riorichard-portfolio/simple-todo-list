import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TypableInputType = "text" | "email" | "password";

interface TypableInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { // omit except the type to be used
    label?: string;
    type?: TypableInputType;
    placeholder?: string
}

const TypableInput = forwardRef<HTMLInputElement, TypableInputProps>(
    ({ label = "", className = "", type = "text", placeholder='', ...props }, ref) => {
        const id = label
            ? label.toLowerCase().replace(/\s+/g, "-")
            : undefined;

        return (
            <div className="mb-4">
                {label && (
                    <label htmlFor={id} className="block text-gray-600">
                        {label.charAt(0).toUpperCase() + label.slice(1)}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    name={id}
                    className={twMerge('w-full border border-gray-800 rounded-md py-2 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400', className)}
                    autoComplete="off"
                    placeholder={placeholder}
                    required
                    {...props}
                />
            </div>
        );
    }
);

TypableInput.displayName = "TypableInput";
export default TypableInput;