import React, { useEffect, useState } from 'react';

import './TypePad.css';

const TypePad = (props) => {
    const [buttonSize, setButtonSize] = useState (0);
    const [buttonFontSize, setButtonFontSize] = useState ('20px');
    const [minusFontSize, setMinusFontSize] = useState ('40px')

    //
    // HANDLE COLOR
    let backgroundColor = 'white'
    let fontColor = 'black'
    if (props.isDark) {
      backgroundColor  = 'black'
      fontColor = '#cccccc'
    }
    

    const buttonArray = [
        {
            divClass: 'item',
            buttonClass: 'clear-b',
            text: 'C',
            style: {
                color: 'red'
            },
            onClickP: props.handleClear
        },
        {
            divClass: 'item',
            buttonClass: 'back-b',
            text: '<=',
            onClickP: props.handleBackspace
        },
        {
            divClass: 'item',
            buttonClass: 'sign-b',
            text: '√x',
            onClickP: props.handleSquare 
        },
        {
            divClass: 'item',
            buttonClass: 'sign-b',
            text: '÷',
            onClickP: props.handleManipulation,
            name: 'divide'
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '7',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '8',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '9',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'sign-b',
            text: 'x',
            onClickP: props.handleManipulation,
            name: 'multiply'
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '4',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '5',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '6',
            onClickP: props.handleNum,
        },
        { 
            divClass: 'item',
            buttonClass: 'sign-b',
            text: '-',
            style: {fontSize: minusFontSize},
            onClickP: props.handleManipulation,
            name: 'minus'
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '1',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '2',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '3',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'sign-b',
            text: '+',
            onClickP: props.handleManipulation,
            name: 'plus'
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '0',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item',
            buttonClass: 'num-b',
            text: '.',
            onClickP: props.handleNum,
        },
        {
            divClass: 'item-result',
            buttonClass: 'result-b',
            text: '=',
            style: {fontSize: minusFontSize},
            onClickP: props.handleEqual
        },
    ];

    const buttonStyle = {
        height: buttonSize,
        width: buttonSize,
        fontSize: buttonFontSize,
        backgroundColor: backgroundColor,
        color: fontColor,
    }

    const buttonItems = buttonArray.map ((item, index) =>
        <div
            className = {item.divClass}
            key = {index}
        >
            <button
                className = {item.buttonClass}
                style = {{
                    ...buttonStyle, ...item.style}
                }
                onClick = {item.onClickP}
                name = {item.name}
            >
                {item.text}
            </button>
        </div>
    )

    useEffect (() => {
        calcButtonSize ();
        calcButtonFontSize ()
    });

    function calcButtonSize () {
        const itemElement = document.querySelector ('.item');
        const itemHeight = itemElement.clientHeight;
        const itemWidth = itemElement.clientWidth;
        let smallerSide = null;
        if (itemWidth < itemHeight) {
            smallerSide = itemWidth;
        } else if (itemHeight < itemWidth) {
            smallerSide = itemHeight;
        }
        const buttonSizeC = (smallerSide/100)*85;
        const sizeResult = `${buttonSizeC}px`;
        setButtonSize (sizeResult);
    }

    const calcButtonFontSize = () => {
        const widthField = document.querySelector('.num-b').clientWidth
        const calc = (widthField/100)*70
        const res = `${calc}px`;
        setButtonFontSize (res)
        calcMinusFontSize (calc);
    }

    const calcMinusFontSize = (calc) => {
        const cal = calc * 1.18
        const res = `${cal}px`
        setMinusFontSize (res)
    }

    return (
        <div
            className = 'typePad-div'
            style = {{backgroundColor: backgroundColor}}
        >

            <div className = 'pad'>
                
                <div className = 'border-div'>
                    <div className = 'drag-line' />
                </div>
                {buttonItems}

            </div>
            
        </div>
            
    )
}

export default TypePad;