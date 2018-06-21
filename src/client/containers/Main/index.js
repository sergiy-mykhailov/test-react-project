
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Main from '../../components/Main';
import {
  getCatalogList, addProduct, editProduct, deleteProduct, updateCatalog, createCatalog,
} from '../../redux/actions/CatalogListActions';

class MainContainer extends Component {
  static defaultProps = {
    CatalogListStore: {
      error: null,
      fetched: false,
      isFetching: true,
      data: [],
    },
    getCatalogList: () => {},
    editProduct: () => {},
    addProduct: () => {},
    deleteProduct: () => {},
    updateCatalog: () => {},
    createCatalog: () => {},
  };
  static propTypes = {
    CatalogListStore: PropTypes.shape({
      error: PropTypes.any,
      fetched: PropTypes.bool,
      isFetching: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
    getCatalogList: PropTypes.func,
    editProduct: PropTypes.func,
    addProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
    updateCatalog: PropTypes.func,
    createCatalog: PropTypes.func,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.getCatalogList();
  };

  render() {
    const {
      CatalogListStore, editProduct, addProduct, deleteProduct, updateCatalog, createCatalog,
    } = this.props;

    return (
      <Main
        catalogList={CatalogListStore}
        onAddProduct={addProduct}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}
        onUpdateCatalog={updateCatalog}
        onCreateCatalog={createCatalog}
      />
    );
  }
}

export default connect(
  store => ({
    CatalogListStore: store.CatalogListStore,
  }),
  dispatch => (bindActionCreators({
    getCatalogList, addProduct, editProduct, deleteProduct, updateCatalog, createCatalog,
  }, dispatch)),
)(MainContainer);
