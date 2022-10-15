import React, { Component } from "react";
  
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Category.scss";
import { Button, Table } from "reactstrap";
import CurrencyFormat from "react-currency-format";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalEditCategory from "./ModalEditCategory";
import CategoryDataGrid from "./CategoryDataGrid";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      isOpen: false,
      category: [],
      categoryEdit: {},
    };
  }
  componentDidMount() {
    this.props.getCategory("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.category !== this.props.category) {
      this.setState({
        category: this.props.category,
      });
    }
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

  handleCreateCategory = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleEditCategory = (category) => {
    this.setState({
      isOpenModalEdit: true,
      categoryEdit: category,
    });
  };
  handleDeleteCategory = (category) => {
    this.props.deleteCategory(category.id);
  };
  render() {
    let arrCategory = this.state.category;
    return (
      <div>
        <div className="title">Manage Category</div>
        <div className="section_body container">
          <ModalCreateCategory
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
          />
          <ModalEditCategory
            isOpen={this.state.isOpenModalEdit}
            toggleModal={this.toggleModalEdit}
            categoryEdit={this.state.categoryEdit}
          />
          <div className="content_header">
            <button
              onClick={() => this.handleCreateCategory()}
              className="button_create"
              style={{
                marginBottom: "1rem",
              }}
            >
              <i class="fas fa-plus"></i> Create new category
            </button>
          </div>
          <div className="content_body">
            <CategoryDataGrid />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     
    category: state.manager.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (id) => dispatch(actions.getCategory(id)),
    deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
