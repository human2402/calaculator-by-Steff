import React, { useState, useEffect } from 'react';

import './Top.css'

import { ReactComponent as HistoryIcon } from '../icons/dark/history.svg'
import { ReactComponent as SettingsIcon } from '../icons/dark/settings.svg'
import { ReactComponent as FBHistoryIcon } from '../icons/white/history.svg'
import { ReactComponent as FBSettingsIcon } from '../icons/white/settings.svg'

import HistoryMenu from './menus/HistoryMenu'
import SettingsMenu from './menus/SettingsMenu'
import HoverThing from './menus/HoverThing'

const Top = (props) => {

    // SIZE CALCULATION
    const [iconSize, setIconSize] = useState ()
    const [topMargin, setTopMargin] = useState ()

    const [isHistoryOpen, setHistoryOpen] = useState (false)
    const [isSettingsOpen, setSettingsOpen] = useState (false)
    const [isSmthOpen, setSmthOpen] = useState (false)

    useEffect (() => {
        calcIconSize ()
    }, [])

    useEffect (() => {
        calcTopMargin ()
    }, [iconSize]) 

    const calcIconSize = () => {
        const iconSpaceItem = document.querySelector ('.iconSpaceItem')
        const spaceHeight = iconSpaceItem.clientHeight
        const spaceWidth = iconSpaceItem.clientWidth
        let priorSize
        if (spaceHeight > spaceWidth) {
            priorSize = spaceWidth
        } else if (spaceWidth > spaceHeight) {
            priorSize = spaceHeight
        }
        const calcResult = (priorSize / 100) * 85
        setIconSize (calcResult)
    }

    const calcTopMargin = () => {
        const spaceHeight = document.querySelector ('.div-top').clientHeight
        let result1 = spaceHeight - iconSize
        let result2 = (result1 / 100) * 80
        setTopMargin (result2)
    }
    

    // HANDLE THEME COLORS
    let backgroundColor = 'white'
    if (props.isDark) {
        backgroundColor = 'black'
    }

    let iconStyle = {
        height: `${iconSize}px`,
        width: `${iconSize}px`
    }
    let historyIconElement = <HistoryIcon style = {iconStyle} />
    let settingsIconElement = <SettingsIcon style = {iconStyle} />
    if (props.isDark) {
        historyIconElement = <FBHistoryIcon style = {iconStyle} />
        settingsIconElement = <FBSettingsIcon style = {iconStyle} /> 
    }

    // HANDLE OPEN

    function handleCloseAll () {
        setHistoryOpen (false)
        setSettingsOpen (false)
        setSmthOpen (false)
    }

    const handleHistoryOpen = () => {
        if (isSettingsOpen) {
            setSettingsOpen (false)
            setSmthOpen (true)
        } else {
            setSmthOpen (prevSetSmthOpen => !prevSetSmthOpen)
        }
        setHistoryOpen (prevHistoryOpen => !prevHistoryOpen)
    }
    const handleHistoryClose = () => {
        setHistoryOpen (false)
        setSmthOpen (false)
    }

    const handleSettingsOpen = () => {
        if (isHistoryOpen) {
            setHistoryOpen (false)
            setSmthOpen (true)
        } else {
            setSmthOpen (prevSetSmthOpen => !prevSetSmthOpen)
        }
        setSettingsOpen (prevSettingsOpen => !prevSettingsOpen)
    }

    const handleSettingsClose = () => {
        setSettingsOpen (false)
        setSmthOpen (false)
    }

    return (
        <div
            style = {{
                backgroundColor: backgroundColor
            }}
            className = 'div-top'
        >
            <HoverThing
                isDark = {props.isDark}
                isOpen = {isSmthOpen} 
                handleClose = {handleCloseAll}
            />
            <HistoryMenu 
                isOpen = {isHistoryOpen}
                isDark = {props.isDark}
                handleClose = {handleHistoryClose}
                historyArray = {props.historyArray}
                handleClear = {props.handleClearHistory}
            />
            <SettingsMenu
                isOpen = {isSettingsOpen}
                isDark = {props.isDark}
                handleClose = {handleSettingsClose}
                handleTheme = {props.handleTheme}
            />
            <div className = 'space' />
            <ul>
                <li
                    onClick = {handleHistoryOpen}
                    className = 'iconSpaceItem'
                    style = {{margin: `${topMargin}px ${topMargin}px 0 0`}}    
                >
                    <span
                        className = 'iconItem'
                    >
                        {historyIconElement}
                    </span>
                </li>
                <li
                    onClick = {handleSettingsOpen}
                    style = {{margin: `${topMargin}px ${topMargin}px 0 0`}}
                >
                    <span
                        className = 'iconItem'
                    >
                        {settingsIconElement}
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Top