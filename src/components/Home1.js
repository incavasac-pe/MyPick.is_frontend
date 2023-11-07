import React, { useState } from 'react';
import MenuFlotante from "./MenuFlotante";
import Home from "./Home";
import TrendingTopics from "./TrendingTopics";
import MyBookmarks from "./MyBookmarks";
import MyPicks from "./MyPicks";

const Home1 = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>

            <div className="menu">
                <div className="pc menu-float">
                    <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
                        <i className="fas fa-home-lg-alt"></i>
                    </button>
                    <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
                        <i className="fas fa-chart-line"></i>
                    </button>
                    <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
                        <i className="far fa-bookmark"></i>
                    </button>
                    <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
                        <i className="fas fa-box"></i>
                    </button>
                </div>
                <div className="movil menu-float-movil">
                    <div className="fondoboton">
                        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
                            <i className="fas fa-home-lg-alt"></i>
                        </button>
                        <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
                            <i className="fas fa-chart-line"></i>
                        </button>
                        <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
                            <i className="far fa-bookmark"></i>
                        </button>
                        <button onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
                            <i className="fas fa-box"></i>
                        </button>
                    </div>
                </div>

            </div>

            <div>
                {activeTab === 1 &&
                <div>
                    <Home/>
                </div>
                }
                {activeTab === 2 &&
                <div>
                    <TrendingTopics/>
                </div>
                }
                {activeTab === 3 &&
                <div>
                    <MyBookmarks/>
                </div>
                }
                {activeTab === 4 &&
                <div>
                    <MyPicks/>
                </div>
                }
            </div>
            <MenuFlotante/>
        </div>
    );
};

export default Home1;
