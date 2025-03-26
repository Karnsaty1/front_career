import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from './Navbar';

const AddPost = () => {

  const [details, setDetails] = useState({ jobTitle: '', description: '', companyName: '', postedAt: '', note: '', jobType: '', Location: '', requirement: '', link: '' });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const isChecked = () => {
    setChecked(prev => !prev);
  }

  const isValidForm = () => {
    return checked && details.companyName && details.postedAt && details.description && details.jobTitle && details.jobType && details.requirement && details.postedAt && details.Location;
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const token = Cookies.get('authToken');

      const response = await fetch(`${process.env.REACT_APP_URL}/user/data/addOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(details)
      })

      if (!response.ok) {
        console.log("Failed To Add Post")
      }

    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  }
  return (
    <div>
      <Navbar />

      <style>
  {`
    * {
      font-family: "Noto Sans", sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f4f7fa;
      color: #333;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 2rem;
      color: #333;
    }

    .form_03 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }

    .form-group {
      margin-bottom: 20px;
      width: 100%;
      max-width: 600px;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 1rem;
      margin-top: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
    }

    .input_jobTitle_01,
    .input_jobType_01,
    .input_link_01,
    .Reuirement_01,
    .Location_01 {
      max-width: 500px;
    }

     .text_area {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      font-size: 1rem;
    }
    .btn {
      margin-top: 20px;
      width: 40%;
      padding: 12px;
      font-size: 1rem;
      border-radius: 8px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .form-check {
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 10px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .form-check-input {
      margin-right: 12px;
      width: 18px;
      height: 18px;
      accent-color: #007bff;
    }

    .form-check-label {
      font-size: 1rem;
      color: #333;
      font-weight: 500;
      line-height: 1.5;
    }

    .form-check-input:checked {
      background-color: #007bff;
      border-color: #007bff;
    }

    .form-check-input:focus {
      outline: none;
      border-color: #0056b3;
    }

    .check_01 {
     width: auto;
    margin-left: -6px;
    margin-top: 1px;
    }

    .form-check-label:hover {
      cursor: pointer;
      color: #007bff;
    }
.desc_01 {
      border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 13px;
    padding-right: 53px;
    }
    .error-message {
      color: red;
      text-align: center;
      margin-top: 10px;
    }

    .sticky-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .container_03 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    /* Adjusting margin to avoid overlap */
    .form-check {
      gap: 10px; /* Added space between checkbox and label */
    }

    .form-check-label {
      margin-left: 10px; /* Ensures label is not too close to checkbox */
    }

    /* Responsive Design */
    @media screen and (max-width: 768px) {
      .form_03 {
        margin-top: 20px;
      }

      .input_jobTitle_01,
      .input_jobType_01,
      .input_link_01,
      .Reuirement_01,
      .Location_01 {
        width: 90%;
      }

      .btn {
        width: 60%;
      }

      .container_03 {
        grid-template-columns: 1fr;
      }
    }
  `}
</style>


      {error ? (
        <>
          <p>Failed to Add Post</p>
          <p>{error}</p>
        </>
      ) : (
        <form className='form_03 text_form' onSubmit={onSubmit}>
          <h1>Add Posting </h1>
          <div className="form-group label_002">
            <label htmlFor="exampleInputTitle01">Company's Name</label>
            <input type="text" value={details.companyName} name='companyName' onChange={onChange} className="form-control input_jobTitle_01" id="exampleInputTitle1" aria-describedby="TitleHelp" placeholder="Company's Name" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputTitle1">Job Title</label>
            <input type="text" value={details.jobTitle} name='jobTitle' onChange={onChange} className="form-control input_jobTitle_01" id="exampleInputTitle1" aria-describedby="TitleHelp" placeholder="Enter Title" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1 " className='text_area'>Description</label>
            <textarea id="description" className='desc_01' value={details.description} name="description" rows="4" cols="50" required={true} placeholder='Job Description' onChange={onChange} />
          </div>

          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1">Last Date Form Submission</label>
            <input
              type="date"
              value={details.postedAt ? details.postedAt.slice(0, 10) : ''}
              name='postedAt'
              onChange={onChange}
              className="form-control input_jobTitle_01"
              id="exampleInputdate1"
              placeholder="YYYY-MM-DD"
              required={true}
            />
          </div>
          <div className="form-group label_020">
            <label htmlFor="exampleInputDescription10">Requirements </label>
            <input type="text" value={details.requirement} name='requirement' onChange={onChange} className="form-control  Reuirement_01" id="exampleInputdate1" placeholder="Requirement" required={true} />
          </div>
          <div className="form-group label_0200">
            <label htmlFor="exampleInputDescription100">Location : </label>
            <input type="text" value={details.Location} name='Location' onChange={onChange} className="form-control  Location_01" id="exampleInputdate1" placeholder="Location" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1">Job Type </label>
            <input type="text" value={details.jobType} name='jobType' onChange={onChange} className="form-control  input_jobType_01" id="exampleNote1" placeholder="Job Type" required={true} />
          </div>
          <div className="form-group label_0201">
            <label htmlFor="exampleInputDescription12">link </label>
            <input type="text" value={details.link} name='link' onChange={onChange} className="form-control  input_link_01" id="exampleNote1" placeholder="link" required={true} />
          </div>
          <div className="form-group label_02">
            <label htmlFor="exampleInputDescription1">Note (if any) </label>
            <input type="text" value={details.note} name='note' onChange={onChange} className="form-control  input_jobTitle_01" id="exampleNote1" placeholder="Important" />
          </div>

          <div className="form-check label_02 label_034">
            <input type="checkbox" className="form-check-input check_01" id="check" checked={checked} onChange={isChecked} />
            <label className="form-check-label  input_jobTitle_01" htmlFor="exampleCheck1">I hereby declare that all the above information is correct</label>
          </div>
          <button type="submit" className="btn btn-primary " disabled={!isValidForm()}>Submit</button>
        </form>
      )}
    </div>
  )
}

export default AddPost;
