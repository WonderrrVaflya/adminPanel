import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StorePage from './pages/StorePage';
import { Col, Row } from 'antd';

const App: React.FC = () => {
  return (
    <Router>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores/:ID" element={<StorePage />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
