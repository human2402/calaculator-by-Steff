import React, { useState, useEffect } from 'react'

const HistoryMenu = (props) => {
    
    // SIZE STATES
    const [frameHeight, setFrameHeight] = useState ()
    const [frameWidth, setFrameWidth] = useState ()
    const [negativeTopPosition, setNegativeTopPosition] = useState ()
    const [leftPosition, setLeftPosition] = useState ()
    const [transSize, setTransSize] = useState ()

    const [historyPaddingLi, setHistoryPaddingLi] = useState ()
    const [topLineFont, setTopLineFont] = useState ()
    const [bottomLineFont, setBottomLineFont] = useState ()

    const [clearPad, setClearPad] = useState ()
 
    //
    // CALCULATE SIZES

    useEffect (() => {
        handleSize ()
    }, [])

    const handleSize = () => {
        //setting height
        const totalHeight = document.querySelector('#root').clientHeight
        const resultHeight = (totalHeight / 100) * 80
        setFrameHeight (resultHeight)
        //setting width
        const totalWidth = document.querySelector('.app').clientWidth
        const resultWidth = (totalWidth / 100) * 95
        setFrameWidth (resultWidth)
        // setting left position
        const leftPosition = (totalWidth - (resultWidth + 4)) / 2
        setLeftPosition (leftPosition)
        //setting negative top
        const negPositionCalc = ((totalHeight/100)*10) + (resultHeight+4)
        setNegativeTopPosition (negPositionCalc)
        //setting transition size
        const tSize = negPositionCalc + ((totalHeight/100) * 10)
        setTransSize (tSize)

        //HISTORY

        //padding
        const historyPadTop = (resultHeight/100)*5
        const historyPadSide = (resultWidth/100)*5.5
        const historyPad = `${historyPadTop}px ${historyPadSide}px 0 ${historyPadSide}px` 
        setHistoryPaddingLi (historyPad)
        //top line font
        const topFont = (resultWidth/100) * 12
        setTopLineFont (topFont) 
        //bottom line font
        const bottomFont = (resultWidth/100) * 10
        setBottomLineFont (bottomFont)
        //clear button padding
        const clearPad = (resultWidth / 100) * 4
        const clearPadResult = `${clearPad}px ${historyPadSide}px 0 0`
        setClearPad (clearPadResult) 
        }

    //
    // HISTORY MAP
    let topColor = 'black'
    let bottomColor = '#3a3a3a'
    if (props.isDark) {
        topColor = 'white'
        bottomColor = '#b6b6b6'

    }

    let historyItems = <h1 
        style = {{
            padding: historyPaddingLi,
            fontSize: `${bottomLineFont}px`,
            color: bottomColor
        }}
    >History will appear here</h1>
    if (props.historyArray.length > 0) {
        historyItems = props.historyArray.map ((item, index) => 
            <li 
                key = {index}
                style = {{
                    padding: historyPaddingLi
                }}    
            >
                <h1
                    style = {{
                        fontSize: `${topLineFont}px`,
                        color: topColor
                    }}
                >
                    {item.topLineCut}
                </h1>
                <div
                    style = {{display: 'flex'}}
                >
                    <div style = {{flex: 1}} />
                    <h1
                        style = {{
                            fontSize: `${bottomLineFont}px`,
                            color: bottomColor,
                            fontWeight: '600'
                        }}
                    >
                        {item.bottomLineString}
                    </h1>
                </div>
            </li>
        )
    }

    //
    // STYLES
    let backgroundColor = 'white'
    let borderProp = 'white'
    if (props.isDark) {
        backgroundColor = 'black'
        borderProp = '#3a3a3a'
    }
    let trans = '0'
    let topP = -negativeTopPosition
    if (props.isOpen) { 
        trans = transSize
    }

    let ulHeight = '96.5%'
    let clearArea = null
    if (props.historyArray.length > 0) {
        ulHeight = '89.5%'
        clearArea = <div
            style = {{
                height: '7%',
                display: 'flex'
            }}
            className = 'clear-area'
        >
            <div style = {{flex: 1}} />
            <span 
                style = {{
                    justifyContent: 'space-around'
                }}
                onClick = {props.handleClear}
            >
                <h1
                    style = {{
                        color: 'red',
                        fontSize: 21,
                        fontWeight: 500,
                        padding: clearPad
                    }}
                    className = 'clear-button'
                >Clear</h1>
            </span>
        </div>
    }

    const historyMenuStyle = {
        zIndex: 11,
        backgroundColor: backgroundColor,
        position: 'absolute',
        border: `2px ${borderProp} solid`,
        borderRadius: '25px',
        height: frameHeight,
        width: frameWidth,
        top: topP,
        left: leftPosition,
        transform: `translateY(${trans}px)`,
        transition: 'transform 0.7s ease-in, background 1s ease, border 1s ease'
    }

    const ulStyle = {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        overflowY: 'scroll'
    }
    

    //
    // SPECIAL ELEMENTS
    const dragLineElement = <div
        className = 'border-history'
        style = {{
            display: 'flex',
            justifyContent: 'space-around'
        }}
        onClick = {props.handleClose}
    >
        <div
            className = 'history-drag'
            style = {{
                position: 'fixed',
                height: '5px',
                width: '40%',
                backgroundColor: '#3a3a3a',
                borderRadius: '50px'
            }}
        />
    </div> 

    return (
        <div
            className = 'historyMenu-div'
            style = {historyMenuStyle}
        >
            {clearArea}
            <div
                className = 'main-history-div'
                style = {{height: ulHeight}}
            >
                <ul style = {ulStyle}>
                    {historyItems}
                </ul>
            </div>
            {dragLineElement}
        </div>
    )
}

export default HistoryMenu;