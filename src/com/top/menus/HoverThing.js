import React, {useState, useEffect} from 'react'

const HoverThing = (props) => {
    const [frameWidth, setFrameWidth] = useState ()
    let zI = 0
    let bG = 'transparent'
    if (props.isOpen) {
        zI = 3
        if (props.isDark) {
            bG = 'rgba(1,0,0,0.7)'
        } else (
            bG = 'rgba(1, 0, 0, 0.3)'
        )
        
    }
    
    useEffect (() => {
        calcWidth ()
    }, [])
    const calcWidth = () => {
        const totalWidth = document.querySelector('.app').clientWidth
        console.log (totalWidth)
        setFrameWidth (totalWidth)
    }

    const style = {
        position: 'absolute',
        height: '100vh',
        width: frameWidth,
        
        zIndex: zI,
        background: bG,

        transition: 'z-index 0.7s ease, background 0.7s ease'
    }

    return (
        <div 
            style = {style}
            onClick  = {props.handleClose}
        />
    )
}

export default HoverThing