const userfunctions = require('./callfunctions/userfunctions');
const dcfunctions = require('./callfunctions/dcfunctions');
const pubfunctions = require('./callfunctions/pubfunctions');
const hwcfunctions = require('./callfunctions/hwcfunctions');
const csfunctions = require('./callfunctions/csfunctions');
var pubSyncfunc = require('./datacheck/publicity');
var dcSyncfunc = require('./datacheck/dailycount');
var comSyncfunc = require('./datacheck/compensation');
var hwcSyncfunc = require('./datacheck/hwc');
var reportDCfunc = require('./reports/dailycount');

var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.port || 2000;
// var router = express.Router();

app.get("/", function(req,res){res.send("[ Home - Page of API's ]")});

app.get("/getDCreportbyMonth", reportDCfunc.report.getdailycount);
app.get("/getDCreportbyday", reportDCfunc.report.getdailycountbyday);
app.post("/getDCreportbyrange", reportDCfunc.report.getdailycountbyrange);

app.get("/users", userfunctions.caller.getusers);
app.post("/createuser", userfunctions.caller.createUser);
app.get("/deleteuser/:id", userfunctions.caller.deleteUser);
app.post("/updateuser", userfunctions.caller.updateUser);

app.get("/getDailyCountAO", dcfunctions.caller.getdailyDAO);
app.get("/getDailyCountFA/:id", dcfunctions.caller.getFAusers);
app.get("/getallDC", dcfunctions.caller.getDailyCount);

app.get("/getCompensation_OM", dcfunctions.caller.getdailyDAO);
app.get("/getOM_cases/:id", dcfunctions.caller.getFAusers);

app.get("/getpublicity", pubfunctions.caller.getpubdata);

app.get("/getallhwc", hwcfunctions.caller.get_all_hwc);
app.get("/gethwc", hwcfunctions.caller.get_hwc);
app.get("/gethwc/:id", hwcfunctions.caller.get_hwcall_byid);

app.get("/getcase_users", csfunctions.caller.get_case_users);

//observer
setInterval(pubSyncfunc.func.syncallformpublicitydata, 1000 * 60 * 4);
setInterval(dcSyncfunc.func.syncformdailyusers, 1000 * 60 * 3);
setInterval(comSyncfunc.func.syncallcompensationdetails, 1000 * 60 * 2);
setInterval(hwcSyncfunc.func.syncallhwvdetails, 1000 * 60 * 1);

app.listen(port, () => console.log("Server running on port %d", port));