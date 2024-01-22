import React,  {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Home1 from './components/Home1';
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
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import SearchResults from "./components/SearchResults";
const App = () => {
  const [id, setIdcategory] = useState(''); 
  const [searchTerm, setsearchTerm] = useState('');  

  const handleMenuDataChange = (newMenuData) => { 
    console.log("newMenuData",newMenuData) 
    setIdcategory(newMenuData.id)
    setsearchTerm(newMenuData.searchTerm) 
    
  };

  
  return (
    
    <Router>
      <div className="container-fluid">
        <header>
          <Menu  onMenuDataChange={handleMenuDataChange}   />
        </header>
        <Sidebar />
        <Routes> 
           <Route path="/pick" element={<Home1 idCat={id}  />} />
            <Route path="/" element={<Home1 idCat={id}  />} />
            <Route path="/SearchResults" element={<SearchResults search={searchTerm}  />} />
            <Route path="/TrendingTopics" element={<TrendingTopics  idCat={id} name={''} />} />
            <Route path="/MyBookmarks" element={<MyBookmarks idCat={id}  />} />
            <Route path="/MyPicks" element={<MyPicks idCat={id} />} />

            <Route path="/about" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/activate" element={<ActivateAccount />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
