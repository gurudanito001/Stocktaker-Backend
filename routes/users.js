const router = require ('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) =>{
    User.find()
        .then(users =>res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const position = req.body.position;
    const viewUsers = req.body.viewUsers;
    const grantUserPrivileges = req.body.grantUserPrivileges;
    const viewInventoryRecords = req.body.viewInventoryRecords;
    const addNewSparePart = req.body.addNewSparePart;
    const recordPurchase = req.body.recordPurchase;
    const requestUsage = req.body.requestUsage;
    const authorizePurchase = req.body.authorizePurchase;
    const authorizeUsage = req.body.authorizeUsage;
    const viewItemHistory = req.body.viewItemHistory;
    const viewAllVehicles = req.body.viewAllVehicles;
    const addNewVehicle = req.body.addNewVehicle;
    const editVehicle = req.body.editVehicle;
    const viewHistory = req.body.viewHistory;

    const newUser = new User({
        fullname,
        gender,
        email,
        password,
        position,
        viewUsers,
        grantUserPrivileges,
        viewInventoryRecords,
        addNewSparePart,
        recordPurchase,
        requestUsage,
        authorizePurchase,
        authorizeUsage,
        viewItemHistory,
        viewAllVehicles,
        addNewVehicle,
        editVehicle,
        viewHistory
    })

    newUser.save()
        .then(() =>{
            res.json(newUser)
        })
        .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/find/:email').post((req, res) =>{
    User.findOne({email:req.params.email})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Account deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user =>{
        user.fullname = req.body.fullname;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.password = req.body.password;
        user.position = req.body.position;
        user.viewUsers = req.body.viewUsers;
        user.grantUserPrivileges = req.body.grantUserPrivileges;
        user.viewInventoryRecords = req.body.viewInventoryRecords;
        user.addNewSparePart = req.body.addNewSparePart;
        user.recordPurchase = req.body.recordPurchase;
        user.requestUsage = req.body.requestUsage;
        user.authorizePurchase = req.body.authorizePurchase;
        user.authorizeUsage = req.body.authorizeUsage;
        user.viewItemHistory = req.body.viewItemHistory;
        user.viewAllVehicles = req.body.viewAllVehicles;
        user.addNewVehicle = req.body.addNewVehicle;
        user.editVehicle = req.body.editVehicle;
        user.viewHistory = req.body.viewHistory;

        user.save()
            .then(() => res.json(user))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;