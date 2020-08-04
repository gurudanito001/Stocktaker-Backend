const router = require ('express').Router();
const Vehicle = require('../models/vehicles.model');

router.route('/').get((req, res) =>{
    Vehicle.find()
        .then(vehicles =>res.json(vehicles))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const plateNumber = req.body.plateNumber;
    const description = req.body.description;

    const newVehicle = new Vehicle({
        plateNumber,
        description
    })

    newVehicle.save()
        .then(() => res.json('Vehicle added!')) 
        .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/:id').get((req, res) =>{
    Vehicle.findById(req.params.id)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/:id').delete((req, res) =>{
    Vehicle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req, res) => {
    Vehicle.findById(req.params.id)
    .then(vehicle =>{
        vehicle.plateNumber = req.body.plateNumber;
        vehicle.description = req.body.description;

        vehicle.save()
            .then(() => res.json('Vehicle Updated!'))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;