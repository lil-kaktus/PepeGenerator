import { useRef, useState, useEffect } from 'react'
import MemeInputBox from './MemeInputBox/MemeInputBox'
import MemeFinalImage from './MemeFinalImage/MemeFinalImage'

const DEFAULT_IMG_SRC = "/src/assets/shut-up-and-take-my-money-meme.jpg"
const DEFAULT_TOP_TEXT = "Shut up and"
const DEFAULT_BOTTOM_TEXT = "Take my money!"

export default function MemeMain() {

    const isMobile = WURFL.is_mobile || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

    class MemeText {
        constructor(id, value = "", fontSize = "3", placeholderText, labelText = "Text " + String(id), x = "50", y = "50", width = 100) {
            this.id = id,
                this.value = value,
                this.fontSize = fontSize,
                this.placeholderText = placeholderText || value || "Insert text here...",
                this.labelText = labelText,
                this.x = x,
                this.y = y,
                this.width = width
        }
    }

    const [memeTexts, setMemeTexts] = useState([
        new MemeText(1, DEFAULT_TOP_TEXT, "3", null, "Text 1", 50, 10),
        new MemeText(2, DEFAULT_BOTTOM_TEXT, "3", null, "Text 2", 50, 85)
    ])

    const [isMobileParamsShown, setIsMobileParamsShown] = useState(true)

    const currMemeTextId = useRef(memeTexts.length + 1)

    const [meme, setMeme] = useState({ url: DEFAULT_IMG_SRC }) //meme's image source url

    const [memesQueue, setMemesQueue] = useState([]) // local array of fetched memes

    const [errorMsg, setErrorMsg] = useState("") //updates if an error occured while fethcing

    const isNewImageAvailable = useRef(true) //fetching available only if true
    const shoudlScroll = useRef(false)

    async function getMeme() {
        if (isNewImageAvailable.current) {
            isNewImageAvailable.current = false
            setErrorMsg("")

            if (!memesQueue || memesQueue.length <= 1) {
                setMeme({})
                try {
                    const data = await fetch('https://api.imgflip.com/get_memes')
                    if (!data.ok) {
                        throw new Error('A problem occured with the meme API, please try again later.')
                    }

                    const parsedData = await data.json()

                    let shuffledArray = await parsedData.data.memes;

                    for (let i = shuffledArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1))
                        let temp = await shuffledArray[i]
                        shuffledArray[i] = await shuffledArray[j]
                        shuffledArray[j] = await temp
                    }

                    setMemesQueue(prevMemesQueue => [...shuffledArray])

                    setMeme(shuffledArray[shuffledArray.length - 1])
                }
                catch (err) {
                    setErrorMsg(String(err))
                }
            }
            else {
                setMemesQueue(prevMemes => {
                    const newMemes = [...prevMemes];
                    newMemes.pop()
                    setMeme(newMemes[newMemes.length - 1])
                    return newMemes
                })
            }
            isNewImageAvailable.current = true
        }
    }

    function updateAllLabels() {
        setMemeTexts(prevMemeTexts => prevMemeTexts.map((text, index) => {
            return { ...text, labelText: `Text ${index + 1}` }
        }))
    }

    function editMemeTexts(textId, property, newText) {
        setMemeTexts(prevMemeTexts => prevMemeTexts.map(text => text.id === textId ? { ...text, [property]: newText } : text))
    }

    function deleteMemeText(textId) {
        setMemeTexts(prevMemeTexts => {
            const newMemeTexts = prevMemeTexts.filter(text => text.id !== textId);
            updateAllLabels()
            return newMemeTexts;
        })
    }

    function addMemeText() {
        setMemeTexts(prevMemeTexts => {
            shoudlScroll.current = true
            const newMemeTexts = [...prevMemeTexts, new MemeText(currMemeTextId.current, "", "3", null, "Text " + String(prevMemeTexts.length + 1))];
            updateAllLabels()
            return newMemeTexts;
        })
    }

    useEffect(() => {
        currMemeTextId.current++;
        if (shoudlScroll.current) {

            const texts = document.querySelectorAll('.meme-generator-input-container')
            if (texts.length > 0) {
                texts[texts.length - 1].scrollIntoView({ behavior: "smooth", block: "center" })
            }

            shoudlScroll.current = false
        }
    }, [memeTexts])

    function toggleMobileParams() {

    }

    useEffect(() => {
        if (errorMsg) console.error(errorMsg)
    }, [errorMsg])

    return (<div className="meme-generator-main">
        <div className="meme-generator-main-container">

            <div className="meme-generator-meme-edit-area">
                <MemeFinalImage meme={meme} texts={memeTexts} setTexts={setMemeTexts} isMobile={isMobile} />
            </div>

            <div className="meme-generator-inputs-wrapper" style={{minHeight : isMobileParamsShown ? "85%" : "auto", overflow: isMobileParamsShown ? "auto" : "hidden"}}>

                <button className="meme-generator-mobile-close-menu-btn" onClick={(e) => setIsMobileParamsShown(!isMobileParamsShown)}>
                    <span>
                        ▲
                    </span>
                </button>

                <div className={`meme-generator-inputs-and-buttons-container${isMobileParamsShown ? " meme-generator-wrapper-is-shown" : ""}`}>
                    <div className="meme-generator-inputs-parameters">
                        {memeTexts.length === 0 ?
                            <p>No text created yet.</p>
                            : memeTexts.map(text => {
                                return <MemeInputBox text={text} key={text.id} setText={editMemeTexts} deleteMemeText={deleteMemeText} />
                            })}
                    </div>

                    <div className="meme-generator-bottom-buttons-container">
                        <button className="meme-generator-add-input" onClick={addMemeText}>+</button>

                        <button className="meme-generator-get-image" onClick={(e) => getMeme()}>New meme image</button>
                    </div>
                </div>

            </div>
        </div>
    </div>)
}