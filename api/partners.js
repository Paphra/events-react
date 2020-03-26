
module.exports = (app, connection) => {
  app.get('/api/partners', function (req, res) {
    connection.query('SELECT * FROM partners;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ partners: data });
      })
  });

  app.post('/api/partners', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO partners SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}