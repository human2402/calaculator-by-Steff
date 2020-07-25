import React, { useState } from 'react';

import './CalculatorApp.css'

import Top from './com/top/Top';
import Display from './com/display/Display'
import TypePad from './com/typePad/TypePad'

function CalculatorApp () {

    const [curNum, setCurNum] = useState ("")
    const [calcString, setCalcString] = useState ('')
    //const [calcArray, setCalcArray] = useState ([]) (old method)
    const [resultString, setResultString] = useState ('')
    const [historyArray, setHistoryArray] = useState ([])
    const [isArchived, setArchived] = useState (false)

    //HANDLE SIMPLE NUMS
    function handleNum (event) {
        if (isArchived) {handleClear()}
        const name = event.target.name
        setCalcString (prevCalcString => prevCalcString + name)
        setCurNum (prevCurNum => prevCurNum + name)
    }

    //HANDLE MANIPULATION
    function handleManipulation (event) {
        const name = event.target.name
        const text = event.target.textContent
        const transCurNum = Number (curNum)
        //setCalcArray (prevCalcArray => prevCalcArray.concat (transCurNum, name))
        setCurNum ('')
        setCalcString (prevCalcString => prevCalcString + text)
    }
    
    //HANDLE RESULT
    if (curNum !== '') {
        handleResult ()
    }
    function sleep (ms) {
        return new Promise (resolve => setTimeout (resolve, ms)) 
    }
    async function handleResult ( ) {
        await sleep (10)
            //OOOOLD METHOD
        // let result = 0
        // if (calcArray.length > 1) {
        //     result = calcArray[0]
        //     for (let i = 1; i < calcArray.length; i++) {
        //         if (calcArray[i+1] !== undefined)
        //             if (calcArray[i] === 'plus') {
        //                 result = (result + calcArray[i+1])
        //             } else if (calcArray[i] === 'minus') {
        //                 result = (result - calcArray[i+1])
        //             } else if (calcArray[i] === 'multiply') {
        //                 result = (result * calcArray[i+1])
        //             } else if (calcArray[i] === 'divide') {
        //                 result = (result / calcArray[i+1])
        //             }
        //     }
        // } else if (calcArray < 1) {
        //     result = Number(curNum)
        // }
        // const prevIndex = calcArray[calcArray.length-1]
        // const transCurNum = Number (curNum)
        // if (curNum !== '') {
        //     if (prevIndex === 'plus') {
        //         result = result + transCurNum
        //     } else if (prevIndex === 'minus') {
        //         result = result - transCurNum
        //     } else if (prevIndex === 'multiply') {
        //         result = result * transCurNum
        //     } else if (prevIndex === 'divide') {
        //         result = result / transCurNum
        //     }
        // }

        let result = '0'
        result = eval(calcString)
        console.log (result)
        setResultString (result)
    }

    //CLEAR HANDLER
    function handleClear () {
        setCurNum ('')
        setCalcString ('')
        //setCalcArray ([])
        setResultString ('')
        setArchived (false)
    }

    //EQUAL HANDLER
    function handleEqual () {
        setArchived (prevArchived => !prevArchived)
        setHistoryArray (prevHistoryArray => prevHistoryArray.concat ({calcString, resultString}))
    }
    return (
        <div className = 'app'>
            <Top />
            <Display 
                stateCalcString = {calcString}
                stateResultString = {resultString} 
                stateIsArchived = {isArchived}
            />
            <TypePad
                handleNum = {handleNum}
                handleManipulation = {handleManipulation}
                handleClear = {handleClear}
                handleEqual = {handleEqual}
            />
        </div>
    )
}

export default CalculatorApp;