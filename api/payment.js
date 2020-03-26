module.exports = (app, connection) => {
  app.get('/api/payment', function (req, res) {
    connection.query('SELECT * FROM payment;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ payment_methods: data });
      })
  });

  app.post('/api/payment', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO payment SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}