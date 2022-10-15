import React, { Component } from "react";
  
  
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Catalog.scss";
import { Button, Table } from "reactstrap";
import CurrencyFormat from "react-currency-format";
import ModalCreateCatalog from "./ModalCreateCatalog";
import ModalEditCatalog from "./ModalEditCatalog";
import CatalogDataGrid from "./CatalogDataGrid";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenModalEdit: false,
      isOpen: false,
      catalog: [],
      catalogEdit: {},
    };
  }
  componentDidMount() {
    this.props.getCatalog("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.catalog !== this.props.catalog) {
      this.setState({
        catalog: this.props.catalog,
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

  handleCreateCatalog = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleEditCatalog = (catalog) => {
    this.setState({
      isOpenModalEdit: true,
      catalogEdit: catalog,
    });
  };
  handleDeleteCatalog = (catalog) => {
    this.props.deleteCatalog(catalog.id);
  };
  render() {
    let arrCatalog = this.state.catalog;
    return (
      <div>
        <div className="title">Manage Catalog</div>
        <div className="section_body container">
          <ModalCreateCatalog
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
          />
          <ModalEditCatalog
            isOpen={this.state.isOpenModalEdit}
            toggleModal={this.toggleModalEdit}
            catalogEdit={this.state.catalogEdit}
          />
          <div className="content_header">
            <button
              onClick={() => this.handleCreateCatalog()}
              className="button_create"
              style={{
                marginBottom: "1rem",
              }}
            >
              <i class="fas fa-plus"></i> Create new catalog
            </button>
          </div>
          <div className="content_body">
            <CatalogDataGrid />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     
    catalog: state.manager.catalog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: (id) => dispatch(actions.getCatalog(id)),
    deleteCatalog: (id) => dispatch(actions.deleteCatalog(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
