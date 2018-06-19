
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import CatalogList from '../CatalogList';
import Catalog from '../Catalog';
import PropTypes from "prop-types";

class Main extends Component {
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

    render() {
        const { catalogList, catalog, onCatalogSelect } = this.props;

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <CatalogList catalogList={catalogList}/>
                    </Col>
                    {/*<Col span={18}>*/}
                        {/*<Catalog catalog={catalog} />*/}
                    {/*</Col>*/}
                </Row>
            </div>
        );
    }
}

export default Main;
