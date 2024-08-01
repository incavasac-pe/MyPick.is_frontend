import React, { useState } from 'react';
import MenuFlotante from "./MenuFlotante";
import Home from "./Home";
import TrendingTopics from "./TrendingTopics";
import MyBookmarks from "./MyBookmarks";
import MyPicks from "./MyPicks";

const Home1 = (props) => { 
    const id = props.idCat;  
    console.log("home1idCat",id)
    const [activeTab, setActiveTab] = useState(1);
    const [origin, setOrigin] = useState(false);
  

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
        setOrigin(true)
    };
    const handleButtonClick = (eventName) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: eventName,
          event_category: 'User',
          event_action: 'Click',
          event_label: eventName
        });
      };
    return (
        <div>

            <div className="menu">
                <div className="pc menu-float">
                    <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
                        <i className="fas fa-home-lg-alt"  onClick={() =>  handleButtonClick('Home')}></i>
                    </button>
                    <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
                        <i className="fas fa-chart-line" onClick={() =>  handleButtonClick('Trending')}></i>
                    </button>
                    <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
                        <i className="far fa-bookmark" onClick={() =>  handleButtonClick('MyBookmark')}></i>
                    </button>
                    <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
                        <i className="fas fa-box"  onClick={() =>  handleButtonClick('MySubmission')}></i>
                    </button>
                </div>
                <div className="movil menu-float-movil">
                    <div className="fondoboton">
                        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
                            <i className="fas fa-home-lg-alt"></i>
                        </button>
                        <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
                            <i className="fas fa-chart-line" onClick={() =>  handleButtonClick('Trending')}></i>
                        </button>
                        <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
                            <i className="far fa-bookmark"  onClick={() =>  handleButtonClick('MyBookmark')}></i>
                        </button>
                        <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
                            <i className="fas fa-box" onClick={() =>  handleButtonClick('MySubmission')}></i>
                        </button>
                    </div>
                </div>

            </div>

            <div>
                {activeTab === 1 &&
                <div>
                    <Home origin={origin}   />
                </div>
                }
                {activeTab === 2 &&
                <div>
                    <TrendingTopics idCat={id}/>
                </div>
                }
                {activeTab === 3 &&
                <div>
                    <MyBookmarks idCat={id}/>
                </div>
                }
                {activeTab === 4 &&
                <div>
                    <MyPicks idCat={id}/>
                </div>
                }
            </div>
            <MenuFlotante/>
        </div>
    );
};

export default Home1;
