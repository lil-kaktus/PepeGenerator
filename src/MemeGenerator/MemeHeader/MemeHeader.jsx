import { useState } from "react"

import pepeImgHover from "/src/assets/happy-pepe-sticker-no-bg.png"

import pepeImgDefault from "/src/assets/sad-pepe-sticker-no-bg.png"

const DEFAULT_PEPE_IMG = pepeImgDefault
const HOVER_PEPE_IMG = pepeImgHover

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