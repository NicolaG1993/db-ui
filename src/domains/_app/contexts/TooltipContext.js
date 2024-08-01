import React, { createContext, useContext, useState } from "react";
import Tooltip from "@/src/domains/_app/constants/components/Tooltip/Tooltip";

export const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipProps, setTooltipProps] = useState({
        title: "",
        text: "",
        position: { x: 0, y: 0 },
    });

    const showTooltip = (title, text, e) => {
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        setTooltipProps({
            title,
            text,
            position: { x: e.clientX + scrollX, y: e.clientY + scrollY },
        });
        setTooltipVisible(true);
    };

    const hideTooltip = () => {
        setTooltipVisible(false);
    };

    const handleMouseMove = (e) => {
        if (tooltipVisible) {
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            setTooltipProps((prev) => ({
                ...prev,
                position: { x: e.clientX + scrollX, y: e.clientY + scrollY },
            }));
        }
    };

    return (
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            <div onMouseMove={handleMouseMove}>{children}</div>
            <Tooltip {...tooltipProps} visible={tooltipVisible} />
        </TooltipContext.Provider>
    );
};

// export const useTooltip = () => useContext(TooltipContext);
