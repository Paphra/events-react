
module.exports = (app, connection) => {
  app.get('/api/about', function (req, res) {
    connection.query('SELECT * FROM about;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ about: data });
      })
  });

  app.patch('/api/about', function (req, res) {
    let data = req.body.data;
    let a_id = req.body.id;
    let sql = "UPDATE about SET ? where a_id='" + a_id +"';";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}