import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface LabeledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export default function LabeledButton({
    label,
    className,
    ...props
}: LabeledButtonProps) {
    return <button
        className={twMerge("w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold rounded-md py-2 px-4 cursor-pointer mb-4", className)}
        type="submit"
        {...props}
    >
        {label.charAt(0).toUpperCase() + label.slice(1)}
    </button>
}