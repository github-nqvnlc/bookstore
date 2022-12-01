import { Container } from '@mui/system'
import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import LayoutBook from './LayoutBook'
import LayoutSidebar from './LayoutSidebar/LayoutSidebar'
import { Stack } from '@mui/material'
import LayoutContent from './LayoutContent/LayoutContent'

export const LayoutSection = (props) => {
    const { type, name, id } = useParams();
    const renderLayout = () => {
        if (type === "category") {
            return (
                <LayoutContent categoryId={Number(id)} nameContent={name} />
            )
        }
        if (type === "catalog") {
            return (
                <LayoutContent catalogId={Number(id)} nameContent={name} />
            )
        }
        if (type === "type") {
            return (
                <LayoutContent typeId={Number(id)} nameContent={name} />
            )
        }
    }

    return (
        <Container
            sx={{
                mt: "1em",
                mb: "1em",
            }}
            maxWidth="xl">
            <Stack direction="row" spacing={2} >

                <LayoutSidebar />


                {renderLayout()}
            </Stack>

        </Container>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSection)