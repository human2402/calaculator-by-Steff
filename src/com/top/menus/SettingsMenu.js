import React, { useState, useEffect } from 'react'

import './settings.css'

import {ReactComponent as Insta} from '../../icons/insta.svg'

const SettingsMenu = (props) => {
    
    const [frameHeight, setFrameHeight] = useState () 
    const [frameWidth, setFrameWidth] = useState ()
    const [frameTopPos, setFrameTopPos] = useState ()
    const [frameLeftPos, setFrameLeftPos] = useState ()
    const [frameTransition, setFrameTransition] = useState ()

    const [settFontSize, setSettFontSize] = useState ()
    const [settLineHeight, setSettLineHeight] = useState ()
    const [liSidePad, setLiSidePad] = useState ()
    const [liPadding, setLiPadding] = useState ()
    const [togglePad, setTogglePad] = useState ()
    const [iconSize, setIconSize] = useState ()
    const [iconPad, setIconPad] = useState ()
    
    useEffect (() => {
        handleSizes ()
    }, [])

    //
    // HANDLE SIZES
    const handleSizes = () => {
        //calc height
        const fieldHeight = document.querySelector('#root').clientHeight
        const calcFrameHeight = (fieldHeight/100) * 29
        setFrameHeight (calcFrameHeight)
        //calc width
        const fieldWidth = document.querySelector('.app').clientWidth
        const calcFrameWidth = (fieldWidth/100) * 95
        setFrameWidth (calcFrameWidth)
        //calc top
        const negativeTop = -(calcFrameHeight+4)
        setFrameTopPos (negativeTop)
        //calc left
        const posLeft = (fieldWidth - (calcFrameWidth+4))/2
        setFrameLeftPos (posLeft)
        //transition size
        const transSize = ((fieldHeight/100) * 10) + calcFrameHeight
        setFrameTransition (transSize)

        // settings
        // paddings li
        const sidePadLi = (calcFrameWidth/100) * 4
        const liPad = `${sidePadLi}px ${sidePadLi}px 0 ${sidePadLi}px`
        setLiPadding (liPad)
        //font size
        const settingFS = (calcFrameWidth/100) * 7
        setSettFontSize (settingFS)
        //line height
        const settingsLH = (fieldHeight/100) * 10.53
        setSettLineHeight (settingsLH)
        //line side pad
        const lineSideP = sidePadLi* 1.5
        setLiSidePad (lineSideP) 
        //toggle top pad
        const togTopPad = (settingsLH-21) / 2
        setTogglePad (togTopPad)
        //const icon size
        const iconS = (settingsLH/ 2.3)
        setIconSize (iconS)
        //icon pad
        const iconP = (settingsLH - iconS) / 2
        setIconPad (iconP)
    }


    //
    // HANDLE STYLES
    let trans = 0
    if (props.isOpen) {
        trans = frameTransition
    }

    let backgroundColor = 'white'
    let borderColor = 'white'
    if (props.isDark) {
        backgroundColor = 'black'
        borderColor = '#3a3a3a'
    }


    const mainDivStyle = {
        position: 'fixed',
        zIndex: 13,

        height: frameHeight,
        width: frameWidth,
        backgroundColor: backgroundColor,
        
        top: frameTopPos,
        left: frameLeftPos,

        borderRadius: '25px',
        border: `2px ${borderColor} solid`,

        transform: `translateY(${trans}px)`,
        transition: 'transform 0.7s ease, background 1s ease, border 1s ease'
    }

    const mainSettingsDivStyle = {
        height: '90%',
        top: 0
    }

    let fontColor = 'black'
    if (props.isDark) {
        fontColor = 'white'
    }

    return (
        <div
            style = {mainDivStyle}
        >   
            <div
                style = {mainSettingsDivStyle}
            >
                <ul
                    style = {{
                        height: '88%',
                        padding: liPadding
                    }}
                >
                    <li
                        onClick = {props.handleTheme}
                        style = {{
                            height: settLineHeight,
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: `0 ${liSidePad}px 0 ${liSidePad}px`
                            // borderRadius: '15px',
                            // border: '1px #3a3a3a solid'
                        }}
                        className = 'li-main'
                    >
                        <h1
                            style = {{
                                color: fontColor,
                                fontSize: settFontSize,
                                lineHeight: `${settLineHeight}px`,
                                transition: 'color 1s ease'
                            }}
                        >Dark Theme</h1>
                        <label 
                            style = {{marginTop: togglePad}}
                            className = 'switch'
                        >
                            <input
                                type = 'checkbox'
                                checked = {props.isDark}
                                onClick = {props.handleTheme}
                            />
                            <span className = 'slider round'></span>
                        </label>
                    </li>
                    <a
                        href = 'https://www.instagram.com/stephan_is_coding/'
                        target = '_blank'
                        style = {{textDecoration: 'none'}}
                    >
                    <li
                        style = {{
                            height: settLineHeight,
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: `0 ${liSidePad}px 0 ${liSidePad}px`,
                            cursor: 'pointer'
                        }}
                    >
                        <h3
                            style = {{
                                lineHeight: `${settLineHeight}px`,
                                //paddingTop: togglePad/1.4,
                                fontSize: settFontSize,
                                color: fontColor,
                                transition: 'color 1s ease',
                                textAlign: 'start'
                            }}
                        >
                            My Insta
                        </h3>
                        <Insta
                            style = {{
                                height: iconSize+'px',
                                width: iconSize+'px',
                                paddingTop: iconPad,
                                paddingRight: (50-iconSize)/2
                            }}
                        />
                    </li>
                    </a>
                </ul>
            </div>
            <div
                style = {{
                    height: '10%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
                onClick = {props.handleClose}
            >
                <div 
                    style = {{
                        width: '40%',
                        height: '5px',
                        borderRadius: '50px',
                        backgroundColor: '#3a3a3a',
                    }}
                />
            </div>
        </div>
    )
}

export default SettingsMenu;
