import { Box, Container, Grid, Typography } from '@mui/material';
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
                <Box
                    sx={{
                        width: "100%",
                        pl: "2em",
                        pr: "2em",
                        bgcolor: "#fff",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{ padding: "1em", }} variant="h6" gutterBottom>
                        All Book
                    </Typography>
                    <LayoutContent />
                </Box>

            </Container>
        )
    }
}
