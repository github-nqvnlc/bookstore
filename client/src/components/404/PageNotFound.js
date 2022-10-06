import React, { Component } from 'react'
import "./PageNotFound.scss"

export default class PageNotFound extends Component {
    render() {
        return (
            <div className='page_not_found'>
                <div className='err_code'>404</div>
                <div className='err_code'>Error Page Not Found</div>
            </div>
        )
    }
}
