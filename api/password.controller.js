import PasswordDao from "../DAO/password.dao.js";

export default class Password {
    static async getPassword(req,res){
        const password = PasswordDao.getPasswordDAO()
        password.then(response => res.json(response.password))
    }
}