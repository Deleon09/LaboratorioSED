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
              _id: req.body._id
            });
  
            return res.status(200).json({ obj: supr });
            
        } catch (err) {
              return res.status(400).json(err);
        }
    },

    update: async(req, res) => {
        try{
           var upt = await Things.updateOne({name: req.body.name},
              {name: req.body.newName});
  
              return res.status(200).json({ obj: upt });
  
        } catch(err){
              return res.status(400).json(err);
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
        try{
            const things = await Things.find();
            
            return res.status(200).json({
                things
            });
        }
        catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    }
};

module.exports = ThingsController;