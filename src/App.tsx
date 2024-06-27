import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StorePage from './pages/StorePage';
import { Col, Row, Tabs } from 'antd';

const App: React.FC = () => {
  return (
    <Router>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Tabs defaultActiveKey="2" style={{ marginBottom: '20px' }}>
            <Tabs.TabPane tab={<Link to="/search">Поисковик</Link>} key="1" />
            <Tabs.TabPane tab={<Link to="/">Магазины</Link>} key="2" />
          </Tabs>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores/:id" element={<StorePage />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
