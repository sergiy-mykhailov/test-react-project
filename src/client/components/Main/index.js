
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import CatalogList from '../CatalogList';

class Main extends Component {
  static defaultProps = {
    catalogList: {
      error: null,
      fetched: false,
      isFetching: true,
      data: [],
    },
    onAddProduct: () => {},
    onEditProduct: () => {},
    onDeleteProduct: () => {},
    onUpdateCatalog: () => {},
    onCreateCatalog: () => {},
  };
  static propTypes = {
    catalogList: PropTypes.shape({
      error: PropTypes.any,
      fetched: PropTypes.bool,
      isFetching: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
    onAddProduct: PropTypes.func,
    onEditProduct: PropTypes.func,
    onDeleteProduct: PropTypes.func,
    onUpdateCatalog: PropTypes.func,
    onCreateCatalog: PropTypes.func,
  };

  render() {
    const { catalogList, onEditProduct, onAddProduct, onDeleteProduct, onUpdateCatalog, onCreateCatalog } = this.props;

    return (
      <div>
        <Row>
          <Col span={24}>
            <CatalogList
              catalogList={catalogList}
              onAddProduct={onAddProduct}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
              onUpdateCatalog={onUpdateCatalog}
              onCreateCatalog={onCreateCatalog}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
