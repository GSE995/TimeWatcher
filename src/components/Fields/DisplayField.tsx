import React from 'react'
import './DisplayField.scss'

type handler = (event: React.MouseEvent) => void

interface IProps {
    type?: string
    disabled?: boolean
    color?: string
    className?: string
    handler?: handler
    labelText?: string
    text?: string
    icon?: string
    labelAlign?: string
    labelCls?: string
    labelStyle?: React.CSSProperties
    textStyle?: React.CSSProperties
    style?: React.CSSProperties
}

export default function DisplayField(props: IProps) {
    let labelClassName = `label ${props.labelAlign || ''} ${props.labelCls || ''}`
    return (
        <div className={'display-field ' + props.className} style={props.style}>
            <span className={labelClassName} style={props.textStyle}>
                {props.labelText && props.labelText + ': '}
            </span>
            <span className="value" style={props.textStyle}>
                {props.text}
            </span>
        </div>
    )
}
