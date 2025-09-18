import MemeHeader from './MemeHeader/MemeHeader.jsx'
import MemeMain from './MemeMain/MemeMain.jsx'

export default function MemeGenerator(){
    return(<article className="meme-generator">
        <MemeHeader/>
        <MemeMain/>
    </article>)
}