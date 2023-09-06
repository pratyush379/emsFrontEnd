    import React,{useEffect, useState} from 'react'
    import EmployeeService from '../services/EmployeeService'
    import { Link } from 'react-router-dom'

    export default function ListEmployeeComponent() {

        const [employees , setEmployees] = useState([])
    
        useEffect(() =>{
        getAllEmployees();
        },[])

        //useEffect Hook is similar to  React class lifecycle methods i.e. componentDidMount , componentDidUpdate , and componentWillUnmount combined

        const getAllEmployees = () =>{
            EmployeeService.getAllEmployees().then((response)=>{
                setEmployees(response.data)
                console.log(response.data);
            }).catch(error =>{
            console.log(error);
        })
        }

        const deleteEmployee = (employeeId) =>{
            
            EmployeeService.deleteEmployee(employeeId).then((response)=>{
            getAllEmployees();
            console.log(employeeId)
            }).catch(error=>{
                console.log(error)
            })
        }


        return (
        <div className='container'>
            <h2 className='text-center'>List Employees</h2>
            <Link to ="/add-employee" className ="btn btn-primary mb-2 ">Add Employee</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>
                                <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button className='btn btn-danger mx-2' onClick={()=>deleteEmployee(employee.id)}>Delete</button>
                            
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
    }
