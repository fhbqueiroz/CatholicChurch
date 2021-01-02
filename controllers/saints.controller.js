let models = require('../models/index');
let enumsCommon = require('../commons/enums');

exports.findAll = async (req, res) => { 
    await models.Saints.findAll()
    .then(saints => {
        if(!saints)
            res.status(enumsCommon.STATUS_CODE.NOT_FOUND).json({message: 'Saints empty'})

        res.status(enumsCommon.STATUS_CODE.OK).json(saints)
    })
    .catch((err) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send(err))
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    await models.Saints.findByPk(id)
    .then((saint) => {
        if(!saint)
            res.status(enumsCommon.STATUS_CODE.NOT_FOUND).json({message: 'Saint not found'})

        res.status(enumsCommon.STATUS_CODE.OK).json(saint)
    })
    .catch((err) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({error: err}))
};

exports.insert = async (req, res) => {
    await models.Saints
      .create({
        name: req.body.name,
        date: req.body.date,
        resume: req.body.resume,
        active: req.body.active 
      })
      .then((saint) => res.status(enumsCommon.STATUS_CODE.OK).send({ message: 'Saint was added with successfully!' }))
      .catch((error) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error }));
};

exports.update = async (req, res) => { 
    const id = req.params.id

    await models.Saints.findByPk(id)
    .then(saint => {
        if (!saint) {
            res.status(enumsCommon.STATUS_CODE.NOT_FOUND).send({
                message: 'Saint not found',
          })
        }

        saint.update(
            req.body,
            {
                where: { id: id }
            }
        )
        .then((saint) => {
            if(!saint)
                res.status(enumsCommon.STATUS_CODE.NO_CONTENT).send({message: 'Not updated'})
            
            res.status(enumsCommon.STATUS_CODE.OK).send({message: `Saint with id=${id} was updated successfully`})
        })
        .catch((error) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error}));
    })
    .catch((error) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error }));
};

exports.delete = async (req, res) => {
    const id = req.params.id
    
    await models.Saints.findByPk(id)
    .then(saint => {
        if (!saint) {
            res.status(enumsCommon.STATUS_CODE.NOT_FOUND).send({
                message: 'Saint not found',
          })
        }

        saint.destroy()
        .then(saint => {
            if (!saint) {
                res.status(enumsCommon.STATUS_CODE.NO_CONTENT).send({
                    message: "Saint not deleted!"
                });
            }
            
            res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({
                message: `Saint with id=${id} was deleted successfully`
            });
        })
        .catch((error) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error }));
    })
    .catch((error) => res.status(enumsCommon.STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error }));
};
