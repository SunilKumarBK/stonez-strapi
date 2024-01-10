import React, { useState } from 'react';
import { Card, CardActions, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidemenubar.css';
import { lists } from './Lists'
import Grid from '../SidemenuComponent/Menu1/Grid/Grid';
import { faArrowRight, faBars, faPalette } from '@fortawesome/free-solid-svg-icons';
import Menu2 from '../SidemenuComponent/Menu2/Menu2';
import ImageGallery from '../SidemenuComponent/Menu3/ImageGallery';
import NavbarDashboard from './NavbarDashboard';
import Profile from '../SidemenuComponent/Menu4/profile';
import { Link } from 'react-router-dom';





const Sidemenubar = () => {
    console.log('Sidemenubar component rendered');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [activeItem, setActiveItem] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }
    const handleItemClick = (index) => {
        setActiveItem(index);
        console.log(index);
    }
    const components = [
        <Grid key={0} />,
        <Menu2 key={1} />,
        <ImageGallery key={2} />,
        <Profile key={3} />,
    ];
    
    return (
        <div className={`container`}>
            <FontAwesomeIcon icon={faBars} className='togglebutton' onClick={toggleSidebar}/>

            <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>

  
                <Card className="sidebarcard" style={{}}>
                    <CardContent className='cardcontent' style={{ padding: '0' }}>
                        {lists.map((data, index) => (
                            <div key={data.id} className={`list-item ${index === activeItem ? 'active' : ''}`} style={{ cursor: 'pointer' }} >
                                <div style={{width: '25%'}}><FontAwesomeIcon icon={data.icon}  /></div>
                                <div style={{ display: isSidebarCollapsed ? 'none' : 'block', width: "100%" }}>
                                    <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} onClick={() => handleItemClick(index)}>{data.name}<div>{index === activeItem && <FontAwesomeIcon icon={faArrowRight} />}</div></div>
                                </div>
                            </div>
                        ))}
                    </CardContent>

                    <CardActions style={{ width: '100%',borderTop: '1px solid gray', }}>
                        {isSidebarCollapsed ? (
                            <div style={{ gap: '5px', marginTop: 'auto', fontSize: '10px',  width: '100%', padding: '5px', display: 'flex', justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faPalette}/>
                            </div>
                        ) : (
                            <div style={{ gap: '5px', marginTop: 'auto', fontSize: '10px',  width: '100%', padding: '5px', display: 'flex', justifyContent: 'center' }}>
                                Powered by <h3>Stonez</h3>
                            </div>
                        )}
                    </CardActions>
                </Card>
            </div>

            <div className="rightcontent">
                <div style={{ height: '100%' }}>
                {components[activeItem]}
                    {/* {activeItem === 0 && <Grid />}
                    {activeItem === 1 && <Menu2 />}
                    {activeItem === 2 && <ImageGallery />}
                    {activeItem === 3 && <Profile/>} */}

                    
                </div>
            </div>
        </div>
    );
};

export default Sidemenubar;
