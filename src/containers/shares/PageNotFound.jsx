import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="d-flex">
                <Redirect to="/" />
            </div>
        )
    }
}
