const express = require('express');
const locationController = require('../controllers/locationController');

function routes(Location) {
  const controller = locationController(Location);
  const locationRouter = express.Router();
  locationRouter.route('/locations')
    .post(controller.post)
    .get(controller.get);
  locationRouter.use('/locations/:locationId', (req, res, next) => {
    Location.findById(req.params.locationId, (err, location) => {
      if (err) {
        return res.send(err);
      }
      if (location) {
        req.location = location;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  locationRouter.route('/locations/:locationId')
    .get((req, res) => res.json(req.location))
    .put((req, res) => {
      const { location } = req;
      /* eslint-disable no-param-reassign */
      location.id = req.body.userId;
      location.lat = req.body.lat;
      location.lng = req.body.lng;
      location.address = req.body.address;
      location.name = req.body.name;
      /* eslint-enable no-param-reassign */
      req.location.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.location);
      });
    })
    .patch((req, res) => {
      const { location } = req;
      /* eslint-disable no-underscore-dangle */
      if (req.body._id) {
        delete req.body._id;
      }
      /* eslint-enable no-underscore-dangle */
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        location[key] = value;
      });
      req.location.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.location);
      });
    })
    .delete((req, res) => {
      req.location.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return locationRouter;
}

module.exports = routes;