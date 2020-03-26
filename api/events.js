var multer = require('multer');

const mysql = require('mysql');
module.exports = (app, connection)=>{
  app.get('/api/events', function(req, res){
    connection.query('SELECT * FROM events;',
      function(err, data){
        (err)?res.send(err):res.json({events:data});
    })
  });

  app.post('/api/events', function(req, res){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'client/public/images')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
    });
    var upload = multer({ storage: storage }).single('e_image');
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      let sql = "INSERT INTO events SET ?";
      req.body.e_image = req.file.filename;
      connection.query(sql, req.body, (err2, res2) => {
        if (err) {
          return res.status(500).json(err2);
        }
        return res.status(200).send(req.body);
      })
    });
  });
}