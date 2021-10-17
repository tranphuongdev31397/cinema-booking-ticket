import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup'
import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
    
    render() {
        return (
           <button style={{backgroundColor: `${this.props.background}`, color: `${this.props.color}`}} className="basic-button" onClick={this.props.onClick}>
               <span className="icon">{this.props.icon}</span>
               <span className="content">{this.props.children}</span>
           </button>
        )
    }
}
