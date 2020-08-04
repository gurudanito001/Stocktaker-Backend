const router = require ('express').Router();
const PurchaseHistory = require('../models/purchaseHistory.model');

router.route('/').get((req, res) =>{
    PurchaseHistory.find()
        .then(history =>res.json(history))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    const cost = req.body.cost;
    const supplier = req.body.supplier;
    const date = req.body.date;
    const invoiceNumber = req.body.invoiceNumber;
    const authorized = req.body.authorized;

    const newPurchaseHistory = new PurchaseHistory({
        itemName,
        quantity,
        cost,
        supplier,
        date,
        invoiceNumber,
        authorized
    })

    newPurchaseHistory.save()
        .then(() => res.json('Purchase History added!')) 
        .catch(err => res.status(400).json('Error: ' +err));
})
router.route('/:id').delete((req, res) =>{
    PurchaseHistory.findByIdAndDelete(req.params.id)
    .then(() => res.json('Record Discarded.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req, res) => {
    PurchaseHistory.findById(req.params.id)
    .then(history =>{
        history.itemName = req.body.itemName;
        history.quantity = req.body.quantity;
        history.cost = req.body.cost;
        history.supplier = req.body.supplier;
        history.date = req.body.date;
        history.invoiceNumber = req.body.invoiceNumber;
        history.authorized = req.body.authorized;

        history.save()
            .then(() => res.json('Purchase History Updated!'))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/unauthorized').get((req, res) =>{
    PurchaseHistory.find({authorized:false})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/authorized').get((req, res) =>{
    PurchaseHistory.find({authorized:true})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/find/:itemname').get((req, res) =>{
    PurchaseHistory.find({itemName:req.params.itemname, authorized: true})
        .then(history => res.json(history.reverse()))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/findMonth/:itemname').get((req, res) =>{
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let result = []
    let date
    PurchaseHistory.find({itemName:req.params.itemname, authorized: true})
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