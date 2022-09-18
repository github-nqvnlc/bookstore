import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../../utils/constant"
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions'

// import './ManageBook.scss';
// import ModalAccount from './ModalAccount';
// import ModalEditAccount from './ModalEditAccount';
import Lightbox from 'react-image-lightbox';
import avatar from '../../../../assets/avatar.png'

class ManageBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenModalEdit: false,
           
            isOpen: false,
            previewImage: ''
        }

    }
    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    
    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    toggleModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        });
    };

    openPreviewImage = (image) => {
        this.setState({
            isOpen: true,
            previewImage: image
        })
    }

    render() {
        let arrAccount = this.state.account;
        console.log(arrAccount)
        // let arrRole = this.state.role;
        return (

            <div >
                <div className='title'>
                    Manage Book
                </div>
                {/* <ModalAccount
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleModal}
                    // createNewUser={this.createNewUser}
                    role={this.props.role}
                />
                <ModalEditAccount
                    isOpen={this.state.isOpenModalEdit}
                    toggleModal={this.toggleModalEdit}
                    editAccount={this.state.accountEdit}
                    role={this.props.role}
                /> */}
                <div className='account_container'>
                    <button
                        type="button"
                        className="button px-3 py-2 mx-3"
                        onClick={() => this.handleCreateNewAccount()}
                    >
                        Create new a book
                    </button>

                    <div className="user-table mt-4 mx-3">
                        <table id="admin">
                            <tbody>
                                <tr>
                                    <th style={{ width: "5%" }}>No.</th>
                                    <th style={{ width: "15%" }}>Name</th>
                                    <th style={{ width: "15%" }}>Description</th>
                                    <th style={{ width: "10%" }}>Author</th>
                                    <th style={{ width: "10%" }}>Price</th>
                                    <th style={{ width: "10%" }}>Discount</th>
                                    <th style={{ width: "5%" }}>Quantity</th>
                                    <th>Image</th>
                                    <th>Action</th>

                                </tr>
                                {arrAccount && arrAccount.length > 0 &&
                                    arrAccount.map((item, index) => {
                                        let image64 = ''
                                        if (item.image) {
                                            image64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName + " " + item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.gender === 0 ? "Male" : "Female"}</td>

                                                <td>
                                                    <img
                                                        className="preview_image_account"
                                                        src={image64 ? image64 : avatar}
                                                        onClick={() => this.openPreviewImage(image64)}
                                                    />
                                                    {
                                                        this.state.isOpen === true &&
                                                        <Lightbox
                                                            mainSrc={this.state.previewImage}
                                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                                        />
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success px-3 mx-3"
                                                        onClick={() => this.handleEditAccount(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger px-3 mx-3"
                                                        onClick={() => this.handleDeleteAccount(item)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        role: state.admin.role,
        account: state.admin.account,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getAllAccount: () => dispatch(actions.getAllAccount()),
        deleteAccount: (id) => dispatch(actions.deleteAccount(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
