
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
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
    };
    static propTypes = {
        catalog: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            data: PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.number,
                item: PropTypes.string,
                cost: PropTypes.number,
            })),
        }),
        onAddProduct: PropTypes.func,
        onEditProduct: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Item',
            dataIndex: 'item',
            width: '40%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    isNew={record.isNew}
                    onChange={this.onCellChange(record.key, 'item')}
                />
            ),
        }, {
            title: 'Cost',
            dataIndex: 'cost',
            width: '30%',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    isNew={record.isNew}
                    onChange={this.onCellChange(record.key, 'cost')}
                />
            ),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            // render: (text, record) => {
            //     return (
            //         this.state.dataSource.length > 1 ?
            //             (
            //                 <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
            //                     <a href="javascript:;">Delete</a>
            //                 </Popconfirm>
            //             ) : null
            //     );
            // },
        }];
    }

    onCellChange = (key, dataIndex) => {
        const { catalog, onEditProduct } = this.props;
        const catalogId = catalog.id;

        return (value) => {
            console.log('onCellChange', catalogId, key, dataIndex, value);
            // const dataSource = [...this.state.dataSource];
            // const target = dataSource.find(item => item.key === key);
            // if (target) {
            //     target[dataIndex] = value;
            //     this.setState({ dataSource });
            // }

            onEditProduct(catalogId, key, dataIndex, value);
        };
    };

    onDelete = (key) => {
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { catalog, onAddProduct } = this.props;
        const count = catalog.data.length;

        const product = { key: count, item: '', cost: 0, isNew: true };

        onAddProduct(catalog.id, product);
    };

    render() {
        const { data } = this.props.catalog;
        const columns = this.columns;
console.log('catalog', this.props.catalog);

        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add new row
                </Button>

                <Table
                    bordered
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />
            </div>
        );
    }
}

export default EditableTable;
