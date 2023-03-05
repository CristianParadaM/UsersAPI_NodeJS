const { Router } = require('express')
const router = Router();
const { getAll, newUser, getByText, getByDependency, getByRol, getByGender, getById, putUser, deleteUser, getByEmail } = require('../controllers/crud');
const { getDataGender, getDataDependencies, getDataRol, getDataUsers} = require('../controllers/statistics');

//consultas 
router.get('/users', getAll);
router.get('/getByEmail/:email', getByEmail);
router.get('/getById/:id', getById);
router.get('/getByText/:text/:order', getByText);
router.get('/getByDependency/:dependency/:order', getByDependency);
router.get('/getByRol/:rol/:order', getByRol);
router.get('/getByGender/:gender/:order', getByGender);

//agregar usuario
router.post('/newUser', newUser);

//actualizar un usuario
router.put('/update', putUser);

//eliminar usuario
router.delete('/delete', deleteUser);

//estatistics
router.get('/dataGender', getDataGender);
router.get('/dataDependencies', getDataDependencies);
router.get('/dataRol', getDataRol);
router.get('/dataUsers', getDataUsers);

module.exports = router;