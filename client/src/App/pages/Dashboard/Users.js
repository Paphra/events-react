import React, {useState, useEffect} from 'react';
import {getUsers, makeDate} from '../Custom/Functions';
import sha1 from 'sha1';

const Users =(props)=>{
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    getUsers(setUsers);
  }, []);

  const handleAddUser =()=>{
    let ps = sha1('Password');
    console.log(ps);
  }
  
  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Partner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users ? users.map((u, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(u.u_entry_date).txt}</td>
                <td>{u.u_full_name}</td>
                <td>{u.u_username}</td>
                <td>{u.u_email}<br />{u.u_phone}</td>
                <td>{u.u_role}</td>
                <td>{u.u_partner}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            )
          }) : <tr><td colSpan='7'><h6>No Users Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Users;