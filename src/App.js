import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';
import TrendingTopics from './components/TrendingTopics';
import MyBookmarks from './components/MyBookmarks';
import MyPicks from './components/MyPicks';
import FAQs from './components/FAQs';
import Menu from './components/menu';
import MyProfile from './components/user/MyProfile';
import ActivateAccount from './components/ActivateAccount';
import ResetPassword from './components/ResetPassword';

const App = () => { 
  return (
    <Router>
      <div className="container-fluid">
        <header>
          <Menu />
        </header>
        <Sidebar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TrendingTopics" element={<TrendingTopics />} />
            <Route path="/MyBookmarks" element={<MyBookmarks />} />
            <Route path="/MyPicks" element={<MyPicks />} />

            <Route path="/about" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/activate" element={<ActivateAccount />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
