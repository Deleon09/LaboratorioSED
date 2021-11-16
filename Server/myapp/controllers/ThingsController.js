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
};

module.exports = ThingsController;