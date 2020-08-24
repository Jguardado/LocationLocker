function locationController(Location) {
  function post(req, res) {
    const location = new Location(req.body);
    if (!req.body.address) {
      res.status(400);
      return res.send('Address is required');
    }

    if (!req.body.zipcode) {
      res.status(400);
      return res.send('zipcode is required');
    }
    location.save();
    res.status(201);
    return res.json(location);
  }
  function get(req, res) {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.address) {
      query.address = req.query.address;
    }
    if (req.query.zipcode) {
      query.zipcode = req.query.zipcode;
    }

    Location.find(query, (err, locations) => {
      if (err) {
        return res.send(err);
      }
      return res.json(locations);
    });
  }
  return { get, post };
}

module.exports = locationController;