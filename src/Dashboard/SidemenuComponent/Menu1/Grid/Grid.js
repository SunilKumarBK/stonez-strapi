import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Dialog, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faEllipsisVertical, faMultiply, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import moment from 'moment';
import axios from 'axios';
import { boxdata } from '../../../DashboardComponent/Lists';
import './Grid.css';
import MyTable from '../Table/Table';
import apiUrl from '../../../../Api/ApiUrl';
import myImage from './233-2332677_ega-png.png';
import { FaPen, FaTrash } from 'react-icons/fa';

const Grid = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  const [newPostData, setNewPostData] = useState({
    name: '',
    title: '',
    titleDescription: '',
    image: null,
    postedTime: '',
  });
  const [currentIndex, setCurrentIndex] = useState();
  const [showOption, setShowOption] = useState(false);
  const [imagePreview, setImagePreview] = useState(myImage);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);



  useEffect(() => {
    axios.get(`${apiUrl}/api/postdatas?populate=*`)
      .then((res) => {
        setPostData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
       
  }, [isDialogOpen]);

  console.log(currentIndex, 'currentpostindex')

  const image = postData;
  console.log(image, 'imagee')
  // const postedTime = moment().format();
  const formatTime = (time) => {
    const momentTime = moment(time);
    const hoursDiff = moment().diff(momentTime, 'hours');

    return hoursDiff <= 24
      ? momentTime.fromNow() // Use fromNow for hours
      : momentTime.format('MMM D'); // Custom format for days
  };

  const handleIconClick = (id) => {
    setShowOption(!showOption);
    setCurrentIndex(id);

  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // setNewPostData({ 'postedTime': postedTime })
    if (name === 'image' && files && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
    //  else {
    //   setImagePreview(myImage);

    // }



    setNewPostData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  console.log('newpost;', newPostData)
  // console.log('Posting data:', newPostData.postedTime);


  const handlePostData = () => {
    console.log('Posting data:', newPostData);

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      name: newPostData.name,
      title: newPostData.title,
      titleDescription: newPostData.titleDescription,
      postedTime: moment().toISOString(),
    }));

    if (newPostData.image) {
      formDataToSend.append('files.image', newPostData.image);
    }
    console.log('formdata', formDataToSend)


    // axios.put(`${apiUrl}/api/postdatas/${currentIndex}`, formDataToSend, {
    axios.post(`${apiUrl}/api/postdatas`, formDataToSend, {


      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        setIsDialogOpen(false);
        setNewPostData({
          name: '',
          title: '',
          titleDescription: '',
          image: null,
          postedTime: ''
        });
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  const handleEditData = () => {
    console.log('Posting data:', newPostData);

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      // name: newPostData.name,
      name: (newPostData && newPostData.name) ? newPostData.name : (
        (postData && postData.attributes && postData.attributes.name) ? postData.attributes.name[currentIndex] : undefined
      ),

      // title: newPostData.title,
      // titleDescription: newPostData.titleDescription,
      title: (newPostData && newPostData.title) ? newPostData.title : (
        (postData && postData.attributes && postData.attributes.title) ? postData.attributes.title[currentIndex] : undefined
      ),
      titleDescription: (newPostData && newPostData.titleDescription) ? newPostData.titleDescription : (
        (postData && postData.attributes && postData.attributes.titleDescription) ? postData.attributes.titleDescription[currentIndex] : undefined
      ),
      postedTime: moment().toISOString(),
    }));

    if (newPostData.image) {
      formDataToSend.append('files.image', newPostData.image);
    } else if (postData && postData.attributes && postData.attributes.image && postData.attributes.image.data && postData.attributes.image.data.attributes && postData.attributes.image.data.attributes.url) {
      // If there is no new image, use the existing image URL
      const existingImageURL = postData.attributes.image.data.attributes.url;
      formDataToSend.append('files.image', existingImageURL);
    }


    console.log('formdata', formDataToSend)


    axios.put(`${apiUrl}/api/postdatas/${currentIndex}`, formDataToSend, {
      // axios.post(`${apiUrl}/api/postdatas`, formDataToSend, {


      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        setIsDialogOpen(false);
        setNewPostData({
          name: '',
          title: '',
          titleDescription: '',
          image: null,
          postedTime: ''
        });
        setShowOption(!showOption);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  const handleDeleteClick = () => {
    // setDeletingIndex(index);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleDelete = () => {
    if (currentIndex) {
      axios.delete(`${apiUrl}/api/postdatas/${currentIndex}`)
        .then((res) => {
          console.log('Data deleted successfully:', res.data);
          setIsDialogOpen(false);
          setNewPostData({
            name: '',
            title: '',
            titleDescription: '',
            image: null,
            postedTime: ''
          });
          setCurrentIndex(null); // Reset currentIndex after deleting
          setShowOption(!showOption); // Close the options
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    }
  };


  const DialogClose = () => {
    setIsDialogOpen(false);
    setImagePreview(myImage);
  };


  return (
    <Box className='grid'>
      {boxdata.map((data, index) => (
        <Card className='box box1' key={index}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ position: 'relative' }}><h3 style={{ color: '#ecb725' }}>{data.title}</h3></div>
          </div>
          <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: '#ecb725' }}>
            <div><FontAwesomeIcon icon={data.icon} style={{ fontSize: '30px', marginTop: '20px', color: 'black' }} /></div>
            <div style={{ fontSize: '50px' }}>{data.stats}</div>
          </div>
        </Card>
      ))}

      <Card className='box box4'>
        <div style={{ textAlign: 'left' }}>
          <h3>Events & Announcements</h3>
        </div>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: "relative", gap: '10px' }} >
          <div style={{ color: 'gray', opacity: '0.8' }}> <FontAwesomeIcon icon={faBookBookmark} style={{ fontSize: '50px' }} /></div>
          <div><h3>No Events Found</h3></div>
        </div>
      </Card>

      <Dialog style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }} open={isDialogOpen}>
        <form className='boxFourDialog' style={{ display: 'flex', width: '450px', alignItems: 'center', flexDirection: 'column', gap: '10px', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%', borderBottom: '2px solid gold', marginBottom: '10px', position: 'relative', left: '2%' }}>
            <h2>Make a  Post</h2>
            <FontAwesomeIcon icon={faMultiply} onClick={DialogClose} />
          </div>



          <TextField style={{ width: '85%' }} size='small' variant='outlined' label='Name' type='text' placeholder='enter your name' name='name' value={newPostData.name} onChange={handleInputChange} />
          <TextField style={{ width: '85%' }} size='small' variant='outlined' label='Title' type='text' placeholder='title' name='title' value={newPostData.title} onChange={handleInputChange} />
          <TextField style={{ width: '85%' }} size='small' variant='outlined' label='TitleDesccription' type='text' placeholder='titleDescription' name='titleDescription' value={newPostData.titleDescription} onChange={handleInputChange} />
          <TextField style={{ width: '85%' }} size='small' variant='outlined' type='file' name='image' onChange={handleInputChange} />

          <div style={{width: "40%",height:'8em',display: 'flex',justifyContent:' center', border: '1px dashed black'}}>          
           {imagePreview && (
              <img
                src={imagePreview?imagePreview:myImage}
                alt="Image Preview"
                style={{ height:'100%',width: '50%', borderRadius: '5px' }}
              />
            )}
          </div>
          {/* <Button onClick={handlePostData}>Post Data</Button> */}
          <Button onClick={currentIndex ? handleEditData : handlePostData}>
            {currentIndex ? 'Edit Data' : 'Post Data'}
          </Button>
        </form>
      </Dialog>




      <Card className='box box5'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3>Recent Posts</h3></div>
          <div><button onClick={() => setIsDialogOpen(true)} style={{ width: 'fit-content', gap: '5px', padding: '10px', color: 'white', border: 'none', borderRadius: '2px', display: 'flex', backgroundColor: 'rgb(236, 183, 37)' }}><FontAwesomeIcon icon={faPlusCircle} /><span>Create a post</span></button></div>
        </div>
        <div className='customscrollbar'>
          {postData.map((datas, index) => (
            <Card
              key={datas.id}
              style={{
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: 'whitesmoke',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <Avatar
                      name={datas.attributes.name ? datas.attributes.name.charAt(0).toUpperCase() : ''}
                      size={50}
                      style={{ fontSize: '30px' }}
                      round={true}
                    />
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                      <h3>{datas.attributes.name}{datas.id}</h3>
                      <p style={{ marginTop: '2%' }}>{formatTime(datas.attributes.postedTime)}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ textAlign: 'left', marginTop: '2%' }}>{datas.attributes.title}</h3>
                    <p style={{ marginTop: '0' }}>{datas.attributes.titleDescription}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    gap: '5px',
                    width: '65%',
                    height: 'fit-content',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* {datas.attributes.image.data.map((item) => ( */}
                  <img
                    src={`${apiUrl}${datas.attributes.image.data.attributes.url}`}
                    alt={datas.attributes.name || 'Image'}
                    width={'40%'}
                  />
                  {/* ))}  */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'end',
                      gap: '5px',
                      // width: '65%',
                      height: 'fit-content',
                      alignItems: 'flex-start',
                      position: 'relative',
                    }}
                  >
                    {/* <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => {setCurrentIndex(datas.id);setIsDialogOpen(true);handleIconClick}} /> */}
                    <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => handleIconClick(datas.id)} />

                    {showOption && currentIndex === datas.id && (
                      <ul className="postoption" style={{position: "absolute",background: 'white',right:' 0px',top: '20px',textAlign:'justify',padding: '10px',gap: '5px',display: 'flex',boxShadow:'0 0 2px'}}>
                        <li onClick={() => setIsDialogOpen(true)}><FaPen/></li><hr></hr>
                        <li onClick={handleDeleteClick}><FaTrash/></li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Dialog open={showDeleteDialog} onClose={handleCancelDelete} title="Confirm Delete">
        <div>
          Are you sure you want to delete this image?
        </div>
        <div>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </div>
      </Dialog>

      <Card className='box box6'>
        <div style={{ textAlign: 'left', with: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>Timings</h3>
          <MyTable style={{}} />
        </div>
      </Card>
    </Box>
  );
};

export default Grid;
