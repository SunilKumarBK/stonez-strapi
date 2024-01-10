import React, { useEffect, useState } from 'react';

import Navbar from './navbar/Navbar';

import WSPGallery from './galleryimg/WSPGallery';
import Moreimage from './moreimg/Moreimage';
import './App.css';
import Addimage from './uploadimg/Addimage';
import axios from 'axios';



function Apphome() {
  const [moreImages, setMoreImages] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:1337/api/more-images?populate=*')
      .then((res) => {
        setMoreImages(res.data.data)
      })

  }, [])
  console.log(moreImages);
  const ExteriorImages = moreImages.filter((item)=>item.attributes.name === 'Exterior');
  console.log(ExteriorImages,'exterior')


  
  const handleCategoryChange = (category) => {
    if (category === 'exteriors') {
    } else if (category === 'interiors') {
    } else if (category === 'models') {
    }
  };




  return (
    <div>
      <Navbar />

      <div>


        <WSPGallery />
        <Addimage />


      </div>

      <div>
        <Moreimage category="exteriors"
          // exteriorsImages={exteriorsImages}
          // interiorsImages={interiorsImages}
          // modelsImages={modelsImages}
          moreImages={moreImages}
          handleCategoryChange={handleCategoryChange}
        />
      </div>

    </div>

  );
};

export default Apphome;