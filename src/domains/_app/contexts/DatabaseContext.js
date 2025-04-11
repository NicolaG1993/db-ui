import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
    // TODO ... 🧠

    const router = useRouter();
    const [database, setDatabase] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatabase = async () => {
            const { databaseId } = router.query;

            if (databaseId) {
                try {
                    const response = await fetch(
                        `/api/databases/${databaseId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${getTokenFromCookie()}`,
                            },
                        }
                    );

                    if (!response.ok)
                        throw new Error("Failed to fetch database");

                    const data = await response.json();
                    setDatabase(data);
                } catch (error) {
                    console.error("Error fetching database:", error);
                } finally {
                    //   setLoading(false);
                }
            } else {
                //   setLoading(false); // No databaseId, stop loading
            }
        };

        fetchDatabase();
    }, [router.query]);

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    );
};
