import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    checklist: boolean
}

export default function CheckboxInput({ title, checklist, className, ...props }: CheckboxInputProps) {
    return <label className={`flex cursor-pointer items-center space-x-3`}>
        <input
            type="checkbox"
            className={twMerge(`h-5 w-5 rounded border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-gray-300 cursor-pointer`, className)}
            checked={checklist}
            {...props}
        />
        <p className={`text-gray-600 ${checklist ? 'line-through' : ''}`}>{title}</p>
    </label>
}