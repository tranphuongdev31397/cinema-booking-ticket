import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
    render() {
        return (
            <button className={`button__main ${this.props.styleBtn}`}>
                {this.props.children}
            </button>
        )
    }
}
