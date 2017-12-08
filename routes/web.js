const passport =require('passport');
module.exports = (app) =>{


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }));
    app.get('/auth/verified',(req, res, next) => {
        if(req.user){
            console.log(req.user);
        }else{
            console.log('Not auth');
        }
    });
    app.get('/auth/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/', (req, res, next)=>{
        
            res.render('index/welcome');
        
        });
}
