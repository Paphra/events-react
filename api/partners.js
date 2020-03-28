var multer = require('multer');

module.exports = (app, connection) => {
  app.get('/api/partners', function (req, res) {
    connection.query('SELECT * FROM partners;',
      function (err, data) {
        (err) ? res.send(err) : res.json({ partners: data });
      })
  });

  app.post('/api/partners', function (req, res) {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'client/public/images/partners')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
    });
    var upload = multer({ storage: storage }).single('p_logo');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      let sql = "INSERT INTO partners SET ?";
      req.body.p_logo = req.file.filename;
      connection.query(sql, req.body, (err2, res2) => {
        if (err) {
          return res.status(500).json(err2);
        }
        return res.status(200).send(req.body);
      })
    });
  });

  app.delete('/api/partners/:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM partners WHERE p_id='" + id + "';";
    connection.query(sql, (err, res2) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.body);
    });
  });
}