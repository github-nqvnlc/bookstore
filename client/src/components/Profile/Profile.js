import { Avatar, Box, Container, IconButton, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import * as actions from "../../store/actions";
import { connect } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import ModalEditAccount from '../../containers/System/Admin/Account/ModalEditAccount'

export const Profile = (props) => {
    const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false)

    const toggleModalEdit = () => {
        setIsOpenModalEdit(!isOpenModalEdit);
    };

    React.useEffect(() => {
        props.getAllAccount(props.userInfo.userId)
    }, [])

    return (
        <Container maxWidth="xl">
            <Box sx={{
                width: "100%",
                height: "80vh",
                p: "2em",
                bgcolor: "#fff",
                borderRadius: "10px",
                mb: "1em",
            }}>
                <Stack direction="row" alignItems="center">
                    <Avatar
                        src={props.image}
                        sx={{ width: 200, height: 200, border: "5px solid #2E7D32" }}
                    />
                    <Box
                        sx={{
                            pl: "3em",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "32px",
                                fontWeight: "700",
                            }}
                        >
                            {props.userInfo.lastName}
                            <Tooltip title="Edit account">
                                <IconButton
                                    sx={{
                                        ml: "1em"
                                    }}
                                    onClick={() => setIsOpenModalEdit(true)}
                                >
                                    <EditIcon color='success' />
                                </IconButton>
                            </Tooltip>

                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: "300",

                            }}
                        >
                            {props.userInfo.email}
                        </Typography>
                        <ModalEditAccount
                            isOpen={isOpenModalEdit}
                            toggleModal={toggleModalEdit}
                            editAccount={props.account}
                            role={props.role}
                        />
                    </Box>

                </Stack>

            </Box>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    image: state.user.image,
    userInfo: state.user.userInfo,
    role: state.admin.role,
    account: state.admin.account,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAccount: (id) => dispatch(actions.getAllAccount(id)),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)