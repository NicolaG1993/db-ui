import { useAppContext } from "@/src/domains/_app/contexts/AppContext";

export default function GlobalStyles() {
    const { showScrollbars, theme } = useAppContext();
    console.log("🔴 GlobalStyles: ", { showScrollbars, theme });

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
