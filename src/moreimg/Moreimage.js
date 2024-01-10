import React, { useState } from 'react';
import { Dialog } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Moreimage.css';
import { Card } from '@mui/material';

const Moreimage = ({ category, moreImages, handleCategoryChange }) => {
  const categories = {
    exteriors: moreImages.filter((item) => item.attributes.name === 'Exterior'),
    interiors: moreImages.filter((item) => item.attributes.name === 'Interior'),
    models: moreImages.filter((item) => item.attributes.name === 'Models'),
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSubImageIndex, setSelectedSubImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const handleOpenModel = (index) => {
    handleCategoryChange(selectedCategory);
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSubImageIndex(0);
  };

  const images = categories[selectedCategory];
  console.log('images', images)
  // console.log(images[images.attributes.image.data].length,'imglen')

  if (!images || currentImageIndex >= images.length) {
    return <div>No images available for this category.</div>;
  }
  // const navigateImage = (step) => {
  //   setSelectedSubImageIndex(0); // Reset sub-image index when changing images
  
  //   setCurrentImageIndex((prevIndex) => {
  //     const totalImages = images.length;
  
  //     if (totalImages <= 1) {
  //       return prevIndex; // No need to navigate if there is only one image
  //     }
  
  //     let nextIndex = prevIndex + step;
  
  //     if (nextIndex < 0) {
  //       nextIndex = totalImages - 1;
  //     } else if (nextIndex >= totalImages) {
  //       nextIndex = 0;
  //     }
  
  //     return nextIndex;
  //   });
  // };
  
  
  const navigateImage = (step) => {
    setSelectedSubImageIndex((prevIndex) => {
      const totalSubImages = images[currentImageIndex]?.attributes?.image?.data.length || 0;
      const currentIndex = prevIndex + step;

      if (currentIndex < 0) {
        return 0;
      } else if (currentIndex >= totalSubImages) {
        return totalSubImages - 1;
      }

      return currentIndex;
    });
  };
  



  const handleSubImageClick = (index) => {
    setSelectedSubImageIndex(index);
  };
  console.log(selectedSubImageIndex, 'subselesubin')

  const currentSubImageIndex = selectedSubImageIndex + 1;
  // const totalSubImages = images[currentImageIndex].subImages ? images[currentImageIndex].subImages.length : 0;
  // const totalSubImages = images[currentImageIndex]?.attributes?.image?.data?.[0]?.formats?.thumbnail?.url
  // ? images[currentImageIndex].attributes.image.data[0].formats.thumbnail.url.length
  // : 0;

  const totalSubImages = images[currentImageIndex]?.attributes?.image?.data.length || 0;


  console.log(currentSubImageIndex, 'csi')
  console.log(totalSubImages, 'tsi')
  return (
    <div>
      <div className='thirdpage' style={{}}>
        <h1 className='moreimage-title2'><span>M</span>ore <span>I</span>mages</h1>
        <div className='logo1'>
          <img src={require("../images/construct.png")} alt='Logo' />
        </div>
      </div>

      {isDialogOpen && (
        <Dialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          className="dialog-container"
          isCloseButtonShown={false}
        >
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleCloseDialog}
            className="closeicon"
            alt="close"
          />

          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            onClick={() => navigateImage(-1)}
            className={`lefticon ${selectedSubImageIndex === 0 ? 'disabled' : ''}`}
          />

// Inside the dialog-content div
          <div className="dialog-content" style={{width:'50%',alignItems:'center',display:'flex'}}>
            <p className="image-info">
              {selectedSubImageIndex + 1} / {totalSubImages}
            </p>
            <div>
              {images[currentImageIndex]?.attributes?.image?.data[selectedSubImageIndex] && (
                <img
                  src={`http://localhost:1337${images[currentImageIndex].attributes.image.data[selectedSubImageIndex].attributes.url}`}
                  alt="selected"
                  className="dialog-image large-image with-border"
                />
              )}
            </div>
            <div className="right-content">
              {images[currentImageIndex]?.attributes?.image?.data.map((img, index) => (
                <div
                  className={`subimage-container ${index === selectedSubImageIndex ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleSubImageClick(index)}
                >
                  <img
                    src={`http://localhost:1337${img.attributes.url}`}
                    alt={`sub-image-${index}`}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>

          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            onClick={() => navigateImage(1)}
            className={`righticon ${selectedSubImageIndex === totalSubImages - 1 ? 'disabled' : ''}`}
          />
        </Dialog>
      )}
      

      <div className="category-buttons">
        <button className={selectedCategory === 'exteriors' ? 'selected' : ''} onClick={() => setSelectedCategory('exteriors')}>Exteriors</button>
        <button className={selectedCategory === 'interiors' ? 'selected' : ''} onClick={() => setSelectedCategory('interiors')}>Interiors</button>
        <button className={selectedCategory === 'models' ? 'selected' : ''} onClick={() => setSelectedCategory('models')}>Models</button>
      </div>

      <div className="galleryWrapp" >
        {images.map((category, categoryIndex) => (
          <div className="singlee" key={categoryIndex} onClick={() => handleOpenModel(categoryIndex)} style={{ display: 'grid', gridTemplateColumns: 'repeat(3 , 1fr)' }}>

            {category.attributes?.image?.data.map((img, imgIndex) => (
              <Card className='cardimg' style={{ height: '100%', display: 'flex', width: '100%', }}>
                <><img key={imgIndex} style={{ objectFit: 'cover', width: '100%' }} src={`http://localhost:1337${img.attributes.url}`} alt="hi" />
                </></Card>
            ))}

          </div>
        ))}


      </div>

      <footer className='footerpage'>
        <div className='logoimg'>
          <img className='round-background' src="https://stonez.co.in/img/stonez.ico" />
        </div>
        <div className='copyrightstext'>
          <p >Copyright ©2019 Stonez. All Rights Reserved</p>
        </div>
        <div className='htreekimg'>
          <p>Powered by -
            <a href='#'>
              <img src='https://stonez.co.in/img/htreek.ico' />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Moreimage;
