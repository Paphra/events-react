import React, {useState, useEffect} from 'react';
import {getUsers, makeDate} from '../Custom/Functions';
import axios from 'axios';

const Users =(props)=>{
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    getUsers(setUsers);
  }, []);
  
  const deleteUser = id => {
    let data = {
      id: id
    };
    axios.delete('/api/user/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted User.");
          getUsers(setUsers);
        } else {
          alert("Failed To Delete User.");
        }
      });
  }

  return (
    <div>
      {users.length ? users.map((u, ix) => {
        return (
          <div key={ix} className='row list-item'>
            <div className='col-md-6'>
              <p>Partner: <b>{u.u_partner}</b> | Role: <b>{u.u_role}</b></p>
              <p>Full Name: <b>{u.u_full_name}</b></p>
              <p>Registered: <b>{makeDate(u.u_entry_date).txt}</b></p>
            </div>
            <div className='col-md-4'>
              <p>Username: <b>{u.u_username}</b></p>
              <p>Email: <b>{u.u_email}</b></p>
              <p>Phone: <b>{u.u_phone}</b></p>
            </div>
            <div className='col-md-2'>
              <a href='#edit' className='btn btn-primary'><i className='fa fa-refresh'>Edit</i></a>
              {u.u_partner.length ?
                <div>
                  <br />
                  <a href='#delete' className='btn btn-danger'
                    onClick={() => { deleteUser(u.u_id) }}>
                    <i className='fa fa-trash'>Delete</i>
                  </a>
                </div>
              : ''}
            </div>
          </div>
        )
      }) : <tr><p colSpan='7'><h6>No Users Found!</h6></p></tr>}
    </div>
  );
}

export default Users;