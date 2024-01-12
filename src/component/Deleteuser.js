import React, { useState } from 'react'
import NavbarReact from './Navbar'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../Global';
import { notification } from 'antd';
import "../style/accountdelete.css";

function Deleteuser() {
  const [confirmPassword,setConfirmpassword]=useState('');
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const validateuser = async ()=>{
    try{
    const token = localStorage.getItem('Authorization')
    const response = await axios.delete(`${API}/profile/delete-user`,{
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        password: confirmPassword,
      }),
    })
    if (response.status===200){
      openNotification('success', 'Deleted Successful', 'User Deleted successfully.');
      navigate('/');
    }
  }catch(error){
    console.error('Error Deleting user:', error.message);
  }

  }

  return (
    <div>
      <NavbarReact />
    <div className='account-delete'>
      <div className='delete-form'>
      <Form>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Password"
                  name="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmpassword(e.target.value)}
                  required
                />
      <Button  className='btn-del-account' variant="success" onClick={() => validateuser()}>Delete user</Button>
      </Form>
      </div>
    </div>
    </div>
  )
}

export default Deleteuser