const crud = {}

const User = require('../models/User');
const { BSON } = require('mongodb')

crud.getAll = async (req, res) => {
    const user = await User.find({ status: 'Activo' });
    res.send(user)
}

crud.newUser = async (req, res) => {
    const { name, lastname, gender, email, phone, password, rol, dependency } = req.body;
    const user = new User({ name, lastname, phone, email, password, dependency, status: 'Activo', rol, gender });
    await user.save();
    res.send(user)
};

crud.getByText = async (req, res) => {
    const { text, order } = req.params;
    try {
        let id = new BSON.ObjectId(text)
        let users = await getUsersBy({
            status: 'Activo',
            $or: [
                { "name": { $regex: text, $options: 'i' } },
                { "email": { $regex: text, $options: 'i' } },
                { "lastname": { $regex: text, $options: 'i' } },
                { "_id": id }
            ]
        }, order);
        res.send(users)
    } catch (err) {
        let users = await getUsersBy({
            status: 'Activo',
            $or: [
                { "name": { $regex: text, $options: 'i' } },
                { "email": { $regex: text, $options: 'i' } },
                { "lastname": { $regex: text, $options: 'i' } }
            ]
        }, order);
        res.send(users)
    }
};

crud.getByEmail = async (req, res) => {
    const { email } = req.params;
    let users = await User.find({ email }).count()
    res.send(users > 0)
};

crud.getByDependency = async (req, res) => {
    const { dependency, order } = req.params;
    let users = await getUsersBy({ "dependency.name": dependency, status: 'Activo' }, order);
    res.send(users)
};

crud.getByRol = async (req, res) => {
    const { rol, order } = req.params;
    let users = await getUsersBy({ "rol": rol, status: 'Activo' }, order);
    res.send(users)
};

crud.getByGender = async (req, res) => {
    const { gender, order } = req.params;
    let users = await getUsersBy({ "gender": gender, status: 'Activo' }, order);
    res.send(users)
};

crud.getById = async (req, res) => {
    const { id } = req.params;
    let users = await getUsersBy({ "_id": id, status: 'Activo' }, 0);
    res.send(users)
};

crud.putUser = async (req, res) => {
    const { _id, name, lastname, email, phone, dependency, gender } = req.body;
    const doc = await User.findOne({ _id, status: 'Activo' });
    await doc.updateOne({ name, lastname, gender, email, phone, dependency })
    res.send(true);
}

crud.deleteUser = async (req, res) => {
    const { _id } = req.body;
    const doc = await User.findOne({ _id })
    await doc.updateOne({ status: "Inactivo" })
    res.send(true);
}

//get users in BD and sort
const getUsersBy = async function (query, orderBy) {
    let user;
    if (orderBy == 'Apellidos') {
        user = await User.find(query).sort({ "lastname": 1 });
    } else if (orderBy == 'Email') {
        user = await User.find(query).sort({ "email": 1 });
    } else {
        user = await User.find(query).sort({ "dependency": 1 });
    }
    return user;
}

module.exports = crud;