import React, {useState} from 'react'
import qr from './QR.jpg'
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import Loading from './Loading';

const Donation = () => {
    const [particulars, setParticulars]=useState({name:'',email:''});
    const [loader, setLoader]=useState(false);

    const onChange=(e)=>{
        setParticulars({...particulars,[e.target.name]:e.target.value});
    }

    const isForm=()=>{
        return !(particulars.name && particulars.email);
    }

    const onSubmit=async (e)=>{
      setLoader(true);
       try {
        e.preventDefault();
        const token =Cookies.get('token');
      const response =await fetch(`${process.env.REACT_APP_URL}/user/data/donate`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'authorization':`Bearer ${token}`
        },
        body:JSON.stringify(particulars)
      })
      if(!response.ok){
        console.log("Failed to Fetch Details for your donation !!!")
      }
       } catch (error) {
        console.log(error);
       }
       finally{
        setLoader(false);
       }
    }
  return (
    <div>

      {loader?(<Loading/>):(
        <>
        
        
        <Navbar/>
        
        <style>
        {`
          * {
            font-family: "Noto Sans", sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          .nav-home {
            display: flex;
            justify-content: space-between;
          }
          
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-size: cover;
          }
          
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
          }
          
          input {
            text-align: center;
          }
          
          .form_01 {
            display: flex;
            justify-content: center;
            margin-top: 10%;
            text-align: center;
          }
          
          .conatiner {
            display: grid;
          }
          
          .btn {
            margin-top: 56px;
            width: 100%;
          }
          
          .Page_01 {
            text-align: center;
          }
          
          .Page_01 h1 {
            margin-top: 30px;
          }

          .btn_02 {
            width: 37%;
            margin: auto;
            margin-bottom: 40px;
            margin-top: 10px;
          }
          
          .form-group {
            margin-top: 10%;
          }
          
          .form_02 {
            text-align: center;
            display: grid;
            justify-content: center;
            margin-top: 10%;
          }
          
          .container_02 {
            display: flex;
            justify-content: center;
          }
          
          .subContainer_02 {
            margin: auto;
            margin-top: 10%;
          }
          
          .label_02 {
            margin-right: 10px;
          }
          
          .b_01 {
            margin-top: 0px;
            width: 155%;
          }
          
          .onlyPara {
            text-align: center;
          }
          
          .add {
            margin: auto;
            text-align: center;
          }
          
          .results {
            display: grid;
            justify-content: center;
          }
          
          .card {
            margin: 10px;
            width: 95%;
          }
          
          .container_03 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          
          .card-body {
            text-align: center;
          }
          
          .c_05 {
            display: grid;
            text-align: center;
            border: 3px solid black;
            width: 80%;
            margin: auto;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          
          .c_05 p {
            margin: auto;
            width: 60%;
            margin-top: 20px;
            margin-bottom: 40px;
          }
          
          .sticky-navbar {
            position: sticky;
            top: 0;
            z-index: 100;
          }
          
          .input_job_01 {
            width: 60%;
            margin: auto;
          }
          
          .text_form {
            text-align: center;
          }

          .text_form button {
            width: 40%;
            margin: auto;
            margin-bottom: 70px;
          }
          
          .label_02 {
            margin-top: 30px;
            margin-bottom: 30px;
          }
          
          .check_01 {
            margin-left: 148px;
          }
          
          .form_03 {
            display: grid;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
          }
          
          .form_03 input {
            margin: auto;
            margin-top: 10px;
            width: 60%;
            text-align: center;
          }
          
          .calander {
            margin-top: 20px;
          }
          
          .form-group_01 {
            margin-top: 30px;
          }
          
          .events_cal {
            display: grid;
            justify-content: center;
          }
          
          .event_h3 {
            display: grid;
            justify-content: center;
            text-align: center;
          }
          
          .event-details {
            display: grid;
            width: 100%;
            justify-content: center;
          }

          .child_event {
            margin: auto;
            margin-top: 20px;
          }
          
          .img_qr_01 {
            width: 19%;
            height: 94%;
            margin: auto;
          }
          
          .btn_01 {
            width: 30%;
            margin: auto;
            margin-top: 30px;
            margin-bottom: 30px;
          }
          `}
      </style>
        
      
      <form className='form_03' onSubmit={onSubmit}>
  <div className="form-group_01 ">
    <label htmlFor="exampleInputName1 ">Your Name </label>
    <input type="text" name ='name'  className="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Enter Your Name " onChange={onChange} value={particulars.name}required={true}/>
  </div>
  <div className="form-group_01">
    <label htmlFor="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email'value={particulars.email} placeholder="Enter Your Email" onChange={onChange}   required={true}/>
  </div>
 
  <h3 className='donation_h3'>You are Welcomed To Contribute To Our Efforts Of Making The Institute and it's Facilities Better ♥️ </h3>
  <h4>You can contribute Here : 9572408514@paytm</h4>
  <p>OR</p>
  <p>Scan Below : </p>
  <img src={qr} alt="UPI QR Code" className='img_qr_01'/>
  <button className='btn btn-primary btn_01' type='submit' disabled={isForm()}>Submit</button>
</form>


</>
)}
    </div>
  )
}

export default Donation
