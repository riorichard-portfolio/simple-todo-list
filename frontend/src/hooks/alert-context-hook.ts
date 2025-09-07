import { createContext, useContext } from "react"

export interface AlertContextType {
    showAlert: (message: string) => void
    alertMessage: string
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function useAlertContext() {
    const context = useContext(AlertContext)
    if (!context) throw new Error('alert context is not used in provider')
    return context
}