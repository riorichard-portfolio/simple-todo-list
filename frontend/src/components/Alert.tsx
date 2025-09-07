interface AlertProps {
    alertMessage: string
}

export default function Alert({ alertMessage }: AlertProps) {
    return <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[320px] px-4 py-3 
            bg-gray-600 text-gray-100 text-center rounded-2xl shadow-lg 
            border border-gray-600 z-50 transition-all duration-300 text-lg">
        {alertMessage}
    </div>
}