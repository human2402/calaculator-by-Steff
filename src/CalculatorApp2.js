import React, {useState, useEffect} from 'react'

import './CalculatorApp.css'

import Top from './com/top/Top'
import Display from './com/display/Display'
import TypePad from './com/typePad/TypePad'

const CalculatorAppTwo = () => {

    const [isDark, setDark] = useState (false)
    const [isEqual, setEqual] = useState (false)

    const [topLineString, setTopLineString] = useState ('')
    const [bottomLineString, setBottomLineString] = useState ('')

    const [internalString, setInternalString] = useState ('')
    const [manipBuffer, setManipBuffer] = useState ('')
    const [squareBuffer, setSquareBuffer] = useState ()

    const [canAddMoreNum, setAddMoreNum] = useState (true)
    const [canAddMoreManip, setAddMoreManip] = useState (true)

    const [historyArray, setHistoryArray] = useState ([])

    // HANDLE THEME
    function handleTheme () {
        setDark(prevDark => !prevDark)
        console.log (isDark)
    }
    
    useEffect (() => {
        handleResult ()
    }, [internalString])

    // MORE CONTROL
    useEffect (() => {
        if (topLineString.length > 14) {
            checkAddMore ()
        }
    }, [topLineString])

    const checkAddMore = () => {
        // if (topLineString = 15 & topLineString.lastIndexOf('+') < 0 & topLineString.lastIndexOf('-') < 0 & topLineString.lastIndexOf('x') < 0 & topLineString.lastIndexOf('÷') === -1) {
        //     setAddMore (false)
        // }
    }

    const handleAddMore = (positionFNum, positionFManip) => {
        setAddMoreNum (positionFNum)
        setAddMoreManip (positionFManip)
    }

    // HANDLE SIMPLE NUMS
    function handleNum (event) {
        if (canAddMoreNum) {
            if (isEqual) {setEqual (false)}
            const text = event.target.textContent
            setTopLineString (prevTopLineString => prevTopLineString + text)
            if (manipBuffer === '') {
                setInternalString(prevInternalString => prevInternalString + text)
            } else if (manipBuffer !== '') {
                setInternalString(prevInternalString => prevInternalString + manipBuffer + text)
                setManipBuffer ('')
            }
        }
    }

    // HANDLE MANIPULATION
    function handleManipulation (event) {
        if (canAddMoreManip & internalString.length > 0) {
            if (isEqual) {setEqual (false)}
            if (manipBuffer !== '') {handleBackspace ()}
            const text = event.target.textContent
            const manip = event.target.name
            setTopLineString (prevTopLineString => prevTopLineString + text)
            if (manip === 'plus') {
                setManipBuffer ('+')
            } else if (manip === 'minus') {
                setManipBuffer ('-')
            } else if (manip === 'multiply') {
                setManipBuffer ('*')
            } else if (manip === 'divide') {
                setManipBuffer ('/')
            }
        }
    }

    // HANDLE SQUARE
    function handleSquare () {
        console.log(Math.sqrt (1))
    }

    // HANDLE BACKSPACE
    function handleBackspace () {
        const lastCharacter = topLineString.slice(-1)
        const preLastCharacter = topLineString.slice(-2,-1)
        if (lastCharacter === '+' | lastCharacter === '-' | lastCharacter === 'x' | lastCharacter === '÷') {
            setManipBuffer ('')
            setTopLineString (prevTopLineString => prevTopLineString.slice (0, -1))
        } else if (preLastCharacter === '+' | preLastCharacter === '-' | preLastCharacter === 'x' | preLastCharacter === '÷') {
            if (preLastCharacter === '+') {
                setManipBuffer ('+')
            } else if (preLastCharacter === '-') {
                setManipBuffer ('-')
            } else if (preLastCharacter === 'x') {
                setManipBuffer ('*') 
            } else if (preLastCharacter === '÷') {
                setManipBuffer ('/')
            }
            setTopLineString (prevTopLineString => prevTopLineString.slice (0, -1))
            setInternalString (prevInternalString => prevInternalString.slice (0, -2))
        } else {
            setTopLineString (prevTopLineString => prevTopLineString.slice (0, -1))
            setInternalString (prevInternalString => prevInternalString.slice (0, -1))
        }
    }

    // HANDLE CLEAR
    function handleClear () {
        setTopLineString ('')
        setBottomLineString ('')
        setInternalString ('0')
        setManipBuffer ('')
        setEqual (false)
        handleAddMore (true, true)
    }

    // HANDLE EQUAL
    function handleEqual () {
        let topLineCut = topLineString
        if (topLineString.length > 11) {
            topLineCut = (topLineString.slice (0, 10) + "..")
        }
        setHistoryArray (prevHistoryArray => prevHistoryArray.concat ({topLineCut, bottomLineString}))
        
        setTopLineString (bottomLineString.toString())
        setInternalString (bottomLineString.toString())
        setBottomLineString ('')
        setManipBuffer ('')
        setEqual (true)
        handleAddMore (true, true)
    }

    // HANDLE RESULT
    function handleResult () {
        if (!isEqual) {
            let result = internalString
            if (internalString.length > 1) {
                result = eval (internalString)
                if (!Number.isInteger(result)) {
                    result = Number.parseFloat(result).toFixed(2)
                    if (result.slice (-1) === '') {
                        result = result.slice(0,-1)
                    }
                }
                if (result > 99999999999999) {
                    result = Number.parseFloat(result).toExponential(9)
                }
                result = result.toString()
            }
            setBottomLineString (result)
        }
    }

    // HANDLE CLEAR HISTORY
    const handleClearHistory = () => {
        setHistoryArray ([])
    }
    
    return (
        <div className = 'app'>
            <Top
                isDark = {isDark}
                historyArray = {historyArray}
                handleTheme = {handleTheme}
                handleClearHistory = {handleClearHistory}
            />
            <Display
                handleAddMore = {handleAddMore}
                isDark = {isDark}
                topLineString = {topLineString}
                bottomLineString = {bottomLineString}
            />
            <TypePad 
                isDark = {isDark}
                handleNum = {handleNum}
                handleManipulation = {handleManipulation}
                handleSquare = {handleSquare}
                handleBackspace = {handleBackspace}
                handleClear = {handleClear}
                handleEqual = {handleEqual}
            />
        </div>
        
    )
}

export default CalculatorAppTwo;