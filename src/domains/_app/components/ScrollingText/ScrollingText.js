import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollingText.module.css";

export default function ScrollingText({
    text,
    isScrolling,
    backAndForth,
    width,
    textStyle,
}) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;

        // console.log("Container Width:", containerWidth);
        // console.log("Text Width:", textWidth);

        if (isScrolling) {
            setShouldScroll(textWidth > containerWidth);
        } else {
            setShouldScroll(false);
            if (textWidth > containerWidth) {
                const visibleChars =
                    Math.floor((containerWidth / textWidth) * text.length) - 3;
                setDisplayText(`${text.slice(0, visibleChars)}...`);
            } else {
                setDisplayText(text);
            }
        }
    }, [text, width, isScrolling]);

    useEffect(() => {
        if (textRef.current) {
            const textWidth = textRef.current.offsetWidth;
            // console.log("Animation Duration:", `${(textWidth / 100) * 2}s`);
        }
    }, [shouldScroll]);

    return (
        <div
            className={styles.scrollingTextContainer}
            ref={containerRef}
            style={{
                width,
                // Set the CSS variable for the container width
                "--container-width": width,
            }}
        >
            <div
                className={`${styles.scrollingText} ${
                    shouldScroll
                        ? backAndForth
                            ? styles.scrollBackForth
                            : styles.scroll
                        : ""
                }`}
                ref={textRef}
                style={{
                    animationDuration: shouldScroll
                        ? backAndForth
                            ? `${(textRef.current.offsetWidth / 100) * 4}s`
                            : `${(textRef.current.offsetWidth / 100) * 2}s`
                        : "0s",
                }}
            >
                <span className={textStyle}>
                    {shouldScroll ? text : displayText}
                </span>
            </div>
        </div>
    );
}

/*
🧠 How can i pass stlye? Should i pass global or custom style? Should i pass className or style?
    💚 We have to check also if string need scrolling or not
    🧠 Add "..." when scrolling is not active
*/
