
module.exports = (app, connection) => {
  app.get('/api/messages', function (req, res) {
    connection.query('SELECT * FROM messages;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ messages: data });
      })
  });

  app.post('/api/messages', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO messages SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });

}