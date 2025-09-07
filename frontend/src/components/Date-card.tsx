import { HTMLAttributes } from "react"

interface DateCardProps extends HTMLAttributes<HTMLDivElement> {
    month: string
    date: number
    selected: boolean
}

export default function DateCard({ month, date, selected, ...props }: DateCardProps) {
    return <div {...props} className={`flex flex-col items-center justify-center min-w-[72px] aspect-square p-2 rounded-md ${selected ? 'bg-gray-200' : ''
        } shadow-md cursor-pointer `}>
        <p className="text-[18px] font-medium text-gray-600">{month}</p>
        <p className="text-[22px] font-bold text-gray-800">{date}</p>
    </div>
}