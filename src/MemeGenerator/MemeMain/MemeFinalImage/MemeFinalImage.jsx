import { useRef, useState } from "react";

export default function MemeFinalImage({ meme, texts, setTexts, isMobile}) {

    const containerRef = useRef(null)
    const draggingId = useRef(null)

    function handleDragStart(e, textId) {
        draggingId.current = textId
        
        if (isMobile){
            document.addEventListener("touchmove", handleDragMove);
            document.addEventListener("touchend", handleDragEnd)
        }
        else{
            document.addEventListener("mousemove", handleDragMove);
            document.addEventListener("mouseup", handleDragEnd)
        }
    }

    function handleDragMove(e) {
        if (!draggingId.current || !containerRef.current) return;

        const client = e.changedTouches ? e.changedTouches[0] : e //switches event based on the device used

        const containerInfos = containerRef.current.getBoundingClientRect()
        const finalX = ((client.clientX - containerInfos.left) / containerInfos.width) * 100
        const finalY = ((client.clientY - containerInfos.top) / containerInfos.height) * 100

        setTexts(prevTexts => prevTexts.map(text => (
            text.id === draggingId.current ? { ...text, x: finalX, y: finalY} : text
        )))
    }

    function handleDragEnd() {
        draggingId.current = null
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd)
        if(isMobile){
            document.removeEventListener("touchend", handleDragEnd)
        }
    }

    return (
        <div className="meme-generator-meme-container" ref={containerRef}>
            {texts.map(text => {
                return <p
                    title={text.labelText}
                    key={text.id}
                    className={`meme-generator-meme-text`}
                    style={{
                        fontSize: text.fontSize + "rem",
                        height: text.fontSize + "rem",
                        top: `${text.y}%`,
                        left: `${text.x}%`,
                        width: `${text.width}%`
                    }}
                    onMouseDown={(e) => handleDragStart(e, text.id)}>
                    {text.value.toUpperCase()}
                </p>
            })}
            {meme.url && <img src={meme.url} />}
        </div>
    )
}