/* GET users listing. */
module.exports = (app, connection)=>{
  app.get('/api/users', function (req, res) {
    connection.query('SELECT * FROM users;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ users: data });
      })
  });

  app.post('/api/users', function (req, res) {
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, req.body, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });

  app.delete('/api/users/:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM users WHERE u_id='" + id + "';";
    connection.query(sql, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}
