    import React, { useEffect, useState } from 'react'
    import EmployeeService from '../services/EmployeeService';
    import {useNavigate , useParams} from 'react-router-dom'
    import { Link } from 'react-router-dom';
    export default function AddEmployeeComponent() {

    const[firstname , setFirstname] = useState('');
    const[lastname , setLastname] = useState('');
    const[email , setEmail] = useState('');

    // It is a wrapper for the useNavigate hook, and the current location changes when you render it.
    const navigate = useNavigate()


    //  //The useParams() hook is a React Router hook that allows you to access the parameters of the current URL. 
   const {id} = useParams(); 
  
    const saveOrUpdateEmployee = (e) =>
    {
        //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        e.preventDefault();
        const employee = {firstname , lastname  , email}

        if(id){ //if there is id in url 
            //then update the employee from current id extracted by useParams
    EmployeeService.updateEmployee(id , employee).then((response) =>{
    navigate('/employees')
    }).catch(error =>{
        console.log(error)
    })
        }
        else{
        //else add new Employee
        EmployeeService.createEmployee(employee).then((response)=>{
            console.log(response.data)
        navigate('/employees')
        }).catch(error =>{
            console.log(error)
        })
        
        }
    
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response)=>{
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setEmail(response.data.email)
        }).catch(error =>{
            console.log(error)
        })
    },[])

    const title = () =>{
        if(id){ //if id in url then show update option
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{ //else add option
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset md-3'>
    {
        title()
    }
    
    <div className='card-body'>
        <form>
            <div className='form-group mb-2'>
                <label className='form-label'>First Name :</label>
                <input
                type='text'
                placeholder='Enter First Name'
                name='firstname'
                className='form-control'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                ></input>
            </div>

            <div className='form-group mb-2'>
                <label className='foem-label'>Last Name :</label>
                <input
                type='text'
                placeholder='Enter Last Name'
                name='lastname'
                className='form-control'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                ></input>
            </div>

            <div className='form-group mb-2'>
                <label className='foem-label'>Emal id :</label>
                <input
                type='text'
                placeholder='Enter Email id'
                name='firstname'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>

            <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Save Employee</button>

            {/* A <Link> is an element that lets the user navigate to another page by clicking or tapping on it. */}
            <Link to='/employees' className = 'btn btn-danger mx-3'>Cancel</Link>
        </form>
    </div>

                </div>
            </div>
        </div>
        </div>
    )
    }
