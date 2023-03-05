const statistics = {}

const User = require('../models/User');

statistics.getDataGender = async (req, res) => {
    const countMans = await User.find({ gender: 'Masculino', status:'Activo' }).count();
    const countWomans = await User.find({ gender: 'Femenino', status:'Activo' }).count();
    res.send({countMans, countWomans})
}
statistics.getDataDependencies = async (req, res) => {
    const countRH = await User.find({ "dependency.name": 'Recursos Humanos', status:'Activo' }).count();
    const countGR = await User.find({ "dependency.name": 'Gerencia', status:'Activo' }).count();
    const countFR = await User.find({ "dependency.name": 'Fabrica', status:'Activo' }).count();
    const countCM = await User.find({ "dependency.name": 'Comercial', status:'Activo' }).count();
    res.send({countRH, countCM, countFR, countGR});
}
statistics.getDataRol = async (req, res) => {
    const admin = await User.find({ rol: 'Administrador', status:'Activo' }).count();
    const emp = await User.find({ rol: 'Empleado', status:'Activo' }).count();
    res.send({admin, emp})
}
statistics.getDataUsers = async (req, res) => {
    const active = await User.find({ status: 'Activo' }).count();
    const inActive = await User.find({ status: 'Inactivo' }).count();
    res.send({active, inActive})
}

module.exports = statistics;