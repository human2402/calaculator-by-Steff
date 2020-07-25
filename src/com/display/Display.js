import React, { useState, useEffect } from 'react'

import './Display.css'

const Display = (props) => {

    const [calcMargin, setCalcMargin] = useState (0);
    const [calcFontSize, setCalcFontSize] = useState (0)
    const [fontSave, setFontSave] = useState (0)
    const [resultMargin, setResultMargin] = useState (0)
    const [resultFontSize, setResultFontSize] = useState (0)
    const [fontSaveRes, setFontSaveRes] = useState (0)

    const [isThereTwo, setThereTwo] = useState (false)
    const [lastManipulation, setLastManipulation] = useState ()
    
    //
    //  CALCULATION SIZE

    useEffect (() => {
        makeMarginCalc ();
        makeFontSizeCalc ();
        makeMarginResult ();
        makeFontSizeResult ()
    }, [])

    useEffect (() => {
        makeMarginCalc ()
    }, [isThereTwo])

    useEffect (() => {
        handleBigString ()
    }, [props.topLineString])

    useEffect (() => {
        handleBigResult ()
    }, [props.bottomLineString])


    function makeMarginCalc () {
        const calculationDiv = document.querySelector ('.calculation-div');
        const calculationDivHeight = calculationDiv.clientHeight;
        const calculationDivWidth = calculationDiv.clientWidth;
        let calculationH1TopMargin = ( calculationDivHeight / 100 ) * 20 ;
        if (isThereTwo & lastManipulation !== -1) {
            calculationH1TopMargin = (calculationH1TopMargin / 100) * 50 
        }
        const calculationH1LeftMargin = ( calculationDivWidth / 100 ) * 5 ;
        const calculationH1Margin = `${calculationH1TopMargin}px 0 0 ${calculationH1LeftMargin}px`;
        setCalcMargin (calculationH1Margin)
    }

    const makeFontSizeCalc = () => {

        const widthField = document.querySelector('.calculation-div').clientWidth;
        const calc = (widthField/100)*14;
        setCalcFontSize (calc)
        setFontSave (calc)
    }

    function makeMarginResult () {
        const resultDiv = document.querySelector ('.result-div');
        const resultDivWidth = resultDiv.clientWidth;
        const resultH1RightMargin = ( resultDivWidth / 100 ) * 5
        const resultH1Margin = `0 ${resultH1RightMargin}px 0 0`;
        setResultMargin (resultH1Margin)
    }

    const makeFontSizeResult = () => {
        const widthField = document.querySelector('.result-div').clientWidth;
        const calc = (widthField/100)*12;
        setFontSaveRes (calc)
        setResultFontSize (calc);
    }

    //
    // HANDLE BIG TOP
    let topLineText = props.topLineString
    let middleLineText = ''
    let lastManip = -2
    const handleBigString = () => {
        const fontF10 = fontSave - ((fontSave/100) * 10)
        const fontF11 = fontSave - ((fontSave/100) * 15)
        const fontF12 = fontSave - ((fontSave/100) * 23)
        const fontF13 = fontSave - ((fontSave/100) * 29)
        const fontF14 = fontSave - ((fontSave/100) * 33)
        const fontF15 = fontSave - ((fontSave/100) * 37)

        if (props.topLineString.length < 9) {
            makeFontSizeCalc ()
        } else if (props.topLineString.length > 9 & props.topLineString.length < 15) {
            if (props.topLineString.length === 10) {
                //const newSize = calcFontSize - ((calcFontSize/100) * 5)
                setCalcFontSize (fontF10)
            } else if (props.topLineString.length === 11) {
                //const newSize = calcFontSize - ((calcFontSize/100) * 10)
                setCalcFontSize (fontF11)
            } else if (props.topLineString.length === 12) {
                //const newSize = calcFontSize - ((calcFontSize/100) * 11)
                setCalcFontSize (fontF12)
            } else if (props.topLineString.length === 13) {
                //const newSize = calcFontSize - ((calcFontSize/100) * 11.5)
                setCalcFontSize (fontF13)
            } else if (props.topLineString.length === 14) {
                //const newSize = calcFontSize - ((calcFontSize/100) * 12)
                setCalcFontSize (fontF14)
            }
        } else if (props.topLineString.length === 15) {
            setCalcFontSize (fontF15)
            const manipArray = [topLineText.lastIndexOf ('+'), topLineText.lastIndexOf ('-'), topLineText.lastIndexOf ('x'), topLineText.lastIndexOf ('÷')]
            lastManip = Math.max (...manipArray)
            setLastManipulation (lastManip)
            if (lastManip === -1) {
                props.handleAddMore (false, true)
            } else {
                setThereTwo (true, true)
            }
        } else if (middleLineText.length === 14) {
            props.handleAddMore (false, false)
        } else if (middleLineText.length < 14) {
            props.handleAddMore (true, true)
        }
        if (props.topLineString.length === 16 & !isThereTwo) {
            setLastManipulation (15)
            setThereTwo (true)
            props.handleAddMore (true, true)
        } 
        if (props.topLineString.length > 15) {
            setCalcFontSize (fontF15)
        }
    }

    if (isThereTwo & lastManipulation !== -1) {
        topLineText = props.topLineString.slice(0, (lastManipulation-1))
        middleLineText = props.topLineString.slice(lastManipulation)
    } else if (isThereTwo & lastManipulation === -1) {
    }
    
    //
    // HANDLE BIG BOTTOM
    let bottomLineText = props.bottomLineString
    const handleBigResult = () => {
        if (props.bottomLineString.length > 12 & props.bottomLineString.length < 16) {
            const fontF13r = fontSaveRes - ((fontSaveRes/100) * 10)
            const fontF14r = fontSaveRes - ((fontSaveRes/100) * 15)
            const fontF15r = fontSaveRes - ((fontSaveRes/100) * 20)
            const fontF16r = fontSaveRes - ((fontSaveRes/100) * 27)
            if (props.bottomLineString.length === 13) {
                setResultFontSize (fontF13r)
            } else if (props.bottomLineString.length === 14) {
                setResultFontSize (fontF14r)
            } else if (props.bottomLineString.length === 15) {
                setResultFontSize (fontF15r)
            } else if (props.bottomLineString.length === 16) {
                setResultFontSize (fontF16r)
            }
        }
    }

    //
    // HANDLE COLOR

    let mainBackgroundColor = "white"
    if (props.isDark) {
        mainBackgroundColor = 'black'
    }
    

    // Top Line Element
        
        let topLineColor = 'black'
        if (topLineText === '') {
            topLineText = 'Type'
            if (!props.isDark) {
                topLineColor = '#3a3a3a'
            } else if (props.isDark) {
                topLineColor = '#cccccc'
            }
        } else if (topLineColor !== '') {
            if (props.isDark) {
                topLineColor = '#ffffff'
            }
        }

        const topLineElement = <h1
            className  = 'calculation-h1'
            style =  {{
                padding: calcMargin,
                fontSize: `${calcFontSize}px`,
                color: topLineColor
            }}
        >
            {topLineText}
        </h1>


    // Middle Line Element
    let middleLineElement = null
    if (isThereTwo) {
        middleLineElement = <h1
            style =  {{
                padding: calcMargin,
                fontSize: `${calcFontSize}px`,
                color: topLineColor
            }}
            className = 'calculation-h1'
        >
            {middleLineText}
        </h1>
    }

    
    // Bottom line Element
    let bottomLineOpacity = 1
    let bottomLineColor = '#3a3a3a'
    if (bottomLineText === '') {
        bottomLineOpacity = 0
    }
    if (props.isDark) {
        bottomLineColor = '#b6b6b6'
    }

    const bottomLineElement = <h1
        className = 'result-h1'
        style = {{
            margin: resultMargin,
            fontSize: `${resultFontSize}px`,
            opacity: bottomLineOpacity,
            color: bottomLineColor
        }}
        >
            {bottomLineText}
        </h1>

    return (
        <div className = 'display-div'
            style = {{backgroundColor: mainBackgroundColor}}
        >
            <div className = 'calculation-div'>
                {topLineElement}
                {middleLineElement}
            </div>
            <div className = 'result-div'>
                <div className = 'space' />
                {bottomLineElement}
            </div>
        </div>
    )
}

export default Display;