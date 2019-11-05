import React from 'react'
import './Button.scss'

type handler = (event: React.MouseEvent) => void

interface IProps {
    type?: string
    disabled?: boolean
    className?: string
    handler?: handler
    text?: string
    appendIconCls?: string
    children?: any
    style?: React.CSSProperties
}

export default function Button(props: IProps) {
    return (
        <button
            onClick={props.handler}
            style={props.style}
            disabled={props.disabled}
        >
            <i className={props.appendIconCls}></i>
            {props.children}
        </button>
    )
}
