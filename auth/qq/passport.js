var passport = require('passport');
var qqStrategy = require('passport-qq').Strategy;

exports.setup = function(User,config){
    passport.use(new qqStrategy({
         clientID:config.qq.clientID,
            clientSecret:config.qq.clientSecret,
            callbackURL:config.qq.callbackURL,
            passReqToCallback:true
    },
    function(req,accessToken,refreshToken,profile,done){
        var userId = req.session.passport.userId || null;
        if(!userId){
            User.findOne({
                'qq.id':profile.id
            },function(err,user){
                if(err){
                    done(err);
                }
                if(!user){
                    var newUser = {
                        nickname:profile._json.nickname || '',
                        avatar:profile._json.figureurl_qq_2||profile._json.figureurl_2||'',
                        provider:'qq',
                        qq:{
                            id:profile.id,
                            token:accessToken,
                            name:profile._nickname||'',
                            email:''
                        }
                    }
                    user = new User(newUser);
                    user.save(function(err,user){
                        if(err) return done(err);
                        done(null,user)
                    })
                }else{
                    return done(null,user);
                }
            })
        }else{
            return done(new Error('已登录'))
        }
    }))
}