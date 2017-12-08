const passport =require('passport');
module.exports = (app) =>{


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/dashboard',
        failureRedirect: '/auth/google/failure'
    }));

    app.get('/', (req, res, next)=>{
        
            res.send('Neki text');
        
        });
}
