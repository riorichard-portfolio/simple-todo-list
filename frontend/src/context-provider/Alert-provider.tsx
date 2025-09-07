import { useState, ReactNode, useRef } from "react";

import { AlertContext } from "../hooks/alert-context-hook";
import Alert from "../components/Alert";

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alertMessage, setAlertMessage] = useState<string>('')
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null) // useRef for unhandled setTimeout for preventing race condition
    const showAlert = (alertMessage: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current) // clear unhandled setTimeout before creating new one
        setAlertMessage(alertMessage)
        timeoutRef.current = setTimeout(() => { // asign new vale to timeoutRef
            setAlertMessage('')
            timeoutRef.current = null // after triggered empty timeoutRef
        }, 800)
    }
    return (
        <AlertContext.Provider value={{ showAlert, alertMessage }}>
            {
                alertMessage && <Alert alertMessage={alertMessage} />
            }
            {children}
        </AlertContext.Provider>
    )
}