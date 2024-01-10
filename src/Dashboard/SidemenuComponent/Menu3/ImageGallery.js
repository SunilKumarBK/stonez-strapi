import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, MenuItem, Select, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';
import Addimage from '../../../uploadimg/Addimage';
import './ImageGallery.css';
import axios from 'axios';
import Selectfile from '../../../inputfield/selectfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import apiUrl, { deleteUrl } from '../../../Api/ApiUrl';


const ImageGallery = (index) => {
  const [selectedCategory, setSelectedCategory] = useState('Building');
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedImageInGallery, setSelectedImageInGallery] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [upperRow, setUpperRow] = useState([]);
  const [lowerRow, setLowerRow] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState('');
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [newImageName, setNewImageName] = useState('');
  const [imgId, setImgId] = useState('');
  const [editImageNameDialog, setEditImageNameDialog] = useState(false);
  const [editName, setEditName] = useState('');
  // 
  const [updatedImages, setUpdatedImages] = useState();
  // 

  // const [imgId,setImgId] = useState('');
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const previous = useRef("");


  const options = [
    { value: 'Interior', label: 'Interior' },
    { value: 'Building', label: 'Building' },
    { value: 'Exterior', label: 'Exterior' },
    { value: 'Module', label: 'Module' },

  ];
  // const [prevPostDataName, setPrevPostDataName] = useState('');

  const [postData, setPostData] = useState({
    name: '',
    image: null,
    imageName: '',
  });




  useEffect(() => {
    axios.get(`${apiUrl}/api/galleries?populate=*`).then((res) => {
      setUpperRow(res.data.data);
    });
    axios.get(`${apiUrl}/api/additional-Images?populate=*`).then((res) => {
      setLowerRow(res.data.data);
    });
  }, [dialogOpen, showDeleteDialog]);

  console.log('lowerrow', lowerRow)



  console.log('lowerrow', lowerRow);
  console.log(editName, 'editname');

  const handleCardClick = (category, index) => {
    setSelectedCategory(category);
    setId(index + 1);
    setSelectedImageIndex(index);
  };
  
  console.log('selectedcategory', selectedCategory);
  console.log('selectedcategoryindex', selectedImageIndex);
  console.log('id', id)


  const handleDeleteClick = (index) => {
    setDeletingIndex(index);
    setShowDeleteDialog(true);
  };
  console.log(deletingIndex, 'deletingindex')

  const handleEditClick = (index) => {
    setEditImageNameDialog(true);
    setEditingImageIndex(index);

  }
  console.log(editingImageIndex, 'editingimageindex')


  // ... (previous code)

  const handleConfirmDelete = async () => {
    try {
      const updatedImages = [...lowerRow];
      const categoryIndex = updatedImages.findIndex(item => item.attributes.name === selectedCategory);

      if (categoryIndex !== -1) {
        const categoryImages = updatedImages[categoryIndex];
        const updatedImageArray = categoryImages.attributes.image.data.filter((item, index) => index !== deletingIndex);

        // Construct the payload with only the necessary data to update
        const payload = {
          data: {
            // name:updatedImageArray.attributes.name,
            image: updatedImageArray,

          },
        };

        console.log('Payload:', payload);


        // Perform the PUT request to update the images in the database
        await axios.put(`${apiUrl}/api/additional-Images/${categoryImages.id}`, payload);

        // Update the local state with the modified images
        setLowerRow(updatedImages);
        setShowDeleteDialog(false);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  console.log('postData.name', postData.name);

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImageInGallery(image);
  };

  const handleAddSelectedImage = () => {
    if (selectedImageInGallery) {
      const newAdditionalImages = {
        ...lowerRow,
        [selectedCategory]: [...lowerRow[selectedCategory], URL.createObjectURL(selectedImageInGallery)],
      };

      setLowerRow(newAdditionalImages);
      setSelectedImageInGallery(null);
    }
  };

  const handledialog = () => {
    setDialogOpen(true);
  };


  const selectedCategoryIndex = selectedImageIndex + 1;
  console.log('sci', selectedCategoryIndex);


  console.log('sci', selectedCategoryIndex);

  const handleEditImageNameClick = (subIndex) => {
    setEditingImageIndex(subIndex);
    setNewImageName(lowerRow[selectedCategory][subIndex].attributes.name);
  };

  // ... (previous code)

  const handleEditImageName = async () => {
    try {
      const updatedImages = [...lowerRow];
      const categoryIndex = updatedImages.findIndex(item => item.attributes.name === selectedCategory);

      if (categoryIndex !== -1) {
        const categoryImages = updatedImages[categoryIndex];
        console.log(categoryImages, 'categoryimages')
        // const editingImage = categoryImages?.attributes?.image?.data[editingImageIndex];
        console.log('editingImageIndex:', editingImageIndex);
        const editingImage = categoryImages?.attributes?.image?.data[editingImageIndex];
        console.log(editingImage, 'editingimage')

        if (editingImage) {
          editingImage.attributes.name = editName;
          console.log(editingImage.attributes.name, ' editingImage.attributes.name')

          const payload = {
            data: {
              image: categoryImages.attributes.image.data,
            },
          };

          await axios.put(`${apiUrl}/api/additional-Images/${categoryImages.id}`, payload);

          setLowerRow(updatedImages);
          // 
          setUpdatedImages(categoryImages);
          // 
          setEditingImageIndex(null);
          setEditImageNameDialog(false);
        } else {
          console.error('Editing image is undefined');
        }
      }
    } catch (error) {
      console.error('Error updating image name:', error);
    }
  };
  // 
  console.log(updatedImages, 'updatedimagesstate')
  // ... (rest of the code)

  const handleCancelEditName = () => {
    setEditingImageIndex(null);
  };




  const handlecheck = () => {
    if (selectedCategoryIndex !== id) {
      alert('pleasechoose selected category');
      setDialogOpen(false)
    }
  }



  const handleFormSubmit = async (event) => {
    console.log('datas', postData)
    event.preventDefault();


    if (!selectedCategory || !postData.name || !postData.image || selectedCategory !== postData.name) {
      alert('Please select a category, provide a name, and choose an image.');
      return;
    }
    if (selectedCategoryIndex !== id) {
      alert('please choose a correct category');
      setDialogOpen(false);

    }

    if (!selectedCategory) {
      console.error('Selected category is not defined');
      return;
    }




    const formData = new FormData();
    formData.append('data', JSON.stringify({
      name: postData.name,
      imageName: postData.imageName,
    }));

    if (postData.image) {
      formData.append('files.image', postData.image);

    }
    console.log('datatosend', postData);


    try {
      const response = await axios.put(`${apiUrl}/api/additional-Images/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDialogOpen(false);

      const updatedImages = await axios.get(`${apiUrl}/api/additional-Images?populate=*`);
      setLowerRow(updatedImages.data.data);

      console.log('Post successful:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const renderAddImageCard = () => {
    if (selectedCategory) {
      return (
        <Card key="upload-image" className="additional-image-card">
          <div className='uploadimagebtn-gallery' style={{ alignItems: 'flex-end', display: 'flex' }}>
            <button style={{ width: '100%', height: '90%', background: 'transparent' }} className='' onClick={handledialog}><h4>Upload Image</h4></button>

            {/* <Addimage onImageSelect={handleImageSelect} onSave={handleAddSelectedImage} /> */}
            {/* <button onClick={setIsDialogOpen(true)}></button> */}
          </div>
          {selectedImageInGallery && (
            <Card key="selected-image" className="additional-image-card">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={URL.createObjectURL(selectedImageInGallery)}
                  alt={`Selected Image`}
                />
              </div>
            </Card>
          )}
        </Card>
      );
    }

    if (selectedImageIndex !== null) {
      const selectedImage = upperRow[selectedImageIndex];
      return (
        <Card
          key="selected-image"
          className="additional-image-card"
          style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        >
          <div className="image-container">
            <Card.Img
              variant="top"
              src={selectedImage.attributes.image.data.attributes?.url}
              alt={`Selected Image`}
            />
          </div>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="gallery-container">
      <div className="secondpage-gallery">
        <h1 className="title1-gallery" onClick={() => handleCardClick('interior')}>
          <span>G</span>alleryyy
        </h1>
      </div>

      <div className="upper-row">
        {upperRow.map((image, index) => (
          <Card
            key={image.id}
            className={`image-card ${index === selectedImageIndex ? 'selected' : ''}`}
            style={{
              border: index === selectedImageIndex ? '2px solid #ffd968' : 'none',
              boxShadow: index === selectedImageIndex ? ' 0 4px 6px 1px #ffe084' : 'none',
              borderRadius: '0px',
            }}
            onClick={() => handleCardClick(image.attributes.name, index)}
          >
            {/* {image.attributes.image.data.map((item)=>( */}
            <Card.Img
              variant="top"
              src={`${apiUrl}${image.attributes?.image.data?.attributes?.formats?.large?.url}`}
              alt={image.attributes.name}
              style={{ borderRadius: '0px' }}
            />
            {/* ))} */}
            <div className="image-name">{image.attributes.name}</div>
            <div className="image-caption">{image.attributes.caption}</div>
          </Card>
        ))}
      </div>

      <Dialog open={editImageNameDialog}>
        <TextField type='text' onChange={(e) => setEditName(e.target.value)} />
        <Button onClick={handleEditImageName}>submit</Button>
      </Dialog>


      <div className="lower-row customscrollbar">
        {selectedCategory &&
          (Array.isArray(lowerRow)
            ? lowerRow
              .filter((item) => item.attributes.name === selectedCategory)
              .map((categoryImages, index) =>
                categoryImages.attributes?.image.data.map((items, subIndex) => (
                  <Card key={subIndex} className="individual-image-card">
                    <div className="icon-container">
                      <div>
                        {/* {'Image' + '' + `${subIndex + 1}`} */}
                        {items.attributes.name}
                      </div>
                      <div style={{ gap: '5px', display: 'flex' }}>
                        {/* <FaPen className="pen-icon" /> */}
                        <FaPen className="pen-icon" onClick={() => handleEditClick(subIndex)} />
                        <FaTrash className="delete-icon" onClick={() => handleDeleteClick(subIndex)} />
                      </div>
                    </div>
                    <Card.Img
                      className="imgcard"
                      variant="top"
                      src={`${apiUrl}${items.attributes?.formats?.thumbnail?.url || ''}`}
                      alt={`Additional Image ${subIndex + 1}`} />
                  </Card>
                ))
              )
            : null)}
        {renderAddImageCard()}
      </div>


      <Dialog className='gallerydialog' open={dialogOpen}>
        <form className='gallerydialogform' onSubmit={handleFormSubmit} onChange={handlecheck}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><h4>Upload Image</h4><FontAwesomeIcon icon={faMultiply} onClick={() => setDialogOpen(false)} /></div>
          <Select
            size='small'
            value={postData.name}
            fullWidth
            variant='outlined'
            placeholder='select category'
            label='Select Category'
            onChange={(e) => {
              setPostData({ ...postData, name: e.target.value });
              // handlevalidate();
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField type="file" size='small' onChange={(e) => setPostData({ ...postData, image: e.target.files[0] })} />
          <TextField type='text' size='small' onChange={(e) => setPostData({ ...postData, imageName: e.target.value })} />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>

      <Dialog open={showDeleteDialog} onClose={handleCancelDelete} title="Confirm Delete">
        <div>
          Are you sure you want to delete this image?
        </div>
        <div>
          <Button onClick={handleConfirmDelete}>Delete</Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageGallery;

