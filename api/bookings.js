
module.exports = (app, connection) => {
  app.get('/api/bookings', function (req, res) {
    connection.query('SELECT * FROM bookings;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ bookings: data });
      })
  });

  app.post('/api/bookings', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO bookings SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });

  app.delete('/api/bookings/:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM bookings WHERE b_id='" + id + "';";
    connection.query(sql, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}