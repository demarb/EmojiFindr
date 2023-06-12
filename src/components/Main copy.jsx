import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import categoryData from '../categoryData'
import Emoji from './Emoji.jsx'

export default function Main(){
    
    // States
    const [selectedCategory, setSelectedCategory] =  useState()

    const [allEmojis, setAllEmojis] = useState([])
    // console.log(allEmojis)

    const [currentCategoryEmojis, setCurrentCategoryEmojis] = useState([])
    // console.log(currentCategoryEmojis)

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



    //Use Effect
    // useEffect(()=>{
    //     fetch("https://emojihub.yurace.pro/api/all")
    //         .then(res=> res.json())
    //         .then(data => setAllEmojis(data))
    // }, [])

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
            })
    }, [])

    useEffect(()=>{       
        if (selectedCategory==='all'){
            setCurrentCategoryEmojis(allEmojis)
        }else{
            setCurrentCategoryEmojis(allEmojis.filter(emoji=>emoji.category===selectedCategory))
        }   
    }, [selectedCategory])





    //Renders
    const catData = categoryData.map((cat)=>{
        return <option value={cat.category}> {cat.category} </option>
    })

    // const groupData = categoryData.find(cat=>cat===selectedCategory).group.map((cat)=>{
    //     // const subcategory = [...cat.group]
    //     return <option value={cat}> {cat} </option>
    // })

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
        console.log(id)
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

                    <h2>Subcategory</h2>
                    {/* <select id="select-subCat">
                        {groupData}
                    </select> */}

                    {/* <select id="select-subCat">
                        <option value='all'> All </option>
                        {groupData}
                    </select> */}
                    
                </div>

                <div className="emoji-list">
                    {emojiData}
                </div>

                {showPopup && <Emoji key={selectedEmoji.id} selectedEmoji={selectedEmoji} closePopup={closePopup} />}
            </section>
        </>
    )
}