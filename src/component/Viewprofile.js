import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarReact from './Navbar';
import { API } from '../Global';
import '../style/viewprofile.css';

const ProfileDetails = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/profile/profile-details`, {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserProfile(response.data.userProfile);
        }
      } catch (error) {
        console.log('Error getting user details:', error.message);
      }
    };

    getProfileDetails();
  }, []);

  return (
    <div>
      <NavbarReact />
      <div className="prof-container">
        {userProfile ? (
          <div className="profile-details-container">
            <h2 className='Profile-head'>Profile Details</h2>
            <div className='profile-info'>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Name:</strong> {userProfile.name || 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Age:</strong> {userProfile.age || 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Style Preferences:</strong>{' '}
                {userProfile.stylePreferences
                  ? userProfile.stylePreferences.join(', ')
                  : 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Favorite Colors:</strong>{' '}
                {userProfile.favoriteColors
                  ? userProfile.favoriteColors.join(', ')
                  : 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Handbag Color:</strong>{' '}
                {userProfile.handbagColor
                  ? userProfile.handbagColor.join(', ')
                  : 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Watch Colors:</strong>{' '}
                {userProfile.watch ? userProfile.watch.join(', ') : 'N/A'}
              </p>
              <p>
                <strong style={{ color: 'rgb(231, 165, 78)' }}>Shoe Colors:</strong>{' '}
                {userProfile.shoes ? userProfile.shoes.join(', ') : 'N/A'}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading profile details...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
