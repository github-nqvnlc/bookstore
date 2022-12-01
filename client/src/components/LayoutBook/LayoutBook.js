import { Box, Container, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import "./LayoutBook.scss";
import LayoutContent from './LayoutContent/LayoutContent';
import LayoutSidebar from './LayoutSidebar/LayoutSidebar';

export default class LayoutBook extends Component {
    render() {
        return (
            <Container
                sx={{
                    mt: "1em",
                    mb: "1em",
                }}
                maxWidth="xl">
                <LayoutContent categoryId="all" nameContent="All book" />

            </Container>
        )
    }
}
