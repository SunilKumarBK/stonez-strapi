import React, { useEffect, useState } from 'react';
import { Dialog } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import './wspgallery.css';
import axios from 'axios';

const WSPGallery = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSubImageIndex, setSelectedSubImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/gallery-images?populate=*')
      .then((res) => {
        setImages(res.data.data);
      });
  }, []);

  const handleOpenModel = (index) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSubImageIndex(0);
    setSelectedImage(null);
  };

  const navigateImage = (step) => {
    setSelectedSubImageIndex((prevIndex) => {
      const totalSubImages = images[currentImageIndex]?.attributes?.images?.data?.length || 0;
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

  const currentSubImageIndex = selectedSubImageIndex + 1;
  const totalSubImages = images[currentImageIndex]?.attributes?.images?.data?.length || 0;

  return (
    <div>
      <div className='secondpage'>
        <h1 className='title1'><span>G</span>allery</h1>
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

          <div className="dialog-content">
            <p className="image-info">
              {currentSubImageIndex} / {totalSubImages}
            </p>

            <img
              // src={images[currentImageIndex]?.attributes?.images?.data[selectedSubImageIndex]?.attributes?.formats?.medium?.url || ''}
              src={`http://localhost:1337${images[currentImageIndex]?.attributes?.images?.data?.[selectedSubImageIndex]?.attributes?.formats?.medium?.url || ''}`}
              alt=""
              className="dialog-image large-image with-border"
            />
            <div className="right-content">
              {images[currentImageIndex]?.attributes?.images?.data?.map((subImage, index) => (
                <div
                  className={`subimage-container ${index === selectedSubImageIndex ? 'selected' : ''}`}
                  key={index}
                >
                  <img
                    src={`http://localhost:1337${subImage.attributes?.formats?.thumbnail?.url || ''}`}
                    alt=""
                    className={`dialog-image ${index === selectedSubImageIndex ? 'large-image' : ''}`}
                    onClick={() => handleSubImageClick(index)}
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

      <div className="galleryWrap">
        {images.map((item, index) => (
          <div
            className="single"
            key={index}
            onClick={() => handleOpenModel(index)}
          >
            <img
              src={`http://localhost:1337${item.attributes?.images?.data[0]?.attributes?.formats?.large?.url || ''}`}
              alt=""
            />
            <div className="image-overlay">
              <FontAwesomeIcon icon={faPlus} className="fa-icon" />
            </div>
            <div className="image-name">{item.attributes?.name || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WSPGallery;
