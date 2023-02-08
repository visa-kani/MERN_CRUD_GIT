const express = require('express'); //--1
const app = express();

const connectDB = require('./config/database.js') //--2
connectDB();

const dotenv = require('dotenv'); //--3
dotenv.config();

// For body-parser
const bodyParser = require('body-parser'); //--4
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const data = require('./data/User.json') //--5

// Middleware pulls the data  static   
//  bulid in middleware are also available for 
// error handing => it as coded in post router down below


 app.use(express.urlencoded({extended:true})); 
 app.use(express.json());

 const cors = require("cors"); //--6
 app.use(cors());


// ----------CURD Operations Contact Routes Starts Here!!!!

// @path/contact
// adding new contact
// @method post
// access public
const Contact = require('./models/contactModels'); //--7

app.route("/contact").post((req,res)=>{

    let newContact = new Contact(req.body);
    newContact.save((err,contact)=>{
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
});
//@path /contact
//@desc getting all contacts created
//@method get
//@access public
app.route("/contact").get((req, res) => {
	Contact.find({}, (err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json(contact);
	});
});

//@path /contact/:contactID
//@desc getting contact by ID
//@method get
//@access public
app.route("/contact/:contactID").get((req, res) => {
	Contact.findById(req.params.contactID, (err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json(contact);
	});
});

//@path /contact/:contactID
//@desc updating contact by ID
//@method put
//@access public
app.route("/contact/:contactID").put((req, res) => {
	Contact.findOneAndUpdate(
		{ _id: req.params.contactID },
		req.body,
		{ new: true, useFindAndModify: false },
		(err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		}
	);
});

//@path /contact/:contactID
//@desc deleting contact by ID
//@method delete
//@access public
app.route("/contact/:contactID").delete((req, res) => {
	Contact.deleteOne({ _id: req.params.contactID }, (err, message) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: "contact successfully deleted" });
	});
});
// ----------CURD Operations Contact Routes ENDS Here!!!!



// 4 Methods get, post,put, Delete// GET => Gets the data from the Server// POST => Sends the data from the Server// PUT => Upadate the data from the Server// DELETE => Delete the data from the Server

app.get('/user/:id/', (req,res, next) => {
    // res.send(` get request is sending on port ${PORT}`);
    console.log(req.params.id);  // String
    let user = Number(req.params.id);  //number / integer
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
},
(res,req)=>{
    console.log("The Second function");
}

);

app.route('/post')
    .get( (req,res) => {
        // throw new Error();
    // res.end() // this will end the call
    // res.redirect("https://www.linkedin.com/")
    // res.send(` POST request is sending on port ${PORT}`);
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
        res.json(data);

})
    .post((req, res) => {
        console.log(req.body);
        res.send(req.body);
})

    .put( (req,res) => {
    res.send(` PUT request is sending on port ${PORT}`)
})

    .delete( (req,res) => {
    res.send(` DELETE request is sending on port ${PORT}`)
});

// Error Handlings
// app.use((err, req, res, next)=>{
//     console.error(err.stack);
//     res.status(500).send (`Red Alert ${err.stack}`)
// })


// const favicon = require("serve-favicon"); //--8
// const path = require("path");
// app.use(favicon(path.join(__dirname, 'MERN/public', "favicon.ico")));


const PORT = process.env.PORT || 5000
app.listen(
    PORT, 
    console.log(`server running in ${process.env.NODE_ENV} mode on  port ${PORT}`));