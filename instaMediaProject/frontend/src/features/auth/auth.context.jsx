import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; // path sahi rakhna

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe()
                if (data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}