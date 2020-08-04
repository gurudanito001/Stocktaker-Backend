const router = require ('express').Router();
const UsageHistory = require('../models/usageHistory.model');

router.route('/').get((req, res) =>{
    UsageHistory.find()
        .then(history =>res.json(history))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    const vehicleFor = req.body.vehicleFor;
    const authorizedBy = req.body.authorizedBy;
    const date = req.body.date;
    const purpose = req.body.purpose;
    const authorized = req.body.authorized

    const newUsageHistory = new UsageHistory({
        itemName,
        quantity,
        vehicleFor,
        authorizedBy,
        date,
        purpose,
        authorized
    })

    newUsageHistory.save()
        .then(() => res.json('Usage History added!')) 
        .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/:id').delete((req, res) =>{
    UsageHistory.findByIdAndDelete(req.params.id)
    .then(() => res.json('Usage Request Deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req, res) => {
    UsageHistory.findById(req.params.id)
    .then(history =>{
        history.itemName = req.body.itemName;
        history.quantity = req.body.quantity;
        history.vehicleFor = req.body.vehicleFor;
        history.authorizedBy = req.body.authorizedBy;
        history.date = req.body.date;
        history.purpose = req.body.purpose;
        history.authorized = req.body.authorized;

        history.save()
            .then(() => res.json('Usage History Updated!'))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});


router.route('/unauthorized').get((req, res) =>{
    UsageHistory.find({authorized:false})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/authorized').get((req, res) =>{
    UsageHistory.find({authorized:true})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/find/:itemname').get((req, res) =>{
    UsageHistory.find({itemName:req.params.itemname, authorized: true})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/findMonth/:itemname').get((req, res) =>{
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let result = []
    let date
    UsageHistory.find({itemName:req.params.itemname, authorized: true})
        .then(history => {
            history.map((item)=>{
                date = item.date.toString()
                monthNumber = new Date().getMonth()
                thisMonth = months[monthNumber]
                if(date.includes(thisMonth)){
                    result.push(item)
                }
            })
            res.json(result)
        })
        .catch(err => res.status(400).json('Error: ' +err))
});

module.exports = router;