import React, { useState } from 'react';
import './main.scss'
// import { Twemoji } from 'react-emoji-render';
// import {times} from'react-icons/fa'
import CloseIcon from '@material-ui/icons/Close';

const default_array = [{ id: 1, detail: 'react' }, { id: 2, detail: 'javascript' },
    { id: 3, detail: 'yoyo' }, { id: 4, detail: 'read' }]
const default_input_text = 'Hi Lets find you a tag, start typing'
let new_id =4
const Tagify = (props) => {

    const [tagArray,settagArray] = useState(default_array)
    const [inputValue, setinputValue] = useState('')
    const [resultbox, setshowbox] = useState(false)
    const [savedInputArray, setsavedInputArray] = useState([])
    const [addtext, setText] = useState(true)
    const [buttonColor, setbuttonColor] = useState(true)
    const[backgroundswap,setbackGroundSwap]=useState(true)

    
    const handlekey = (e,currentDetail) => {
        if (e.nativeEvent.key == " ") {
            e.preventDefault();
            let is_present = savedInputArray.some(item => item.detail === currentDetail.toString().trim())
            if (!is_present && currentDetail!='' ) {
            
                saveTag(currentDetail)
            }
       
        }
        else {
            console.log('else condition handle running')
        }
       
        if (e.nativeEvent.key == 'Enter') {
            let is_present = savedInputArray.some(item => item.detail === currentDetail.toString().trim())
            if (!is_present && currentDetail!='') {
            
               saveTag(currentDetail)
            }
       
        }
        else {
            console.log('else condition handle running')
        }

        if (e.nativeEvent.key == '+') {
   
            
                e.preventDefault();
    

            let is_present = savedInputArray.some(item => item.detail === currentDetail.toString().trim())
            if (!is_present && currentDetail!='') {
            
               saveTag(currentDetail)
            }
        }



    }
    const swapbackground = (swap) => {
    setbackGroundSwap(swap)
}
    const swapcolor = (swap) => {
     setbuttonColor(swap)
 }

    const revealshowbox = (setshow) => {
     
        setshowbox(setshow) 
    }

    const saveTag = (currentdetail) => {
        new_id=new_id+1
        let savedItem = { detail: currentdetail.toString().trim(), id: new_id }
        let is_present = savedInputArray.some(item => item.detail === currentdetail.toString().trim())
        console.log(is_present)
        if (is_present) {
            console.log('item already present')
        }
        else {
            setsavedInputArray([savedItem, ...savedInputArray])
            let filtered_array_2 = [...tagArray].filter(item => {
                return item.detail != currentdetail.toString().trim()
            })
            settagArray([ savedItem,...filtered_array_2])
           
        }
           
        setinputValue('')
        
    }

    const deleteTag = (currentItem) => {
        const filteredArray=savedInputArray.filter(item=>item.id!=currentItem.id)
        setsavedInputArray(filteredArray)
    }

    const tagFilterHandler = e => {
        console.log('value of e is', e.target.value); 
        setinputValue(e.target.value)
        setText(false)
    }
    
    let new_array=tagArray.filter(item => item.detail.includes(inputValue))
    console.log('new array is', new_array)
 
    return (
        <div className='container'>

            <p className='input_container_text' style={{
                fontSize: 12.8,
                fontWeight: 700,
                letterSpacing: 0.3,
                fontStyle:'normal'
                
            }} >Tags</p>
            <p className='input_container_text'
                style={{
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize:14,
            }}
            >Select tags</p>

            <div className='saved_input_container' style={{backgroundColor:backgroundswap?'#F5F5F5':'#EBEBEB'}} >
                {savedInputArray.length != 0 ?
                    savedInputArray.map((item, index) => <div key={index}
                        className='TagContainer'
                        style={{backgroundColor:buttonColor?'#EBF6FF':'white'}}
                    >
                       <p className="input_button_text"> {item.detail} </p> 
                        <p className='Delete-icon' onClick={() => deleteTag(item)} ><CloseIcon style={{fontSize:12} }/></p>
                    </div>) : null
                  
        }
            </div>
            <div className='inputWrapper'>
                {!inputValue && savedInputArray.length==0 ?<p className='placeholdertext'>ADD TAGS</p>:null}
            <input onChange={tagFilterHandler}
                className='Input'
                onClick={()=>revealshowbox(true)}
                    value={inputValue}
                    onFocus={()=>swapcolor(false)}
                    onBlur={() => swapcolor(true)}
                    onMouseOver={() => swapbackground(false)}
                    onMouseLeave={()=>swapbackground(true)}
                onKeyPress={(e)=>handlekey(e,inputValue)}
    
                />
                </div>
            {inputValue ?
                <div
                    className='keyword_container'>
                    {new_array.length != 0 ? new_array.map((item, index) => <div
                        className='Search-Result'
                        key={index}
                        onClick={() => { saveTag(item.detail); revealshowbox(false) }}
                    >
                       <p className='keyword_text'> {item.detail}</p>
                    </div>) :
                      
                            <div className={'unsaved_keyword'}  onClick={() => { saveTag(inputValue); revealshowbox(false) }}>{inputValue}</div>
                    }
            </div>:null}
            
        </div>
    );
}

export default Tagify;