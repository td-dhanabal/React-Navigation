import React from 'react';
import { Row, Col } from 'antd';
import SideMenu from '../sideMenu';

const Todo = () => {
    return (
        <Row gutter={16} style={{ margin: 0 }}>
            <Col className="gutter-row menuBody" style={{ height: '100vh' }} span={4} >
                <SideMenu />
            </Col>
            <Col className="gutter-row comming-soon-text" span={20} >
                <h3>Coming Soon....</h3>
            </Col>
        </Row>
    );
}

export default Todo;
