


module.exports = {
    findUser,
    addUser,
    getAllUsers
    }




let Users = [{
    username: "doc",
    role: "Doctor",
   password:"123123"},
    {username: "pat",
        role: "Patient",
        password:"123123",
        currMed: "Aspirin"}
];


async function findUser(username){


    return new Promise((resolve) => {const index = Users.map(user => user.username).indexOf(username);

        if (index!=-1) {

            setTimeout(()=>{
                resolve(Users[index]);
                },100);
        }
        else
            resolve(null);
    });
}

async function getAllUsers(){
    return new Promise((resolve, reject) => {
        if (Users.length>0) {
            setTimeout(()=>{
                resolve(Users);
            },100);
        }
        else
            reject(false);
    });
}

async function addUser(user){

    console.log("DB: AddUser()", user);
    return new Promise((resolve, reject) => {

        if (user.username && user.role) {
            setTimeout(()=>{

                Users.push(user);
                resolve(true);
            },100)
        }
        else
            reject(false);
    });
}
