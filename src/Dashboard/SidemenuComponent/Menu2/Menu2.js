import React, { useEffect, useState } from 'react';
import { Button, Dialog, InputGroup } from '@blueprintjs/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Menu2.css';
import axios from 'axios';
import apiUrl from '../../../Api/ApiUrl';


const Card = ({ title, children, height, width, className, cities, onAddButtonClick, onSelectButton }) => {
  const [selectedItem, setSelectedItem] = useState('Coimbatore');
  const [isAddDistrictDialogOpen, setAddDistrictDialogOpen] = useState(false);
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [newDistrictName, setNewDistrictName] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [city, setCity] = useState([]);
  const [newCity, setNewCity] = useState(
    {
      name: ''
    }
  )

  useEffect(() => {
    axios.get(`${apiUrl}/api/cities?populate=*`)
      .then((res) => {
        console.log(res.data);
        setCity(res.data.data)
      })
  }, [isAddDistrictDialogOpen])
  console.log(city)


  const cardStyle = {
    height: `${height}%`,
    width: `${width}%`,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    // margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 238, 213, 0.79)',
    overflowY: 'auto',
    position: 'relative',
  };

  const containerStyle = {
    maxHeight: `${height}px`,
  };

  const addDistrictStyle = {
    position: 'absolute',
    bottom: '60px',
  };


  const handleAddDistrictClick = () => {
    setAddDistrictDialogOpen(true);
  };


  const handleAddDistrictDialogClose = () => {
    setAddDistrictDialogOpen(false);
    setNewDistrictName('');
  };

  const handleAddProjectDialogClose = () => {
    setAddProjectDialogOpen(false);
    setNewProjectName('');
  };

  const handleAddDistrictConfirm = () => {
    console.log('Posting data:', newCity);
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({ name: newCity.name }));


    // Make sure to update the API endpoint and the authorization token
    axios.post(`${apiUrl}/api/cities`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Add any additional headers as needed, e.g., authentication headers
      },
    })
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        // Optionally, you can reset the form or close the dialog here
        setAddDistrictDialogOpen(false)
        setNewCity({
          name: ''
        });
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };


  const handleAddProjectConfirm = () => {
    if (newProjectName.trim() !== '') {
      handleAddProjectDialogClose();
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.value;
    setNewCity((prevData) => ({
      ...prevData,
      name
    }));
    // }
  };



  return (
    <div style={cardStyle} className={className}>
{/* <h2>Distrit</h2> */}
<h1 className='h1'>{title}</h1>
      <div className="card-header customscrollbar" style={{height:'100%'}}>
        {children}
        {title === 'District' && (
          <>
            <div className="district-buttons" style={containerStyle}>
              {Array.isArray(city) && city?.map((cityy) => (
                <button
                  key={cityy.id}
                  className={`leftCard ${selectedItem === cityy.attributes.name ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedItem(cityy.attributes.name);
                    onSelectButton(cityy.attributes.name);
                  }}
                >
                  {cityy.attributes.name}
                </button>
              ))}
            </div>
            <div className='addDepartmentText' style={addDistrictStyle}>
              <p className="add-department" onClick={handleAddDistrictClick}>
                Add District
                <AddCircleOutlineIcon style={{ color: '#0067ff', marginLeft: '5px', fontSize: '18px', marginTop: '3px' }} className='projectPlusIcon1' />
              </p>
            </div>
          </>
        )}

        {title === 'Project' && (
          <>

          </>
        )}
      </div>

      {/* Add District Dialog */}
      <Dialog
        isOpen={isAddDistrictDialogOpen}
        onClose={handleAddDistrictDialogClose}
        title="Add District"
        canEscapeKeyClose={true}
        canOutsideClickClose={false}
      >
        <div className="bp4-dialog-body" style={{width:'100%',padding:'20px'}}>
          <label style={{ width:'100%'}}>
            <InputGroup
              type="text"
              // value={newCity.name}
              onChange={handleInputChange}
              placeholder='Enter district name'
            />
          </label>
        </div>
        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <Button onClick={handleAddDistrictDialogClose} className='cancelbtn'>Cancel</Button>
            <Button onClick={handleAddDistrictConfirm} className='confrimbtn'>Confirm</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};


const Menu2 = () => {
  const [selectedButton, setSelectedButton] = useState('Coimbatore');
  const [cities, setCities] = useState(['Coimbatore', 'Ramnad', 'Madurai', 'Chennai', 'Trichy']);
  const [projects, setProjects] = useState(['Project 1', 'Project 2']);
  const [newProjectName, setNewProjectName] = useState({ projectname: '', projectCity: '',city:'' });
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [project, setProject] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/cities?populate=*`)
      .then((res) => {
        setProject(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
      });
  }, [isAddProjectDialogOpen]);

  const handleInputChange = (e) => {
    const project = e.target.value;
    setNewProjectName((prevData) => ({ ...prevData, project }));
  };
  



  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    const selectedCityId = project.find((cityy) => cityy.attributes.name === buttonName)?.id;
    setNewProjectName((prevData) => ({ ...prevData, city: selectedCityId }));
    
  };
  console.log('selectedButooooooon',selectedButton)

  const handleAddProjectDialogClose = () => {
    setAddProjectDialogOpen(false);
    setNewProjectName({ projectname: '', projectCity: '' });
  };

  const handleAddProjectConfirm = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      projectname: newProjectName.project,
      city: newProjectName.city,
    }));

    axios.post(`${apiUrl}/api/projects`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        console.log('city', newProjectName.city)
        setAddProjectDialogOpen(false);
        setNewProjectName({ projectname: '', projectCity: '' });
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div className="dashboard">
      <h4>District</h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          padding: '5px',
          gap: '10px',
        }}>
        <Card
          title="District"
          className="leftCard"
          height={100}
          width={25}
          cities={cities}
          onAddButtonClick={(newCity) => setCities([...cities, newCity])}
          onSelectButton={handleButtonClick}
        />

        <Card title="Project" className="rightCard" height={100} width={75} cities={projects}>
          {/* <button> */}
            {project
              .filter((data) => selectedButton === data.attributes.name)
              .map((datas) => (
                <div key={datas.id}>
                  
                  {datas.attributes.projects?.data?.map((item) => (
                    <button>
                    <p key={item.id}>{item.attributes.projectname}</p>
                    </button>
                  ))}
                  
                </div>
              ))}
          {/* </button> */}

          <div className='addproject'>
            <p className="add-project" onClick={() => setAddProjectDialogOpen(true)}>
              Add Project
              <AddCircleOutlineIcon style={{ color: '#0067ff', marginLeft: '5px', fontSize: '18px', marginTop: '3px' }} className='projectPlusIcon1' />
            </p>
          </div>

          <Dialog
            isOpen={isAddProjectDialogOpen}
            onClose={handleAddProjectDialogClose}
            title="Add Project"
            canEscapeKeyClose={true}
            canOutsideClickClose={false}
          >
            <div className="bp2-dialog-body" style={{padding:'20px'}}>
              <label>
                <InputGroup
                  type="text"
                  onChange={handleInputChange}
                  placeholder='Enter project name'
                />
              </label>
              
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <Button onClick={handleAddProjectDialogClose} className='cancelbtn'>Cancel</Button>
                <Button onClick={handleAddProjectConfirm} className='confrimbtn'>Confirm</Button>
              </div>
            </div>
          </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default Menu2;
