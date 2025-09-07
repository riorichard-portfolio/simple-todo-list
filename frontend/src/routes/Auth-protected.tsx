import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthProtected() {
    const location = useLocation()
    const token = localStorage.getItem('token')
    if (!token && location.pathname !== '/login') return <Navigate to='/login' />
    if (token && location.pathname === '/login') return <Navigate to='/todo/' />
    return <Outlet />
}