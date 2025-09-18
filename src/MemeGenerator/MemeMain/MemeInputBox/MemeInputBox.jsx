import { useId } from 'react'

export default function MemeInputBox({ setText, text, deleteMemeText }) {

    const inputId = useId()

    return (<div className="meme-generator-input-container">

        <button className="meme-generator-delete-input-button"
            onClick={(e) => deleteMemeText(text.id)}>X</button>

        <label className="meme-generator-text-label" htmlFor={`inputText${inputId}`}>{text.labelText}</label>
        <input
            type="text"
            name={`inputText${inputId}`}
            id={`inputText${inputId}`}
            onChange={(e) => setText(text.id, "value", e.target.value)}
            placeholder={text.placeholderText}
            value={text.value}/>

        <label htmlFor={`inputRange${inputId}`}>Font size : </label>

        <div className="meme-generator-font-range-input-container">
            <p>a</p>
            <input
                type="range"
                name={`inputRange${inputId}`}
                id={`inputRange${inputId}`}
                min="0.9" max="5" step="any"
                defaultValue={text.fontSize}
                onChange={(e) => setText(text.id, "fontSize", e.target.value)} />
            <p>A</p>
        </div>

        <label htmlFor={`inputRangeWidth${inputId}`}>Width : </label>
        <div className="meme-generator-font-range-input-container">
            <p>▶◀</p>
            <input
                type="range"
                name={`inputRangeWidth${inputId}`}
                id={`inputRangeWidth${inputId}`}
                min="5" max="100" step="any"
                defaultValue={text.width}
                onChange={(e) => setText(text.id, "width", e.target.value)} />
            <p>◀▶</p>
        </div>
    </div>)
}