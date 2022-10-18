import { Typography } from '@mui/material';
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
                    <Col className='col_content'>
                        <Typography
                            sx={{ padding: "1em", }}  variant="h6" gutterBottom>
                            All Book
                        </Typography>
                        <LayoutContent />
                    </Col>
                </Row>
            </div>
        )
    }
}
