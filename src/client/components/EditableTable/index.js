
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Table, Button, Popconfirm, Modal } from 'antd';
import EditableCell from '../EditableCell';

class EditableTable extends Component {
  static defaultProps = {
    catalog: {
      id: '',
      name: '',
      data: [],
    },
    onAddProduct: () => {},
    onEditProduct: () => {},
    onDeleteProduct: () => {},
    onUpdateCatalog: () => {},
    onCreateCatalog: () => {},
  };
  static propTypes = {
    catalog: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        item: PropTypes.string,
        cost: PropTypes.number,
      })),
    }),
    onAddProduct: PropTypes.func,
    onEditProduct: PropTypes.func,
    onDeleteProduct: PropTypes.func,
    onUpdateCatalog: PropTypes.func,
    onCreateCatalog: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataHistory: [cloneDeep(props.catalog.data)],
      historyIndex: 0,
      visibleModal: false,
      selectedRowKeys: [],
    };

    this.columns = [
      {
        title: 'Item',
        dataIndex: 'item',
        width: '40%',
        render: (value, record) => (
          <EditableCell
            value={value}
            isNew={record.isNew}
            onChange={this.onCellChange(record.key, 'item')}
          />
        ),
      },
      {
        title: 'Cost',
        dataIndex: 'cost',
        width: '30%',
        render: (value, record) => (
          <EditableCell
            value={value}
            type={'number'}
            isNew={record.isNew}
            onChange={this.onCellChange(record.key, 'cost')}
          />
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            props.catalog.data.length > 1 ?
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                  {record.isNew ? <a href="javascript:;">Delete</a> : null}
                </Popconfirm>
              ) : null
          );
        },
      },
    ];
  }

  pushDataToHistory = () => {
    const { historyIndex } = this.state;
    const dataHistory = [...this.state.dataHistory];

    if (historyIndex < dataHistory.length - 1) {
      dataHistory.splice(historyIndex + 1);
    }
    dataHistory.push(cloneDeep(this.props.catalog.data));

    this.setState({ dataHistory, historyIndex: dataHistory.length - 1 });
  };

  getNewId = () => {
    return Math.random().toString(16).substr(2, 8);
  };

  onCellChange = (key, dataIndex) => {
    const { catalog, onEditProduct } = this.props;
    const catalogId = catalog.id;

    return (value) => {
      onEditProduct(catalogId, key, dataIndex, value).then(this.pushDataToHistory);
    };
  };

  onDelete = (key) => {
    const { catalog, onDeleteProduct } = this.props;

    onDeleteProduct(catalog.id, key).then(this.pushDataToHistory);
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleAdd = () => {
    const { catalog, onAddProduct } = this.props;
    const product = { key: this.getNewId(), item: '', cost: 0, isNew: true };

    onAddProduct(catalog.id, product).then(this.pushDataToHistory);
  };

  handleUndo = () => {
    const { catalog, onUpdateCatalog } = this.props;
    const { historyIndex, dataHistory } = this.state;

    if (historyIndex > 0) {
      onUpdateCatalog(catalog.id, dataHistory[historyIndex - 1]);

      this.setState({ historyIndex: historyIndex - 1 });
    }
  };

  handleRedo = () => {
    const { catalog, onUpdateCatalog } = this.props;
    const { historyIndex, dataHistory } = this.state;

    if (historyIndex < dataHistory.length - 1) {
      onUpdateCatalog(catalog.id, dataHistory[historyIndex + 1]);

      this.setState({ historyIndex: historyIndex + 1 });
    }
  };

  handleRebuild = () => {
    this.setState({ visibleModal: true });
  };

  handleModalOk = () => {
    const { selectedRowKeys } = this.state;
    const { catalog, onCreateCatalog } = this.props;

    const newCatalog = cloneDeep(catalog);
    newCatalog.name = `${newCatalog.name} (copy)`;
    newCatalog.id = this.getNewId();
    newCatalog.data = newCatalog.data.filter(item => selectedRowKeys.indexOf(item.key) !== -1);

    onCreateCatalog(newCatalog).then(() => {
      this.setState({ visibleModal: false, selectedRowKeys: [] });
    });
  };

  handleModalCancel = () => {
    this.setState({ visibleModal: false, selectedRowKeys: [] });
  };

  renderModalContent = () => {
    const { selectedRowKeys } = this.state;
    const { data } = this.props.catalog;
    const columns = [
      { title: 'Item', dataIndex: 'item', width: '60%' },
      { title: 'Cost', dataIndex: 'cost', width: '40%' },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <div>
        <Table
          bordered
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  };

  render() {
    const { data } = this.props.catalog;
    const { historyIndex, dataHistory, visibleModal } = this.state;
    const columns = this.columns;

    return (
      <div>
        <Button
          onClick={this.handleUndo}
          style={{ marginBottom: 16, marginRight: 16 }}
          disabled={historyIndex === 0}
        >
          Undo
        </Button>
        <Button
          onClick={this.handleRedo}
          style={{ marginBottom: 16 }}
          disabled={historyIndex === dataHistory.length - 1}
        >
          Redo
        </Button>

        <Table
          bordered
          dataSource={data}
          columns={columns}
          pagination={false}
        />

        <Button onClick={this.handleAdd} type="primary" style={{ marginTop: 16, marginRight: 16 }}>
          Add new row
        </Button>
        <Button onClick={this.handleRebuild} style={{ marginTop: 16, marginRight: 16 }}>
          Rebuild table
        </Button>

        <Modal
          title="Rebuild table"
          visible={visibleModal}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          okText="Save table"
        >
          {visibleModal ? this.renderModalContent() : null}
        </Modal>

      </div>
    );
  }
}

export default EditableTable;
