
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Row, Col, Button, List, Spin, Card } from 'antd';
import IconPlus from 'react-icons/lib/fa/plus';
import './style.less';

class CatalogList extends Component {
    static defaultProps = {
        catalogList: {
            error: null,
            fetched: false,
            isFetching: true,
            data: [],
        },
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
    };

    renderList = () => {
        const { data } = this.props.catalogList;

        return (
            <List
                grid={{ gutter: 16, sm: 2, md: 4 }}
                dataSource={data}
                renderItem={this.renderListItem}
            />
        );
    };

    renderListItem = (item) => {
        // return (
        //     <List.Item onClick={this.handleClick}>
        //         {item.name}
        //     </List.Item>
        // );

        return (
            <List.Item>
                <Card title={item.name}>Card content</Card>
            </List.Item>
        );
    };

    render() {
        const { fetched } = this.props.catalogList;

        return (
            <div>
                <div className="catalogListWrapper">
                    {/*<Row gutter={24} className="catalogListHeader">*/}
                        {/*<Col span={18}>*/}
                            {/*<h3>Catalog list</h3>*/}
                        {/*</Col>*/}
                        {/*<Col span={6}>*/}
                            {/*<Button shape="circle"><IconPlus /></Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
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
