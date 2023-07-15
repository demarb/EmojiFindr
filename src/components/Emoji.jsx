export default function Emoji(props){
    
    let emojiCode= ''
    if (props.selectedEmoji.htmlCode.length===2){
        const codeA = props.selectedEmoji.htmlCode[0];
        const codeB = props.selectedEmoji.htmlCode[1];
        emojiCode = `${codeA}${codeB}`
    }else{
        emojiCode = props.selectedEmoji.htmlCode[0];
    }

    //Function
    const handleExitClick = () => {
      props.closePopup();
    };
    
    const handleCopy = async (arrToCopy) => {
        try {
          await navigator.clipboard.writeText(arrToCopy.join(''));
          console.log('Code copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    };

    return (
        <>
        <div className='emoji-popup'>
                <span className="exit-popup" onClick={handleExitClick}>X</span>
                <p className="emoji-popup-current" dangerouslySetInnerHTML={{ __html: emojiCode }} />
                <span>HtmlCode:</span>
                <hr></hr>
                <p>{props.selectedEmoji.htmlCode[0]} {props.selectedEmoji.htmlCode[1]}</p>
                <p id="copy-htmlCode" onClick={()=>handleCopy(props.selectedEmoji.htmlCode)}><img width=" 25" height=" 25" src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy"/></p>
                <span>Unicode:</span>
                <hr></hr>
                <p>{props.selectedEmoji.unicode[0]} {props.selectedEmoji.unicode[1]}</p>
                <p id="copy-unicode" onClick={()=>handleCopy(props.selectedEmoji.unicode)}><img width=" 25" height=" 25" src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy"/></p>
        </div>
    </>
    )   
}