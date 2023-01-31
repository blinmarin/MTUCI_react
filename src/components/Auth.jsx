import { useLocation, Navigate } from "react-router-dom"

export const setToken = (token) => {
    localStorage.setItem('Tokenchik', token)
}

export const fetchToken = () => {
    return localStorage.getItem('Tokenchik')
}

export function RequireToken({ children }) {

    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return children

}