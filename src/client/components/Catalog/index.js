
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';


class Catalog extends Component {
    static defaultProps = {
        catalog: {
            error: null,
            fetched: false,
            isFetching: true,
            data: [],
        },
    };
    static propTypes = {
        catalog: PropTypes.shape({
            error: PropTypes.any,
            fetched: PropTypes.bool,
            isFetching: PropTypes.bool,
            data: PropTypes.arrayOf(PropTypes.shape({
                item: PropTypes.string,
                cost: PropTypes.number,
            })),
        }),
    };

    render() {
        return (
            <div className="catalogWrapper">
                <Row>
                    <Col span={24}>
                        <div>Catalog</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Catalog;
