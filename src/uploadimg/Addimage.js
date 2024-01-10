import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, MenuItem } from '@blueprintjs/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { compress } from 'image-conversion';
import Selectfile from '../inputfield/selectfile';
import './Addimage.css';
import { Select } from '@mui/material';
import axios from 'axios';
import apiUrl from '../Api/ApiUrl';

const Addimage = (onChange) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedfile, setSelectedfile] = useState({name:'',image:null});
    const [errorMsg, setErrorMsg] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const fileInputRef = useRef(null);
    const [categoryIndex, setCategoryIndex] = useState('');



    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log(file,'file');
       



        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                try {
                    const compressedFile = await compress(file, { quality: 0.7, size: 2 });
                    setSelectedfile({name:category,image:compressedFile});
                    setErrorMsg('Image was compressed to 2MB');
                    setTitle(file.name);
                    setIsDialogOpen(true);
                } catch (error) {
                    setErrorMsg('Image compression failed');
                }
            } else {
                setSelectedfile({name:category,image:file});
                setErrorMsg('');
                setTitle(file.name);
                setIsDialogOpen(true);
            }
        }
    };
    console.log(selectedfile,'selectedfileafterfileupload');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        const selectedIndex = options.findIndex((option) => option.value === event.target.value);

        // Set the index to the state variable
        setCategoryIndex(selectedIndex + 1);
        setSelectedfile({name:event.target.value,image:selectedfile.image});
       

        
    };
   
    console.log(category, 'category');
    console.log(categoryIndex, 'categoryindex');
    console.log(selectedfile, 'selectedfile');
    console.log(selectedfile,'selectedfileaftervalueupload');


    const handleFormSubmit = async (event) => {
        console.log('datas', selectedfile)
        event.preventDefault();
    
    
        if (!category || !selectedfile.name || !selectedfile.image || category !== selectedfile.name) {
          alert('Please select a category, provide a name, and choose an image.');
          return;
        }
        // if (categoryIndex !== id) {
        //   alert('please choose a correct category');
        //   setDialogOpen(false);
    
        // }
    
        if (!category) {
          console.error('Selected category is not defined');
          return;
        }
    
     
    
    
        const formData = new FormData();
        formData.append('data', JSON.stringify({
          name: selectedfile.name,
        }));
    
        if (selectedfile.image) {
          formData.append('files.image', selectedfile.image);
    
        }
        console.log('datatosend', selectedfile);
    
    
        try {
          const response = await axios.put(`${apiUrl}/api/more-images/${categoryIndex}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setIsDialogOpen(false);
    
        //   const updatedImages = await axios.get(`${apiUrl}/api/more-images?populate=*`);
        //   setLowerRow(updatedImages.data.data);
    
          console.log('Post successful:', response.data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedfile(null);
        setErrorMsg('');
        setTitle('');
    };

    const options = [

        { value: 'Exterior', label: 'Exterior' },
        { value: 'Interior', label: 'Interior' },
        { value: 'Models', label: 'Models' },
    ];


    // const handleSave = async (e) => {
    //     e.preventDefault();

    //     if (!selectedfile) {
    //         console.error('No file selected.');
    //         return;
    //     }

    //     try {
    //         // const formData = new FormData();
    //         // formData.append('files',selectedfile({
    //         //     image:selectedfile
    //         // }));

    //         // console.log('FormData before posting:', formData);

    //         const response = await axios.put(`http://localhost:1337/api/more-images/${categoryIndex}`,formData);

    //         console.log('Data posted successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error posting data:', error);
    //     }
    // };



    return (
        <>
            <button className="uploadimgbtn" onClick={() => fileInputRef.current.click()}>
                <p>Upload Image</p>
            </button>

            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg"
            />

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                className="dialog"
                canOutsideClickClose={false}
                canEscapeKeyClose={false}
            >
                <FontAwesomeIcon icon={faTimes} onClick={handleCloseDialog} className="close" alt="close" />
                <div className="bp3-dialog-body">
                    <form className='form'>
                        <h1>Add File Details</h1>
                        <div className='first-label'>
                            <label className="title">{title ? title : 'Document Name'}</label>
                        </div>



                        <Select className="select-file" options={options} onChange={handleCategoryChange}>
                            {options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <div style={{ height: '20px', fontSize: '10px', color: 'red', gap: '5px' }}>{errorMsg}</div>


                        <div className='second-label'>
                            <label className='documentname-text'>Document Name</label>

                        </div>
                        <div className='third-label' >
                            <label className='document-description-text'>Document Description</label>
                        </div>
                        <div className='footer'>
                            <button className='savebtn' onClick={handleFormSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
};

export default Addimage;