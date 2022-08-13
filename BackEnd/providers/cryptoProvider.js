const bcrypt = require('bcryptjs');

let cryptoProvider = {
    encryptPassword : function(s){
                        var salt = bcrypt.genSaltSync(10);
                        return  bcrypt.hashSync(s,salt);
                      },
    comparePassword: function(s,hashedPassword){
        return bcrypt.compareSync(s,hashedPassword);
    }

}
module.exports = cryptoProvider;
