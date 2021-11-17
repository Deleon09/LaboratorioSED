const Things = require('../models/Things');

var ThingsController = {
    create: async (req, res) => {
        try {
            var thing = await Things.findOne({ name: req.body.name });

            if(thing != null)
                throw { error: true, message: "Este pendiente ya fue registrado previamente!" };
            
            var newThing = new Things({
                name: req.body.name
            })

            await newThing.save();
            return res.status(201).json({ error: false, message: "Pendiente creada exitosamente!" })
        }
        catch(err) {
            return res.status(400).json(err);
        }
    },

    deleteT: async (req, res) => {
        try {
            var supr = await Things.findOneAndDelete({
              _id: req.body.idE
            });
  
            return res.status(200).json({ obj: supr });
            
        } catch (err) {
              return res.status(400).json(err);
        }
    },

    update: async(req, res) => {
        const newThing = req.body.newName;
        const id = req.body.idN;

        try{
           await Things.findById(id, (err, updatedThing) => {
                updatedThing.name = newThing;
                updatedThing.save();
                res.send("update");
           });
  
        } catch(err){
              console.log(err);
        }
    },

    getAll: async (req, res) => {
        try{
            const { page = 1, limit = 10 } = req.query;
    
            const things = await Things.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()
            
            const count = await Things.countDocuments();
    
            return res.status(200).json({
                pages: Math.ceil(count / limit),
                current: page,
                things
            });
        }
        catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    },

    getAllThings: async (req, res) => {
        Things.find({}, (err, result) => {
            if(err)
                res.send(err);
            
            res.send(result);
        })
    }
};

module.exports = ThingsController;