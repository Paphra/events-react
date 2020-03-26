/* GET users listing. */
module.exports = (app, connection)=>{
  app.get('/api/users', function (req, res) {
    connection.query('SELECT * FROM users;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ users: data });
      })
  });

  app.post('/api/users', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}
