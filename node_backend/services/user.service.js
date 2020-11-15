const config = require('../config.json');
const jwt = require('jsonwebtoken');
const SimulatedDB = require('../_helpers/dbsimulator');

module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser
}

async function authenticate({ username, password }) {

    //Here we will switch to  real db in the next HW.
    //Currently simulating it.
    const user = await SimulatedDB.findUser(username);
    //If user is found in the 'database'. In the next homework we will hash the password.
    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ sub: user.username, role: user.role }, config.secret);
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await SimulatedDB.getAllUsers();
}


async function getByUsername(username) {

    return await SimulatedDB.findUser(username);
}

async function addUser(user) {


    if(await getByUsername(user.username)){
        throw 'Username "' + user.username + '" is already taken';
    }


    return SimulatedDB.addUser(user);

}

