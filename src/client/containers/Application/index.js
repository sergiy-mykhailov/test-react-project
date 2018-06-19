
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import Header from '../Header';
import Main from '../Main';
import PageNotFound from '../PageNotFound';
import { ROUTES_MAP } from '../../constants';


class Application extends Component {
    render() {
        return (
            <main>
                <Row type="flex" justify="center" >
                    <Col md={24} lg={22} xl={20} xxl={18}>

                        <Route path={ROUTES_MAP.main} component={Header} />

                        <Switch>
                            <Route exact path={ROUTES_MAP.main} component={Main} />

                            <Route component={PageNotFound} />
                        </Switch>

                    </Col>
                </Row>
            </main>
        );
    }
}

export default Application;