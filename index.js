const app = require('./app');
const port = process.env.PORT || 3050;
app.listen(port, ()=>{
    console.log('app listening on port 3050...');
});