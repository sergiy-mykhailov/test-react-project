
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Main from '../../components/Main';
import { getCatalogList, addProduct, editProduct } from '../../redux/actions/CatalogListActions';
// import { getCatalog } from '../../redux/actions/CatalogActions';

class MainContainer extends Component {
    static defaultProps = {
        CatalogListStore: {
            error: null,
            fetched: false,
            isFetching: true,
            data: [],
        },
        // CatalogStore: {
        //     error: null,
        //     fetched: false,
        //     isFetching: true,
        //     data: [],
        // },
        getCatalogList: () => {},
        editProduct: () => {},
        addProduct: () => {},
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
        // CatalogStore: PropTypes.shape({
        //     error: PropTypes.any,
        //     fetched: PropTypes.bool,
        //     isFetching: PropTypes.bool,
        //     data: PropTypes.arrayOf(PropTypes.shape({
        //         item: PropTypes.string,
        //         cost: PropTypes.number,
        //     })),
        // }),
        getCatalogList: PropTypes.func,
        editProduct: PropTypes.func,
        addProduct: PropTypes.func,
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.getCatalogList();
    };

    // getCatalog = () => {
    //     this.props.getCatalog();
    // };

    render() {
        const { CatalogListStore, editProduct, addProduct } = this.props;

        return (
            <Main
                catalogList={CatalogListStore}
                // CatalogStore={CatalogStore}
                onAddProduct={addProduct}
                onEditProduct={editProduct}
            />
        );
    }
}

export default connect(
    store => ({
        CatalogListStore: store.CatalogListStore,
        // CatalogStore: store.CatalogStore,
    }),
    dispatch => (bindActionCreators({ getCatalogList, addProduct, editProduct }, dispatch)),
)(MainContainer);
