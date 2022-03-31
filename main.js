var datasource = require('./datasource/simnple-datasource')
var model = require('./model/model').create(datasource)

var express = require('express')
var app = express()

//connect to mongoDB
var mongoose = require('mongoose');
  
 mongoose.connect('mongodb+srv://test:test@demo.svgfw.mongodb.net/demo?retryWrites=true&w=majority', function (err) {
  
    if (err) throw err;
    else  
        console.log('Successfully connected');
  
 });

app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
var router = express.Router()

router.use(express.static('public'))
var multer = require('multer')
var upload = multer({ dest: 'tmp/'})
var webconfig = require('./webconfig')
var urlencodedParser = require('body-parser').urlencoded({ extended: false})
const cookieParser = require('cookie-parser');
function controller(name){
    return require('./controllers/' + name + '-controller')
}

router.get('/', function (request, response){
    controller('home').get(request, response, webconfig, model)
})

router.get('/login', function (request, response){
    controller('login').get(request, response, webconfig, model)
})

router.post('/login', urlencodedParser, function (request, response){
    controller('login').post(request, response, webconfig, model)
})

router.get('/logout', function (request, response){
    controller('logout').get(request, response, webconfig)
})
router.get('/edit-general-info', function (request, response) {
    controller('edit-general-info').get(request, response, webconfig, model)
})

router.post('/edit-general-info', upload.single('featureImage'), function (request, response) {
    controller('edit-general-info').post(request, response, webconfig, model)
})
app.use(webconfig.root, router)

//Start web app

app.listen(8080, function(){
    console.log('Server started OK')
})