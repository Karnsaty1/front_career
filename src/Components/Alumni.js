import React, {useState} from 'react';
import Cookies from 'js-cookie'

const Alumni=()=>{
    const [selected,setSelected]=useState({PassedYear:'',Department:'',State:'',Package:''});
    const [result,setResult]=useState([]);
    const onChange=(e)=>{
        setSelected({...selected,[e.target.name]:e.target.value});
    }

  

    const onClick=async ()=>{
        try {
            
            const token =Cookies.get('authToken');

        const response=await fetch(`${process.env.REACT_APP_URL}/user/data/getAlumni`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${token}`
            },
            body:JSON.stringify(selected)
        });
        if(response.ok){
            const data=await response.json();
            console.log(data);
            setResult(data);
        }
        else{
            console.log("Failed to fetch details !!!")
        }
        } catch (error) {
            console.log(error);
        }
    }
    return (

       

        <div className='container_01'>
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

        <div className='container_02'>

        <div className="subContainer_02">
            <label htmlFor='PassedYear' className='label_02'> PassedYear : </label>
            <select id='PassedYear' name='PassedYear'value={selected.PassedYear} onChange={onChange}>
            <option value=""> Select a Value</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
        </select>
        </div>


        <div className="subContainer_02">
            <label htmlFor='Department' className='label_02'> Department : </label>
            <select id='Department' name='Department'value={selected.Department} onChange={onChange}>
            <option value=""> Select a Value</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
        </select>
        </div>


        <div className="subContainer_02">
            <label htmlFor='State' className='label_02'> State : </label>
            <select id='State' name='State'value={selected.State} onChange={onChange}>
            <option value=""> Select a Value</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Delhi">Delhi</option>
            <option value="Punjab">Punjab</option>
        </select>
        </div>


        <div className="subContainer_02">
            <label htmlFor='Package' className='label_02'> Package : </label>
            <select id='Package' name='Package'value={selected.Package} onChange={onChange}>
            <option value=""> Select a Value</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="above 12">above 12</option>
        </select>
        </div>


        <div className="subContainer_02">
            <button className='btn btn-primary b_01' onClick={onClick}> Apply </button>
            </div>
        </div>

       
       {result.length===0 && <div className='onlyPara'><p>No Result Found</p></div>}
       {result.length>0 && (<div className='results'>
          <h3>Results : </h3>
          <ul>
            {result.map((Element, index)=>(
                <li key={index}>
            {`PassedYear : ${Element.PassedYear} , Department : ${Element.Department} , State : ${Element.State} , Package : ${Element.Package} `}
                </li>
            ))}
          </ul>

       </div>) }
        
        </div>
    )
}


export default Alumni;