let password
export default class PasswordDao{
    static async injectDB(conn){
        if (password){
            return
        } else {
           password = await conn.db(process.env.LAMA_NS).collection('password').findOne({})
        }
    }
    static async getPasswordDAO (){
            try {
                return password
            } catch (e) {
                console.log('there was an error getting the password');
            }
        }
    
}