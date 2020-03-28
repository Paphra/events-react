
module.exports = (app, connection) => {
  
  app.get('/api/maillist', function (req, res) {
    connection.query('SELECT * FROM maillist;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ maillist: data });
      })
  });

  app.post('/api/maillist', function (req, res) {
    let data = req.body;
    let sql = "INSERT INTO maillist SET ?";
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });

  app.patch('/api/maillist', function (req, res) {
    let status = req.body.status;
    let data = {};
    if(status === 'Active'){
      data.ml_status = "Inactive";
    }else{
      data.ml_status = "Active";
    }
    let id = req.body.id;
    let sql = "UPDATE maillist SET ? where ml_id='" + id +"';";
    
    connection.query(sql, data, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });

  app.delete('/api/maillist/:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM maillist WHERE ml_id='" + id + "';";
    connection.query(sql, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}