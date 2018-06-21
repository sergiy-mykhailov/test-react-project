
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, List, Spin, Card } from 'antd';
import EditableTable from '../EditableTable';
import './style.less';

class CatalogList extends Component {
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
        data: PropTypes.array,
      })),
    }),
    onAddProduct: PropTypes.func,
    onEditProduct: PropTypes.func,
    onDeleteProduct: PropTypes.func,
    onUpdateCatalog: PropTypes.func,
    onCreateCatalog: PropTypes.func,
  };

  renderList = () => {
    const { data } = this.props.catalogList;

    return (
      <List
        grid={{ gutter: 16, sm: 1, md: 2 }}
        dataSource={data}
        renderItem={this.renderListItem}
      />
    );
  };

  renderListItem = (item) => {
    const { onAddProduct, onEditProduct, onDeleteProduct, onUpdateCatalog, onCreateCatalog } = this.props;

    return (
      <List.Item>
        <Card title={item.name}>
          <EditableTable
            catalog={item}
            onAddProduct={onAddProduct}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
            onUpdateCatalog={onUpdateCatalog}
            onCreateCatalog={onCreateCatalog}
          />
        </Card>
      </List.Item>
    );
  };

  render() {
    const { fetched } = this.props.catalogList;

    return (
      <div>
        <div className="catalogListWrapper">
          <Row gutter={24}>
            <Col span={24}>
              {(fetched) ? this.renderList() : <Spin />}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CatalogList;
