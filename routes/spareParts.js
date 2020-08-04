const router = require ('express').Router();
let SparePart = require('../models/spareparts.model');

router.route('/').get((req, res) =>{
    SparePart.find()
        .then(spareParts =>res.json(spareParts))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/categories').get((req, res) =>{
    SparePart.find()
        .then(spareParts =>{
            let category = [];
            spareParts.map((sparepart)=>{
                category.push(sparepart.category)
            })
            res.json([...new Set(category)]);
        })
        //.then(spareParts =>res.json(spareParts))


        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const partNumber = req.body.partNumber;
    const itemName = req.body.itemName;
    const manufacturer = req.body.manufacturer;
    const model = req.body.model;
    const serialNumber = req.body.serialNumber;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const reorderlevel = Number(req.body.reorderlevel);
    const averageUnitCost = Number(req.body.averageUnitCost);
    const description = req.body.description;

    const newSparePart = new SparePart({
        partNumber,
        itemName,
        manufacturer,
        model,
        serialNumber,
        category,
        quantity,
        reorderlevel,
        averageUnitCost,
        description,
    })

    newSparePart.save()
        .then(() => res.json('Spare Part added!'))
        .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/:id').get((req, res) =>{
    SparePart.findById(req.params.id)
        .then(sparepart => res.json(sparepart))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/:id').delete((req, res) =>{
    SparePart.findByIdAndDelete(req.params.id)
    .then(() => res.json('Spare Part deleted.'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req, res) => {
    SparePart.findById(req.params.id)
    .then(sparepart =>{
        sparepart.partNumber = req.body.partNumber;
        sparepart.itemName = req.body.itemName;
        sparepart.manufacturer = req.body.manufacturer;
        sparepart.model = req.body.model;
        sparepart.serialNumber = req.body.serialNumber;
        sparepart.category = req.body.category;
        sparepart.quantity = req.body.quantity;
        sparepart.reorderlevel = req.body.reorderlevel;
        sparepart.averageUnitCost = req.body.averageUnitCost;
        sparepart.description = req.body.description;

        sparepart.save()
            .then(() => res.json('Spare Part Updated!'))
            .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
})



module.exports = router;