import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import categoryData from '../categoryData'
import Emoji from './Emoji.jsx'

export default function Main(){
    
    // States
    const [selectedCategory, setSelectedCategory] =  useState()
    const [allEmojis, setAllEmojis] = useState([])
    const [currentCategoryEmojis, setCurrentCategoryEmojis] = useState([])
    const [groupData, setGroupData] =  useState([])
    const [loaded, setLoaded] =  useState(false)

    const [selectedEmoji, setSelectedEmoji] = useState(
        {
            'id': '',
            'name': '', 
            'category': '', 
            'group': '', 
            'htmlCode': [], 
            'unicode': []
        }
    )

    const [showPopup, setShowPopup] = useState(false)

    useEffect(()=>{
        fetch("https://emojihub.yurace.pro/api/all")
            .then(res=> res.json())
            .then(data => {
                const emojisWithId = data.map(emojiObj => {
                    return {
                      ...emojiObj,
                      'id': nanoid()
                    };
                });
                setAllEmojis(emojisWithId)
                setSelectedCategory('all')
                setTimeout(()=>setLoaded(true),"2000")
                
            })
            
    }, [])

    useEffect(()=>{       
        if (selectedCategory==='all'){
            setCurrentCategoryEmojis(allEmojis)
        }else{
            setCurrentCategoryEmojis(allEmojis.filter(emoji=>emoji.category===selectedCategory))
        }
    }, [selectedCategory])

    //Renders0"
    const preloaderGIF = <iframe src="https://giphy.com/embed/OcKLo9xfUxnEgKUw7i" width="200" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

    
    const catData = categoryData.map((cat)=>{
        return <option value={cat.category}> {cat.category} </option>
    })

    const emojiData = currentCategoryEmojis.map((emoji)=>{
        // JSX does not support rendering emojis directly with htmlCode because of their syntax
        let emojiCode= ''
        if (emoji.htmlCode.length===2){
            const codeA = emoji.htmlCode[0];
            const codeB = emoji.htmlCode[1];
            emojiCode = `${codeA}${codeB}`
        }else{
            emojiCode = emoji.htmlCode[0];
        }    

        return <p id={emoji.id} onClick={()=>handleClick(emoji.id)} dangerouslySetInnerHTML={{ __html: emojiCode }} />
    })
    
    // Functions
    function handleCategoryChange(event){
        setSelectedCategory(event.target.value)
    }
    function handleClick(id){
        setSelectedEmoji(currentCategoryEmojis.find(emoji=>emoji.id===id))
        setShowPopup(true)
    }

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <section className="main">
                <div className="category-selection">
                    <h2>Category</h2>
                    <select id="select-cat" value={selectedCategory} defaultValue='all'
                        onChange={handleCategoryChange}>
                            <option value='all'> All </option>
                            {catData}
                    </select>
                    
                </div>

                <div className="emoji-list">
                    {loaded ? emojiData : preloaderGIF}
                </div>

                {showPopup && <Emoji key={selectedEmoji.id} selectedEmoji={selectedEmoji} closePopup={closePopup} />}
            </section>
        </>
    )
}