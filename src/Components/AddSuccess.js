import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar';

const AddStory = () => {
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const onChangeStory = (e) => {
    setStory(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('authToken');
    const email = Cookies.get('email');
    const userName = Cookies.get('userName');
    console.log(userName);
    console.log(email);

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/user/data/addStory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ email, userName, title, description: story }),
      });

      if (!response.ok) {
        setError('Failed to add story.');
        return;
      }

      setThankYouMessage(true);
      setStory('');
      setTitle('');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="story-container">
        {thankYouMessage ? (
          <h2>Thank you for sharing your story! It's under review.</h2>
        ) : (
          <form className="story-form" onSubmit={onSubmit}>
            <h1 style={{ marginBottom: '40px' }}>Share Your Story</h1>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              value={title}
              onChange={onChangeTitle}
              className="title-input"
              placeholder="Story Title"
              required
            />
            <textarea
              value={story}
              onChange={onChangeStory}
              className="story-input"
              placeholder="Write your story here..."
              required
              rows="6"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}

        <style>
          {`
            .story-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              padding: 20px;
              background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
              font-family: 'Noto Sans', sans-serif;
            }

            .story-form {
              background: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              width: 100%;
              margin-bottom: 55px;
              max-width: 500px;
              text-align: center;
            }

            .story-form h1 {
              margin-bottom: 20px;
              font-size: 24px;
              color: #333;
            }

            .title-input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              font-size: 16px;
              margin-bottom: 20px;
            }

            .story-input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: none;
              font-size: 16px;
              margin-bottom: 20px;
            }

            .submit-button {
              background: #007bff;
              color: #fff;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              transition: background 0.3s ease;
            }

            .submit-button:hover {
              background: #0056b3;
            }

            .error-message {
              color: red;
              margin-bottom: 10px;
            }

            h2 {
              color: #333;
              font-size: 20px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default AddStory;
