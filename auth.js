var jwt = require('jsonwebtoken');
var response = require('responses/response');

var model = require('./v1/models');

module.exports = {
    authorize: (req, res, next) => {
        try {
            
            var plainText = CryptoJS.AES.decrypt((req.headers['token']).toString(), process.env.PRODUCT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
            
            model.tbl_ClientLogins.findOne({
                where: { loginToken: plainText }
            }).then(
                result => {
                    jwt.verify(plainText, process.env.SECRET_KEY, (err, jwtResult) => {
                        if (!err) {
                            if (result.loginIp == jwtResult.ip && result.timestamp == jwtResult.timestamp) {
                                next();
                            }
                            else {
                                response.authErrors(err, res);
                            }
                        }
                        else {
                            response.authErrors(err, res);
                        }
                    });
                },
                error => {
                    response.authErrors(error, res);
                }
            ).catch((error) => {
                response.authErrors(error, res);
            });
        }
        catch (error) {
            response.authErrors(error, res);
        }

    },

    sign: (data) => {
        let signedJWT = jwt.sign(JSON.stringify(data[0]), process.env.SECRET_KEY);
        return signedJWT;
    },
    expiresign: (data) => {
        let signedJWT = jwt.sign({token:data},process.env.SECRET_KEY,{expiresIn:'15m'});
        return signedJWT;
    },

    verify: (token) => {
        console.log("auth",token)
        let verifiedJWT = jwt.verify(token, process.env.SECRET_KEY);
        return verifiedJWT;
    },

    encrypter: (plainText) => {
        return CryptoJS.AES.encrypt((plainText).toString(), process.env.PRODUCT_SECRET_KEY).toString();
    },

    decrypter: (encryptedText) => {
        return CryptoJS.AES.decrypt((encryptedText).toString(), process.env.PRODUCT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    },

    panelsAccess: (panelId, action, result, res) => {
        // console.log('panels result', result)
        for (var i = 0; i < result[0].entityPermissions.length; i++) {
            if (result[0].entityPermissions[i].panelId == panelId) {
                if (result[0].entityPermissions[i].permissions[action] == 1) {
                    // res.send(result[0].entityPermissions[i]);
                    return result[0].entityPermissions[i]
                }
                else {
                    res.status(401).send({ message: 'Unauthorized access' });
                }
            }
        }
    }
}