require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 4242;
const registration = require('./public/scripts/scriptLogin.js');
const results = require('./public/scripts/scriptResults.js');
const bodyParser = require('body-parser')
const dbConnection = require('./public/scripts/dbConnection.js');
const ejs = require('ejs');
// Request.PhysicalApplicationPath('../../sendmail.cshtml');
// Request.PhysicalApplicationPath('../../Attachment.txt');

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => res.render('./partials/page', {}));
app.get('/registration', (req, res) => res.render('./partials/registrationPage', {}));
app.get('/login', (req, res) => res.render('./partials/login', {}));
app.get('/about', (req, res) => res.render('./partials/about', {}));
app.get('/recommend', (req, res) => res.render('./partials/recommend', {}));
app.get('/takanon', (req, res) => res.render('./partials/takanon', {}));
app.get('/writeUs', (req, res) => res.render('./partials/writeUs', {}));
app.get('/searchResults', (req, res) => res.render('./partials/searchResults', {}));
app.get('/popup', (req, res) => res.render('./partials/popup', {}));


// app.get('../../Attachment.txt', (req,res)=> res.render('./partials/message',{
// // return req.PhysicalApplicationPath('../../sendmail.cshtml');
// }));

app.get('/privateArea/:id', async function (req, res) {
    let data = await dbConnection.queryConnection("select * from users where id = " + req.params.id);
    let d = data[0];
    return res.render('partials/privateArea', {
        d
    });
});

app.get('/searchResults/:id', async function (req, res) {
    let data = await dbConnection.queryConnection("select * from users where id = " + req.params.id);
    let d = data[0];
    return res.render('partials/searchResults', {
        d
    });
});

app.post('/registration/register', (req, res) => {
    return registration.register(req, res);
});
app.post('/registration/login', (req, res) => {
    return registration.login(req, res);
});
app.post('/results/getUsers', (req, res) => {
    return results.getUsers(req, res);
});
// app.post('/results/getUsers', async (req, res) => {
//     let data11 = await results.getUsers(req, res);
//     console.log(data11);
//     if (data11.length == 0) {
//         res.status(500).send("לא נמצאו תוצאות לחיפוש שלך");
//     } else {
//         let d = data11[0];
//         console.log(d);
//         res.render('partials/searchResults', {
//             d
//         })
//         console.log(d.firstName);
//     }
// });






app.listen(port, () => console.log('Example app listening on port ' + port));