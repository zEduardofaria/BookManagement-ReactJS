import React, { Component, Fragment } from 'react'

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <h1>Bem vindo</h1>
                </div>

                <div className="content" id="content">
                </div>
            </Fragment>
        )
    }
}