import { useAppContext } from "@/src/domains/_app/contexts/AppContext";

// can we do this like :  document.documentElement.className = settings.theme; 🧠???
// which one it's better in case is possible? 🧠

export default function GlobalStyles() {
    const { showScrollbars, theme } = useAppContext();

    return (
        <>
            <style jsx global>{`
                /* Hide scrollbars if showScrollbars is false */
                ${showScrollbars
                    ? ""
                    : `
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    
                    html {
                        scrollbar-width: none; /* For Firefox */
                    }
                    
                    body {
                        -ms-overflow-style: none; /* For Edge and IE 10+ */
                    }
                `}

                /* Ensure scrolling still works */
                body {
                    overflow: auto; /* Ensure scrolling works */
                }
            `}</style>
        </>
    );
}
