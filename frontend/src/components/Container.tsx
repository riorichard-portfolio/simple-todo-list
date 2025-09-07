import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Container({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return <div className={twMerge("flex justify-center w-screen min-h-screen bg-gray-100 p-2", className)} {...props}>
        {children}
    </div>
}