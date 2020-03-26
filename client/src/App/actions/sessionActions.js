import { sessionService } from 'redux-react-session';
var sha1 = require('sha1');

export const login = (user, history) => {
  let users = [];
  fetch('/api/users')
    .then(res => res.json()).then(res => {
      users = res.users;
      let response = {
        token: '',
        data: {
          u_username: 'Paphra',
        }
      };
      users.map(u => {
        let pass = sha1(user.password);
        if (u.u_username === user.username && u.u_password === pass) {
          response = {
            token: u.u_id,
            data: u
          };
          return sessionService.saveSession(u.u_id).then(() => {
            sessionService.saveUser(response.data)
              .then(() => {
                history.push('/dashboard');
              }).catch(err => console.error(err));
          }).catch(err => console.error(err)); 
        }else{
          return alert('Invalid Username Or Password');
        }
      });
    })
    .catch(error => console.log(error));
    return ()=>{history.push('/login')};

};

export const logout = (history) => {
  return () => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/login');
  };
};
