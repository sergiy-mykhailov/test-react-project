
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import IconSad from 'react-icons/lib/io/sad-outline';

class PageNotFoundContainer extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={6} style={{ marginTop: 16 }}>
            <Card title="Page not found !">
              <IconSad size={240} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageNotFoundContainer;
