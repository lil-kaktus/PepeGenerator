import { useState } from "react"
const DEFAULT_PEPE_IMG = "/src/assets/sad-pepe-sticker-no-bg.png"
const HOVER_PEPE_IMG = "/src/assets/happy-pepe-sticker-no-bg.png"

export default function MemeHeader() {

    const [isLogoHovered, setIsLogoHovered] = useState(false)

    return (<div className="meme-generator-header">
        <div className="meme-generator-title-container"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
        >
            <div className="meme-generator-logo-container">
                <img src={isLogoHovered ? HOVER_PEPE_IMG : DEFAULT_PEPE_IMG} className="meme-generator-logo"/>
            </div>
            <span className="meme-generator-title">PepeGenerator</span>
        </div>
    </div>)
}