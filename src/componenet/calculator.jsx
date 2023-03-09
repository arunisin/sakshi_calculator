import React, { useState, useRef, useEffect } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './calculator.css';
import 'remixicon/fonts/remixicon.css'
import flower from '../assets/svg/flower.png'

const Calculator = () => {
    const drop_options = [
        'Ammonium Nitrogen',
        'Nitrite Nitrogen',
        'Nitrate Nitrogen'
    ]

    const [method,setMethod]= useState(drop_options[0])
    const [od,setOd] = useState('')
    const [dilutionFactor,setDilutionFactor] = useState('')
    const [finVal,setFinVal] = useState('')
    const [showFinVal,setShowFinVal] = useState(false)
    const decimalPlaces = 3;

    const dilutionInputRef = useRef(null);
    const odInputRef = useRef(null);
    const calculateRef = useRef(null);

    const calcFinVal = ()=>{  
        if(od !== '' && dilutionFactor !== ''){ 
            setShowFinVal(true);
            switch(method){
                case drop_options[0]:
                    setFinVal(
                        ((od-0.0151)*dilutionFactor/0.8931).toFixed(decimalPlaces)
                    )
                    break;
                case drop_options[1]:
                    setFinVal(
                        ((od+0.004)*dilutionFactor/2.7468).toFixed(decimalPlaces)
                    )
                    break;
                case drop_options[2]:
                    setFinVal(
                        ((od-0.0171)*dilutionFactor/0.2434).toFixed(decimalPlaces)
                    )
                    break;
                default:
                    setFinVal(
                        ((od-0.0151)*dilutionFactor/0.8931).toFixed(decimalPlaces)
                    )
                    break;
            }  
        }
        else{
            setShowFinVal(false)
            alert('boop boop, i don\'t have the values to do calc')
        }   
    }
    
    const copyContent = ()=>{
        navigator.clipboard.writeText(finVal)
    }

    const switchToNextInput = (e)=>{
        console.log(e)
        if(e.key==='Enter'){
            //e.preventDefault();
            switch(e.target){
                case odInputRef.current:
                    dilutionInputRef.current.focus();
                    break;
                case dilutionInputRef.current:
                    calculateRef.current.click()
                    break;
                default:
                    break;
            } 
        }
    }

    const dropdownSelection = (e)=>{
        setMethod(e.value);
    }

    useEffect(()=>{  
            calcFinVal()
    },[method])
    

  return (<>
    <div className='calculator'>
       <Dropdown 
       options={drop_options}
        value={drop_options[0]}
        placeholder={drop_options[0]}
        onChange={dropdownSelection}
        className='dropDown'/>

        <form className='inputs'>
            <label>
                <h2>OD </h2><input 
                type="number" 
                onChange={(e)=>{
                    setOd(e.target.value)
                }} 
                name='OD'
                placeholder='enter value' 
                onKeyDown={switchToNextInput}
                ref={odInputRef}
                />
            </label>
            <label>
                <h2>Dilution Factor</h2>
                <input 
                type="number" 
                onChange={(e)=>{
                    setDilutionFactor(e.target.value)
                }} 
                name='OD' 
                placeholder='enter value'
                onKeyDown={switchToNextInput}
                ref={dilutionInputRef}/>
            </label>
            <input
             onClick={calcFinVal} 
             type='button' 
             value='calculate'
             className='calculate'
             ref={calculateRef}/>
        </form>

        <div className="finalVal" style={{display:showFinVal?'inline':'none'}}>
            <h1>{finVal}</h1>
            <i class="ri-file-copy-line copy__content"
             onClick={copyContent}/>
        </div>

    
        
    </div>
    <div className='flowerImg'>
         <img src={flower} alt="" />
    </div>
      </> 
    
  )
}

export default Calculator