import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import "./LayoutBook.scss";
import LayoutContent from './LayoutContent/LayoutContent';
import LayoutSidebar from './LayoutSidebar/LayoutSidebar';

export default class LayoutBook extends Component {
    render() {
        return (
            <div className='layout container'>
                <Row>
                    <Col className='col col_sidebar' md={3}>
                        <LayoutSidebar />
                    </Col>
                    <Col className='col col_content'><LayoutContent/></Col>
                </Row>
            </div>
        )
    }
}
