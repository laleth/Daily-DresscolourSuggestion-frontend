import React, { useState, useEffect } from 'react';
import NavbarReact from './Navbar';
import axios from 'axios';
import { API } from '../Global';
import "../style/home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Carouselreact from './Carousel';
import { notification } from 'antd';

function Home() {
  const [suggestedColors, setSuggestedColors] = useState([]);
  const [todaysSuggestion, setTodaysSuggestion] = useState(null);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };
  

  const suggestColor = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.post(`${API}/profile/dress-color-suggestion`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        fetchHistory();
      } else {
        console.error('Failed to suggest color. Status:', response.status);
      }
    } catch (error) {
      console.error('Error suggesting color:', error.message);
      openNotification('error', 'Error suggesting color', 'Please create the profile.');
    }
  }

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.get(`${API}/profile/dress-color-suggestion/history`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const history = response.data.userHistory;
        setSuggestedColors(history);

        if (history.length > 0) {
          const lastEntry = history[history.length - 1];
          setTodaysSuggestion(lastEntry);
        } 
      } 
    } catch (error) {
      console.error('Error getting history:', error.message);
    }
  }

  const deleteHistory = async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await axios.delete(`${API}/profile/dress-color-suggestion/history`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        setSuggestedColors([]);
        setTodaysSuggestion(null);
        console.log("History Deleted");
      }

    } catch (error) {
      console.error('Error Deleting history:', error.message);
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {  
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    fetchHistory();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [])

  return (
    <div>
      <NavbarReact />
      <Carouselreact />
      {todaysSuggestion && (
        <div>
          <div className='heading'>
          Today's dress color suggestion is:
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Dress Color</th>
                <th>Handbag Color</th>
                <th>Watch</th>
                <th>Shoes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Today</td>
                <td>
                {todaysSuggestion.SuggestedDressColor}
                  <span className="color-indicator" style={{ backgroundColor: todaysSuggestion.SuggestedDressColor }}></span>                 
                </td>
                <td>
                {todaysSuggestion.SuggestedHandbagColor}
                  <span className="color-indicator" style={{ backgroundColor: todaysSuggestion.SuggestedHandbagColor }}></span>                 
                </td>
                <td>
                {todaysSuggestion.SuggestedWatchColor}
                  <span className="color-indicator" style={{ backgroundColor: todaysSuggestion.SuggestedWatchColor }}></span>                  
                </td>
                <td>
                {todaysSuggestion.SuggestedShoe}
                  <span className="color-indicator" style={{ backgroundColor: todaysSuggestion.SuggestedShoe }}></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {suggestedColors.length > 1 && (
        <div>
          <div className='heading'>
          History:
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Days</th>
                <th>Dress Color</th>
                <th>Handbag Color</th>
                <th>Watch</th>
                <th>Shoes</th>
              </tr>
            </thead>
            <tbody>
              {suggestedColors.map((color, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{color.SuggestedDressColor}
                  <span className="color-indicator" style={{ backgroundColor: color.SuggestedDressColor }}></span></td>
                  <td>{color.SuggestedHandbagColor}
                  <span className="color-indicator" style={{ backgroundColor: color.SuggestedHandbagColor }}></span></td>
                  <td>{color.SuggestedWatchColor}
                  <span className="color-indicator" style={{ backgroundColor: color.SuggestedWatchColor }}></span></td>
                  <td>{color.SuggestedShoe}
                  <span className="color-indicator" style={{ backgroundColor: color.SuggestedShoe }}></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className='suggest' onClick={() => suggestColor()}>Suggest Color</button>
      <button className='delete' onClick={() => deleteHistory()}>Delete Data</button>
    </div>
  );
}

export default Home;
