import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';  

const Prep = () => {
  const navigate = useNavigate();  
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState({});

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/prep`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.log(response);
          return;
        }

        const data = await response.json();
        setCards(data.topics[0].topics);
        console.log(cards);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, []);

  const handleCollapseToggle = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getContent = (title) => {
    console.log(title);
    navigate(`/prepDetail/${title}`); 
  };

  return (
    <>
      <style>
        {`
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .card {
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          background-color: #fff;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        .card-img-top {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-bottom: 1px solid #ddd;
        }

        .card-body {
          padding: 15px;
          text-align: center;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .card-text {
          font-size: 1rem;
          color: #555;
          margin: 10px 0;
        }

        .btn-container {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 10px;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .card-subtopics {
          text-align: left;
          margin-top: 10px;
        }

        .card-subtopics ul {
          list-style-type: disc;
          padding-left: 20px;
          color: #555;
        }

        @media (max-width: 768px) {
          .card {
            width: 100%;
            margin-bottom: 20px;
          }

          .btn-container {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}
      </style>

      <Navbar />
      <div className="card-container">
        {cards.map((element, index) => (
          <div className="card" style={{ width: '18rem' }} key={index}>
            <img className="card-img-top" src={element.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{element.title}</h5>
              <p className="card-text">{element.description}</p>
              <div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleCollapseToggle(index)} 
                >
                  {open[index] ? 'Hide Subtopics' : 'Show Subtopics'}
                </button>

                <button className='btn btn-primary my-2 mx-2' onClick={() => getContent(element.title)}>
                  Prepare
                </button>
              </div>
              <Collapse in={open[index]}>
                <div className="card-subtopics">
                  <ul>
                    {element.subtopics && element.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex}>{subtopic}</li>
                    ))}
                  </ul>
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Prep;
