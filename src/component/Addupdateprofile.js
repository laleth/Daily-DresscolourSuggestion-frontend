import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { API } from '../Global';
import { notification } from 'antd';
import '../style/addupdateProfile.css';
import NavbarReact from './Navbar';

function Addupdateprofile() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    stylePreferences: [],
    favoriteColors: [],
    handbagColor: [],
    watch: [],
    shoes: [],
  });

  const stylePreferenceOptions = ["Casual", "Formal"];

  const [colorOptions] = useState([
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown",
    "Black", "White", "Gray", "Cyan", "Magenta", "Lime", "Teal", "Indigo",
    "Violet", "Maroon", "Olive", "Navy", "Aquamarine", "Turquoise", "Silver"
  ]);

  const [selectedDressColors, setSelectedDressColors] = useState([]);
  const [selectedShoeColors, setSelectedShoeColors] = useState([]);
  const [selectedWatchColors, setSelectedWatchColors] = useState([]);
  const [selectedBagColors, setSelectedBagColors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStylePreferenceChange = (selectedStyle) => {
    setFormData({
      ...formData,
      stylePreferences: selectedStyle,
    });
  };


  const handleColorChange = (selectedColor, setSelectedColors) => {
    setSelectedColors((prevColors) => [...prevColors, selectedColor]);
  };

  const createColorInputSection = (label, selectedColors, setSelectedColors) => (
    <div className="mb-3 col-md-6">
      <div className='colorfield-allign'>
        <div className='color-field-label'>
      <label htmlFor={`${label.toLowerCase()}Color`} className="form-label">
        {label} Color
      </label>
      </div>
      <Form.Control
        type="text"
        className="form-control mt-2"
        id={`${label.toLowerCase()}Color`}
        name={label.toLowerCase()}
        value={selectedColors.join(', ')}
        readOnly
      />
      <div className='select-color-drop'>
      <Dropdown onSelect={(selectedColor) => handleColorChange(selectedColor, setSelectedColors)}>
        <Dropdown.Toggle variant="success" id={`dropdown-${label.toLowerCase()}`}>
          Select Colors
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {colorOptions.map((color, index) => (
            <Dropdown.Item key={index} eventKey={color}>
              {color}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      </div>
      </div>
    </div>
  );

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const createStylePreferenceDropdown = () => (
    <div className="mb-3 col-md-6">
      <div className='stylepreff-name-allign'> 
      <label htmlFor="stylePreferences" className="form-label">
        StylePreference
      </label>
      <Form.Control
        type="text"
        className="form-control mt-2"
        id="stylePreferences"
        name="stylePreferences"
        value={formData.stylePreferences}
        readOnly
      />
      <div className='toggle-allign'>
      <div className='select-style-drop'>
      <Dropdown onSelect={(selectedStyle) => handleStylePreferenceChange(selectedStyle)}>
        <div className='name-style'>
        <Dropdown.Toggle variant="success" id="dropdown-stylePreferences">
          Select Style
        </Dropdown.Toggle>
        </div>
        <Dropdown.Menu>
          {stylePreferenceOptions.map((style, index) => (
            <Dropdown.Item key={index} eventKey={style}>
              {style}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      </div>
      
      </div>
      </div>
    </div>
  );

  const validateUserDetails = async (event) => {
    try {
      event.preventDefault();

      const { name, age, stylePreferences } = formData;
      const favoriteColors = selectedDressColors;
      const shoes = selectedShoeColors;
      const watch = selectedWatchColors;
      const handbagColor = selectedBagColors;

  

      const token = localStorage.getItem('Authorization');
      const res = await axios.put(`${API}/profile/update-profile`, {
        name,
        age,
        stylePreferences,
        favoriteColors,
        handbagColor,
        watch,
        shoes,
      },{
        headers: {
          Authorization: `${token}`,
        },
      }
      
      );
      
      if (res.status === 200) {
        console.log("Profile updated successfully");
        openNotification('success', 'Profile Updated Successfull', 'You have successfully your Profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      openNotification('error', 'Profile update Error', 'There was an error during update.');
    }
  };

  return (
    <div className='add-update-profile'>
      <NavbarReact/>
    <div className="container dash1 txt">
      <div className='profile'>
      <h1>Profile</h1>
      <form className="row g-3">
        <div className='add-update-profile'>
          <div className='form-style'>
            <div className="col-12">
              <Form.Group controlId="name">
                <div className='name-allign'>
                  <Form.Label>Name</Form.Label>
                </div>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <div className="col-12">
              <Form.Group controlId="age">
                <div className='age-allign'>
                  <Form.Label>Age</Form.Label>
                </div>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
          </div>
         <div className='flex-drop'>
          <span className="inline-block-container">
            <div className="col-12 col-md-6">
              {createStylePreferenceDropdown()}
            </div>
            <div className="col-12 col-md-6">
              {createColorInputSection("Dress", selectedDressColors, setSelectedDressColors)}
            </div>
            <div className="col-12 col-md-6">
              {createColorInputSection("Shoe", selectedShoeColors, setSelectedShoeColors)}
            </div>
            <div className="col-12 col-md-6">
              {createColorInputSection("Watch", selectedWatchColors, setSelectedWatchColors)}
            </div>
            <div className="col-12 col-md-6">
              {createColorInputSection("Bag", selectedBagColors, setSelectedBagColors)}
            </div>
          </span>
          </div>

          <div className="col-md-12">
            <Button
              className="btn-save"
              onClick={(event) => validateUserDetails(event)}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Addupdateprofile;
