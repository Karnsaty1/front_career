import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GetProfile = () => {
  const { userName } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/getProfile/${userName}`);
        if (!response.ok) {
          console.error('Error fetching profile data:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log(data);
        setCards(data.data || []);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    }
    fetchData();
  }, [userName]);

  const handleUpvote = (index) => {
    const updatedCards = [...cards];
    const currentUpvotes = updatedCards[index].upvotes || 0; 
  updatedCards[index].upvotes = 1-currentUpvotes;
    setCards(updatedCards);
  };

  return (
    <div className="container">
      <style>
        {`
          * {
            font-family: 'Noto Sans', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .container_03 {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            background-color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
          }

          .card-header {
            display: flex;
            align-items: center;
            padding: 10px;
          }

          .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .profile-info {
            display: flex;
            flex-direction: column;
          }

          .name {
            font-size: 16px;
            font-weight: bold;
            margin: 0;
          }

          .card-body {
            padding: 15px;
          }

          .card-title {
            font-size: 18px;
            font-weight: bold;
          }

          .card-footer {
            padding: 10px;
            text-align: center;
            background-color: #f1f1f1;
            border-top: 1px solid #ddd;
          }

          .upvote-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }

          .upvote-button:hover {
            background-color: #45a049;
          }

          @media (max-width: 768px) {
            .card {
              max-width: 95%;
            }
          }
        `}
      </style>
      <div className="container_03">
        {cards.length > 0 ? (
          cards.map((element, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <img
                  className="profile-pic"
                  src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-600x475.png"
                  alt="Profile"
                />
                <div className="profile-info">
                  <h5 className="name">{element.userName}</h5>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{element.title}</h3>
                <h6>{element.description}</h6>
              </div>
              <div className="card-footer">
                <button className="upvote-button" onClick={() => handleUpvote(index)}>
                  👍 Upvote {element.upvotes}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default GetProfile;
