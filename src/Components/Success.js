import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Loading from './Loading';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleUpvote = (index) => {
        const updatedCards = [...filteredCards];
        updatedCards[index].upvotes= 1-updatedCards[index].upvotes;
        setFilteredCards(updatedCards);
    };

    useEffect(() => {
        setLoader(true);

        const fetchData = async () => {
            try {
                const token = Cookies.get('authToken');
                console.log(token);

                const response = await fetch(`${process.env.REACT_APP_URL}/user/data/success`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.error('Failed to fetch stories', response);
                    return;
                }

                const data = await response.json();
                const initializedCards = data.map(item => ({ ...item, upvotes: 0 }));
                setCards(initializedCards);
                setFilteredCards(initializedCards);
            } catch (error) {
                console.error(error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = cards.filter(card =>
            (card.title && card.title.toLowerCase().includes(query)) ||
            (card.description && card.description.toLowerCase().includes(query)) ||
            (card.userName && card.userName.toLowerCase().includes(query))
        );

        setFilteredCards(filtered);
    };

    const getProfile = (userName) => {
        navigate(`/getProfile/${userName}`);
    };

    const addElement = () => {
        navigate(`/addFeed`);
    };

    return (
        <div className='container'>
            {loader ? (
                <Loading />
            ) : (
                <>
                    <Navbar />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <button className='btn btn-primary' style={{ margin: '18px 0px' }} onClick={addElement}>
                            Add Feed
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title, description, or username..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{
                                width: '50%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                            }}
                        />
                    </div>
                    <style>
                        {`
                            * {
                                font-family: 'Noto Sans', sans-serif;
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }

                            .container_03 {
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: center;
                                padding: 5px;
                                gap: 20px;
                            }

                            .card:hover {
                                transform: translateY(-5px);
                                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
                            }

                            .card img {
                                width: 6%;
                                height: 44px;
                                object-fit: cover;
                            }

                            .card {
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                overflow: hidden;
                                width: 74%;
                                margin-bottom: 20px;
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

                            .name {
                                font-size: 16px;
                                font-weight: bold;
                                margin: 0;
                                cursor: pointer;
                            }

                            .card-body {
                                padding: 15px;
                                text-align: center;
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
                                    width: 100%;
                                    max-width: 95%;
                                }
                            }
                        `}
                    </style>
                    <div className='container_03'>
                        {filteredCards.map((element, index) => (
                            <div className="card" key={index}>
                                <div className="card-header">
                                    <img
                                        className="profile-pic"
                                        src='https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-600x475.png'
                                        alt="Profile"
                                    />
                                    <div className="profile-info">
                                        <h5
                                            className="name"
                                            onClick={() => getProfile(element.userName)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {element.userName}
                                        </h5>
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
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Success;
