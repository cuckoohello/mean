'use strict';

module.exports = function(MeanUser, app, auth, database, passport) {

  app.route('/api/logout')
    .get(function(req, res){
      req.logout();
      res.status(200).json({});
    });

  app.route('/api/login')
    .post(function(req, res, next){
      if (req.body.email && req.body.password){
        passport.authenticate('local', function(err, user, info){
          if (err) { return next(err); }
          if (!user) {
            if (info.message === 'Unknown user'){
              res.status(401).json({id:'account_no_exist',msg:'用户名不存在',url:''});
            }else if (info.message === 'Invalid password'){
              res.status(401).json({id:'password_error',msg:'密码错误',url:''});
            }
          }else {
            req.login(user, function(err){
              if (err) { return next(err); }
              return res.json(user);
            });
          }
        })(req, res, next);
      }else{
        res.status(422).json({id:'invalid_params',msg:'参数出错',url:''});
      }
    });

};
