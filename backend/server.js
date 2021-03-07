import express from 'express';
import dotenv from 'dotenv';
 import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
import bodyParser from 'body-parser';
var Schema = mongoose.Schema;
import Axios from 'axios'
 import moment from 'moment';
dotenv.config();

const mongodbUrl= config.MONGODB_URL;


//moment.suppressDeprecationWarnings = true;

console.log("I am mongodbUrflfffffffffffff", mongodbUrl);


mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	//useCreateIndex:true,
	autoIndex: false, // Don't build indexes
	//useMongoClient: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0
}).catch(error => console.log(error.reason));

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: Number },
    Date: { type: Date },
}, { versionKey: false });


const productdata = new Schema({
    id: { type: String },
    product_master_diffgr_id: { type: String },
    msdata_rowOrder: { type: String },
    AMC_CODE: { type: String },
    PRODUCT_CODE: { type: String },
    PRODUCT_LONG_NAME: { type: String },
    SYSTEMATIC_FREQUENCIES:{ type: String },
    SIP_DATES: { type: String },
    STP_DATES: { type: String },
    SWP_DATES: { type: String },
    PURCHASE_ALLOWED: { type: String },
    SWITCH_ALLOWED: { type: String },
    REDEMPTION_ALLOWED: { type: String },
    SIP_ALLOWED: { type: String },
    STP_ALLOWED: { type: String },
    SWP_ALLOWED: { type: String },
    REINVEST_TAG: { type: String },
    PRODUCT_CATEGORY: { type: String },
    ISIN: { type: String },
    LAST_MODIFIED_DATE: { type: String },
    ACTIVE_FLAG: { type: String },
    ASSET_CLASS: { type: String },
    SUB_FUND_CODE: { type: String },
    PLAN_TYPE: { type: String },
    INSURANCE_ENABLED: { type: String },
    RTACODE: { type: String },
    NFO_ENABLED: { type: String },
    NFO_CLOSE_DATE: { type: String },
    NFO_SIP_EFFECTIVE_DATE: { type: String },
    ALLOW_FREEDOM_SIP: { type: String },
    ALLOW_FREEDOM_SWP: { type: String },
    ALLOW_DONOR: { type: String },
    ALLOW_PAUSE_SIP: { type: String },
    ALLOW_PAUSE_SIP_FREQ: { type: String },
    PAUSE_SIP_MIN_MONTH: { type: String },
    PAUSE_SIP_MAX_MONTH: { type: String },
    PAUSE_SIP_GAP_PERIOD: { type: String },
}, { versionKey: false });

const foliocams = new Schema({
    AMC_CODE: { type: String },
    FOLIOCHK: { type: String },
    INV_NAME: { type: String },
    SCH_NAME: { type: String },
    JNT_NAME1: { type: String },
    JNT_NAME2: { type: String },
    HOLDING_NATURE: { type: String },
    PAN_NO: { type: String },
    JOINT1_PAN: { type: String },
    BANK_NAME: { type: String },
    AC_NO: { type: String },
    NOM_NAME: { type: String },
    NOM2_NAME: { type: String },
    NOM3_NAME: { type: String },
    IFSC_CODE: { type: String },
    PRODUCT: {type: String},
}, { versionKey: false });


const foliokarvy = new Schema({
    FUNDDESC: { type: String },
    ACNO: { type: String },
    INVNAME: { type: String },
    JTNAME1: { type: String },
    JTNAME2: { type: String },
    BNKACNO: { type: String },
    BNAME: { type: String },
    PANGNO: { type: String },
    NOMINEE: { type: String },
    PRCODE: { type: String},
    FUND: { type : String},
    BNKACTYPE : { type: String},
}, { versionKey: false });

const foliofranklin = new Schema({
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    BANK_NAME: { type: String },
    ACCNT_NO: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
    PANNO1: { type: String },
    COMP_CODE : { type: String },
    AC_TYPE : { type: String },
    KYC_ID :{ type: String },
    HOLDING_T6 : { type: String },
    PBANK_NAME : { type: String },
    PERSONAL_9 : { type: String },
}, { versionKey: false });

const transcams = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String }, 
    TRXNNO: {type: String },
    TRADDATE: { type: Date },   
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    TRXN_NATUR: { type: String },
    SCHEME_TYP: { type: String },
    PAN: { type: String },
    TRXN_TYPE_: { type: String },   
    AC_NO: { type: String } ,
    BANK_NAME: { type: String } ,
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: Date },
    TD_POP: { type: String },
    TD_AMT: { type: Number },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
    TRDESC: { type: String },
    PAN1: { type: String },
    ASSETTYPE:{ type: String},
    TD_UNITS: { type: Number},
    SCHEMEISIN:{ type: String},
    TD_FUND:{ type: String},
    TD_TRTYPE: { type : String},
    NEWUNQNO: {type : String},
}, { versionKey: false });


const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date},
    NAV: { type: Number },
    POP: { type: String },
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    ADDRESS1: { type: String },
    IT_PAN_NO1: { type: String },
    ISIN: { type: String },
    JOINT_NAM1: { type: String },
    JOINT_NAM2: { type: String },
    PLAN_TYPE: { type: String },
    NOMINEE1: { type: String },
    ACCOUNT_16: { type: String },
    PBANK_NAME: { type: String },
    PERSONAL23: { type: String},
}, { versionKey: false });


  var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
  var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
  var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
  var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams'); 
  var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');  
  var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
  var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');  
  var resdata="";
  var data="";
var i=0;

app.get("/api/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data="+data);
            res.send(data);
        }
    });
})



app.post("/api/getsipstpuserwise", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);

    var pan = req.body.pan;
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if(req.body.pan===null || req.body.pan === '' || req.body.pan === "Please Provide"){
        const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",INV_NAME:"$INV_NAME",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",INV_NAME:"$_id.INV_NAME",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVNAME:req.body.name} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
            {$sort : { TRADDATE : -1}}
        ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",INVNAME:"$INVNAME",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",INV_NAME:"$_id.INVNAME",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVNAME:req.body.name} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
            {$sort : { TRADDATE : -1}}
        ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVNAME:req.body.name} , {TRXN_NATUR:/SIP/} ] }},
            {$sort : { TRADDATE : -1}}
        ]
               
                transc.aggregate(pipeline, (err, newdata) => {
                     transk.aggregate(pipeline1, (err, newdata1) => {
                         transf.aggregate(pipeline2, (err, newdata2) => {
                           if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){    
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata2 
                                      }
                                   }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                      var datacon = newdata2.concat(newdata1.concat(newdata))
                                      datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     .reverse().map(JSON.parse) ;
                                     for(var i=0; i<datacon.length; i++){
                                        if(datacon[i]['TRXN_NATUR'].match(/Systematic.*/) ){
                                            datacon[i]['TRXN_NATUR'] = "SIP";
                                        }
                                        if( (Math.sign(datacon[i]['AMOUNT']) === -1) ){
                                            datacon[i]['TRXN_NATUR'] = "SIPR";
                                        }
                                        if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                            datacon[i]['TRXN_NATUR'] = "STP";
                                        }
                                    }
                                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                     res.json(resdata)
                                     return resdata
                                    });
                               });
                            });
                        }else{
                            const pipeline = [  ///trans_cams
                                {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",INV_NAME:"$INV_NAME",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
                                {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",INV_NAME:"$_id.INV_NAME",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
                                {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
                                {$sort : { TRADDATE : -1}}
                            ]
                            const pipeline1 = [  ///trans_karvy
                                {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",INVNAME:"$INVNAME",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
                                {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",INV_NAME:"$_id.INVNAME",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
                                {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
                                {$sort : { TRADDATE : -1}}
                            ]
                            const pipeline2 = [  ///trans_franklin
                                {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                                {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
                                {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan} , {TRXN_NATUR:"SIP"} ] }},
                                {$sort : { TRADDATE : -1}}
                            ]
                                   
                                    transc.aggregate(pipeline, (err, newdata) => {
                                         transk.aggregate(pipeline1, (err, newdata1) => {
                                             transf.aggregate(pipeline2, (err, newdata2) => {
                                               if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){    
                                                        resdata= {
                                                            status:200,
                                                            message:'Successfull',
                                                            data:  newdata2 
                                                          }
                                                       }else{
                                                            resdata= {
                                                            status:400,
                                                            message:'Data not found',            
                                                          }
                                                        }
                                                          var datacon = newdata2.concat(newdata1.concat(newdata))
                                                          datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                                         .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                                         .reverse().map(JSON.parse) ;
                                                         for(var i=0; i<datacon.length; i++){
                                                            if(datacon[i]['TRXN_NATUR'].match(/Systematic.*/) ){
                                                                datacon[i]['TRXN_NATUR'] = "SIP";
                                                            }
                                                            if( (Math.sign(datacon[i]['AMOUNT']) === -1) ){
                                                                datacon[i]['TRXN_NATUR'] = "SIPR";
                                                            }
                                                            if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                                                datacon[i]['TRXN_NATUR'] = "STP";
                                                            }
                                                        }
                                                         resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                                         res.json(resdata)
                                                         return resdata
                                                        });
                                                   });
                                                });
                        }
})

app.post("/api/getsipstpall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);

    const pipeline = [  ///trans_cams
        {$group :   {_id : {TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
        {$sort : { TRADDATE : -1}}
    ]
     const pipeline1 = [  ///trans_karvy
        {$group :   {_id : {TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
        {$sort : { TRADDATE : -1}}
    ]
    const pipeline2 = [  ///trans_franklin
        {$group :   {_id : {TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }},
        {$sort : { TRADDATE : -1}}
    ]
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
     transc.aggregate(pipeline, (err, newdata) => {
        transk.aggregate(pipeline1, (err, newdata1) => {
           transf.aggregate(pipeline2, (err, newdata2) => {
                if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){  
                        resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata2 
                         }
                        }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                         var datacon = newdata2.concat(newdata1.concat(newdata))
                         datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse) ;
                            for(var i=0; i<datacon.length; i++){
                                if(datacon[i]['TRXN_NATUR'].match(/Systematic.*/) ){
                                    datacon[i]['TRXN_NATUR'] = "SIP";
                                }
                                if( (Math.sign(datacon[i]['AMOUNT']) === -1) ){
                                    datacon[i]['TRXN_NATUR'] = "SIPR";
                                }
                                if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                    datacon[i]['TRXN_NATUR'] = "STP";
                                }
                            }
                        resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                        res.json(resdata)
                        return resdata
                
                       });
                  });
                });
})

app.post("/api/gettransactionall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
            const pipeline = [  ///trans_cams
                {$group :   {_id : {TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer } ] }},
                {$sort: {TRADDATE: -1}}
                ]
            const pipeline1 = [  ///trans_karvy
                {$group :   {_id : {TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer } ] }},
                {$sort: {TRADDATE: -1}}
                ]
            const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer },  ] }},
                {$sort: {TRADDATE: -1}}
                ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                 var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                 var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                     transk.aggregate(pipeline1, (err, newdata1) => {
                         transf.aggregate(pipeline2, (err, newdata2) => {
                             if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata2 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                    var datacon = newdata2.concat(newdata1.concat(newdata))
                                      datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     .reverse().map(JSON.parse) ;
                                     for(var i=0; i<datacon.length; i++){
                                                if(datacon[i]['TRXN_NATUR'] === "Redemption"){
                                                    datacon[i]['TRXN_NATUR'] = "RED";
                                                }if(datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)){
                                                    datacon[i]['TRXN_NATUR'] = "SIP";
                                                }if(Math.sign(datacon[i]['AMOUNT']) === -1){
                                                    datacon[i]['TRXN_NATUR'] = "SIPR";
                                                }if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                                    datacon[i]['TRXN_NATUR'] = "STP";
                                                }
                                            }
                                         //   console.log(datacon);
                                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                     res.json(resdata)
                                     //return resdata
                                  });
                                });
                             });
                       
})

app.post("/api/gettransactionuserwise", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if(req.body.pan == '' || req.body.pan == "" || req.body.pan == undefined ||  req.body.pan == "Please Provide" || req.body.pan == null ){
        
        //return false;
        const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE: "$TRADDATE"   }}}, 
            {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVNAME:req.body.name}  ] }},
            {$sort : { TRADDATE : -1}}
            ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVNAME:req.body.name}  ] }},
            {$sort : { TRADDATE : -1}}
            ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{INVESTOR_2:req.body.name} ] }},
            {$sort : { TRADDATE : -1}}
            ]
            
                transc.aggregate(pipeline, (err, newdata) => {
                    transk.aggregate(pipeline1, (err, newdata1) => {
                        transf.aggregate(pipeline2, (err, newdata2) => {
                            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                     //   if( newdata != 0){
                                 resdata= {
                                       status:200,
                                       message:'Successfull',
                                       data:  newdata2
                                     }
                                   }else{
                                       resdata= {
                                       status:400,
                                       message:'Data not found',            
                                     }
                                   }
                                   var datacon = newdata2.concat(newdata1.concat(newdata))
                                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                    .reverse().map(JSON.parse) ;
                                    for(var i=0; i<datacon.length; i++){
                                        if(datacon[i]['TRXN_NATUR'] === "Redemption"){
                                            datacon[i]['TRXN_NATUR'] = "RED";
                                        }if(datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)){
                                            datacon[i]['TRXN_NATUR'] = "SIP";
                                        }if(Math.sign(datacon[i]['AMOUNT']) === -1){
                                            datacon[i]['TRXN_NATUR'] = "SIPR";
                                        }if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                            datacon[i]['TRXN_NATUR'] = "STP";
                                        }
                                    }
                                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                     res.json(resdata)
                                    return resdata
                               });
                            });
                });
            }else{
                const pipeline = [  ///trans_cams
                    {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE: "$TRADDATE" }}}, 
                    {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
                    {$match :   { $and: [  { month: mon }, { year: yer },{PAN:req.body.pan}  ] }},
                    {$sort : { TRADDATE : -1}}
                    ]
                const pipeline1 = [  ///trans_karvy
                    {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT" }}}, 
                    {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
                    {$match :   { $and: [  { month: mon }, { year: yer },{PAN:req.body.pan}  ] }},
                    {$sort : { TRADDATE : -1}}
                    ]
                const pipeline2 = [  ///trans_franklin
                    {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE" }}}, 
                    {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
                    {$match :   { $and: [  { month: mon }, { year: yer },{PAN:req.body.pan} ] }},
                    {$sort : { TRADDATE : -1}}
                    ]
                   
                        transc.aggregate(pipeline, (err, newdata) => {
                            transk.aggregate(pipeline1, (err, newdata1) => {
                                transf.aggregate(pipeline2, (err, newdata2) => {
                                    if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                             //   if( newdata != 0){
                                         resdata= {
                                               status:200,
                                               message:'Successfull',
                                               data:  newdata2
                                             }
                                           }else{
                                               resdata= {
                                               status:400,
                                               message:'Data not found',            
                                             }
                                           }
                                           var datacon = newdata2.concat(newdata1.concat(newdata))
                                             datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                            .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                            .reverse().map(JSON.parse) ;
                                            for(var i=0; i<datacon.length; i++){
                                                if(datacon[i]['TRXN_NATUR'] === "Redemption"){
                                                    datacon[i]['TRXN_NATUR'] = "RED";
                                                }if(datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)){
                                                    datacon[i]['TRXN_NATUR'] = "SIP";
                                                }if(Math.sign(datacon[i]['AMOUNT']) === -1){
                                                    datacon[i]['TRXN_NATUR'] = "SIPR";
                                                }if(datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)){
                                                    datacon[i]['TRXN_NATUR'] = "STP";
                                                }
                                            }
                                            resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                            res.json(resdata)
                                            return resdata
                                       });
                                    });
                        });
            }
                      
})

app.post("/api/gettaxsavinguserwise", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var pan = req.body.pan;

    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if(req.body.pan===null || req.body.pan === '' || req.body.pan === "Please Provide"){
         const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{INVNAME:req.body.name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
          const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{INVNAME:req.body.name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
          const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE" ,year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }}},
            {$project : {_id:0, INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{INVNAME:req.body.name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
            transc.aggregate(pipeline, (err, newdata) => {
              transk.aggregate(pipeline1, (err, newdata1) => {
                transf.aggregate(pipeline2, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               
               for(var i=0; i<datacon.length; i++){
                if(datacon[i]['TRXN_NATURE'] === "Redemption"){
                    datacon[i]['TRXN_NATURE'] = "RED";
                }if(datacon[i]['TRXN_NATURE'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATURE'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic (ECS).*/)){
                    datacon[i]['TRXN_NATURE'] = "SIP";
                }if(Math.sign(datacon[i]['AMOUNT']) === -1 ){
                    datacon[i]['TRXN_NATURE'] = "SIPR";
                }if(datacon[i]['TRXN_NATURE'].match(/Systematic - From.*/)){
                    datacon[i]['TRXN_NATURE'] = "STP";
                }
            }
               resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
               res.json(resdata)
               return resdata
            });
        });
     });
    }else{
        const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:pan} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
          const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:pan} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
          const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE" ,year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }}},
            {$project : {_id:0, INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:pan} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
            transc.aggregate(pipeline, (err, newdata) => {
              transk.aggregate(pipeline1, (err, newdata1) => {
                transf.aggregate(pipeline2, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               for(var i=0; i<datacon.length; i++){
                if(datacon[i]['TRXN_NATURE'] === "Redemption"){
                    datacon[i]['TRXN_NATURE'] = "RED";
                }if(datacon[i]['TRXN_NATURE'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATURE'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic (ECS).*/)){
                    datacon[i]['TRXN_NATURE'] = "SIP";
                }if(Math.sign(datacon[i]['AMOUNT']) === -1 ){
                    datacon[i]['TRXN_NATURE'] = "SIPR";
                }if(datacon[i]['TRXN_NATURE'].match(/Systematic - From.*/)){
                    datacon[i]['TRXN_NATURE'] = "STP";
                }
            }
               resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
               res.json(resdata)
               return resdata
            });
        });
     });  
    }
 });

 app.post("/api/gettaxsaving", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
        const pipeline = [  ///trans_cams
            {$group :   {_id : {SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/}, {TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},                   
            {$match :   { $and: [ { SCHEME:/Tax/}, {TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/}, {TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
        ]
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        transc.aggregate(pipeline, (err, newdata) => {
           transk.aggregate(pipeline1, (err, newdata1) => {
            transf.aggregate(pipeline2, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               for(var i=0; i<datacon.length; i++){
                if(datacon[i]['TRXN_NATURE'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-NSE.*/)|| datacon[i]['TRXN_NATURE'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic (ECS).*/)){
                    datacon[i]['TRXN_NATURE'] = "SIP";
                }if(Math.sign(datacon[i]['AMOUNT']) === -1 ){
                    datacon[i]['TRXN_NATURE'] = "SIPR";
                }if(datacon[i]['TRXN_NATURE'].match(/Systematic - From.*/)){
                    datacon[i]['TRXN_NATURE'] = "STP";
                }if(datacon[i]['TRXN_NATURE'] === "Additional Purchase" || datacon[i]['TRXN_NATURE'] === "Fresh Purchase"){
                    datacon[i]['TRXN_NATURE'] = "Purchase";
                }
            }
               resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
               res.json(resdata)
               return resdata
            });
          })
       });
 });         

app.post("/api/getdividendall", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  ///trans_cams
            {$group :   {_id : {SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { TRXN_NATURE:/Dividend/} , { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
            ]
            const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { TRXN_NATURE:/Dividend/} , { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
            {$sort : { TRADDATE : -1}}
            ]
            const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0, SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { TRXN_NATURE:/Dividend/} ,{$or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
                ]
        transf.aggregate(pipeline2, (err, newdata) => {
          transc.aggregate(pipeline, (err, newdata1) => {
           transk.aggregate(pipeline1, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               for(var i=0; i<datacon.length; i++){
                if(datacon[i]['TRXN_NATURE'] === "Gross Dividend"){
                    datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                }if(datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATURE'].match(/Dividend Reinvest.*/)){
                    datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                }
            }
               resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
               res.json(resdata)
               return resdata
            });
         });
     })
   
 });

 app.post("/api/getdividenduserwise", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var pan = req.body.pan;
    //var name = req.body.name;
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if(req.body.pan===null || req.body.pan === ''){
            const pipeline = [  ///trans_cams
                {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
                {$match :   { $and: [ { TRXN_NATURE:/Dividend/} , { INVNAME: req.body.name  },{ $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
           
            ]
            const pipeline1 = [  ///trans_karvy
                {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
                {$match :   { $and: [ { TRXN_NATURE:/Div/} , { INVNAME: req.body.name  }, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
                ]
                const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { $or: [ {TRXN_NATURE: /DIR/ } ,{TRXN_NATURE: /DP/ } ] }, { INVNAME: req.body.name  },{ PAN: pan  },{$or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
                ]
                transf.aggregate(pipeline2, (err, newdata) => {
                    transc.aggregate(pipeline, (err, newdata1) => {
                     transk.aggregate(pipeline1, (err, newdata2) => {
                   if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                       resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata2 
                         }
                       }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                       var datacon = newdata2.concat(newdata1.concat(newdata))
                       datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                      .reverse().map(JSON.parse) ;
                      for(var i=0; i<datacon.length; i++){
                        if(datacon[i]['TRXN_NATURE'] === "Gross Dividend"){
                            datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                        }if(datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/)){
                            datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                        }
                    }
                      resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                      res.json(resdata)
                      return resdata
                   });
               });
             });
        }else{
            const pipeline = [  ///trans_cams
                {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
                {$match :   { $and: [ { TRXN_NATURE:/Dividend/} , { PAN: pan },{ $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
            ]
              const pipeline1 = [  ///trans_karvy
                {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
                {$match :   { $and: [ { TRXN_NATURE:/Div/} , { PAN: pan }, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
                ]
                const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0, INVNAME:"$_id.INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { $or: [ {TRXN_NATURE: /DIR/ } ,{TRXN_NATURE: /DP/ } ] },{ PAN: pan } ,{$or: [ {year1: yer } ,{year2: secyer } ] } ] } },
                {$sort : { TRADDATE : -1}}
                ]
                transf.aggregate(pipeline2, (err, newdata) => {
                    transc.aggregate(pipeline, (err, newdata1) => {
                     transk.aggregate(pipeline1, (err, newdata2) => {
                   if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                       resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata2 
                         }
                       }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                       var datacon = newdata2.concat(newdata1.concat(newdata))
                       datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                      .reverse().map(JSON.parse) ;
                      for(var i=0; i<datacon.length; i++){
                        if(datacon[i]['TRXN_NATURE'] === "Gross Dividend"){
                            datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                        }if(datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/)){
                            datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                        }
                    }
                      resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                      res.json(resdata)
                      return resdata
                   });
               });
             });
        }
          
 });

 app.post("/api/getdividendscheme", function (req, res) {
    var yer = req.body.fromyear;
    var secyer =req.body.toyear;
            const pipeline = [  ///trans_cams                                                     
                {$match :   { $and: [ { TRXN_NATUR:/Div/} ,{ SCHEME: req.body.scheme },{ PAN: req.body.pan }, {TRADDATE:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {INV_NAME:"$INV_NAME",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE: "$TRADDATE"  }}}, 
                {$project : {_id:0,INVNAME:"$_id.INV_NAME" ,SCHEME:"$_id.SCHEME", TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT" , TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }  } }, 
            ]
            const pipeline1 = [  ///trans_karvy
                {$match :   { $and: [ { TRDESC:/Div/} ,{ FUNDDESC: req.body.scheme },{ PAN1: req.body.pan }, {TD_TRDT:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {INVNAME:"$INVNAME",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT: "$TD_TRDT"  }}}, 
                {$project : {_id:0,INVNAME:"$_id.INVNAME" ,SCHEME:"$_id.FUNDDESC",TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT" , TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }  } }, 
            ]
            const pipeline2 = [  ///trans_franklin
                {$match :   { $and: [ { TRXN_TYPE:/Div/} ,{ SCHEME_NA1: req.body.scheme },{ IT_PAN_NO1: req.body.pan }, {TRXN_DATE:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE: "$TRXN_DATE"  }}}, 
                {$project : {_id:0,INVNAME:"$_id.INVESTOR_2" ,SCHEME:"$_id.SCHEME_NA1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT" , TRADDATE:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }  } },               
            ]
               
                     transc.aggregate(pipeline, (err, newdata) => {
                      transk.aggregate(pipeline1, (err, newdata1) => {
                        transf.aggregate(pipeline2, (err, newdata2) => {
                    if(  newdata != 0 || newdata1 != 0 || newdata2 != 0){
                       resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata2
                         }
                       }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                        var datacon = newdata2.concat(newdata1.concat(newdata))
                       datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                      .reverse().map(JSON.parse) ;
                      for(var i=0; i<datacon.length; i++){
                        if(datacon[i]['TRXN_NATUR'] === "Gross Dividend"){
                            datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                        }if(datacon[i]['TRXN_NATUR'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATUR'].match(/Dividend Reinvest*/)){
                            datacon[i]['TRXN_NATUR'] = "Div. Reinv.";
                        }if(datacon[i]['TRXN_NATUR'].match(/Dividend Paid*/)){
                            datacon[i]['TRXN_NATUR'] = "Div. Paid";
                        }
                    }
                      resdata.data = datacon;
                        resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                    res.json(resdata)
                      return resdata
                   });
               });
             });        
 });

app.post("/api/getdividend", function (req, res) {
    var yer = req.body.fromyear;
    var secyer =req.body.toyear;
           const pipeline = [  ///trans_cams                                                     
                {$match :   { $and: [ { TRXN_NATUR:/Div/} ,{ PAN: req.body.pan }, {TRADDATE:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {SCHEME:"$SCHEME",INV_NAME:"$INV_NAME"} , AMOUNT:{$sum:"$AMOUNT"}}},
                {$project :   {_id:0,SCHEME:"$_id.SCHEME",INVNAME:"$_id.INV_NAME" , AMOUNT:{$sum:"$AMOUNT"} } }, 
            ]
            const pipeline1 = [  ///trans_karvy
                {$match :   { $and: [ { TRDESC:/Div/} ,{ PAN1: req.body.pan }, {TD_TRDT:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {FUNDDESC:"$FUNDDESC",INVNAME:"$INVNAME"} , AMOUNT:{$sum:"$TD_AMT"}}},
                {$project :   {_id:0,SCHEME:"$_id.FUNDDESC",INVNAME:"$_id.INVNAME" , AMOUNT:{$sum:"$TD_AMT"} } }, 
            ]
            const pipeline2 = [  ///trans_franklin
                {$match :   { $and: [ { TRXN_TYPE:/Div/} ,{ IT_PAN_NO1: req.body.pan }, {TRXN_DATE:{ $gte:new Date(moment(yer).format("YYYY-MM-DD")), $lt:new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                {$group :   {_id : {SCHEME_NA1:"$SCHEME_NA1",INVESTOR_2:"$INVESTOR_2"} , AMOUNT:{$sum:"$AMOUNT"}}},
                {$project :   {_id:0,SCHEME:"$_id.SCHEME_NA1",INVNAME:"$_id.INVESTOR_2" , AMOUNT:{$sum:"$AMOUNT"} } }, 
                
            ]
               
                     transc.aggregate(pipeline, (err, newdata) => {
                      transk.aggregate(pipeline1, (err, newdata1) => {
                        transf.aggregate(pipeline2, (err, newdata2) => {
                    if(  newdata != 0 || newdata1 != 0 || newdata2 != 0){
                       resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata
                         }
                       }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                       var datacon = newdata2.concat(newdata1.concat(newdata))
                       datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                      .reverse().map(JSON.parse) ;
                    // //   for(var i=0; i<datacon.length; i++){
                    // //     if(datacon[i]['TRXN_NATURE'] === "Gross Dividend"){
                    // //         datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                    // //     }if(datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/)){
                    // //         datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                    // //     }
                    // // }
                     resdata.data = datacon;
                    //   resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                    // console.log(newdata)
                    res.json(newdata)
                      return newdata
                   });
               });
             });        
 });
 
// app.get("/api/getamclist111", function (req, res) {
//     Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
//     {data:{ email:req.body.email}}
//     //{data:{ email:"sunilguptabfc@gmail.com"}}
//       ).then(function(result) {
//         if(result.data.data  === undefined || req.body.email == ''){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//         }else{          
//        if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//         }else{
//         var pan =  result.data.data.User[0].pan_card;
//         var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
//         var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
//         const pipeline = [
//             {"$match" : {pan_no:pan}}, 
//              {"$group" : {_id : {foliochk:"$foliochk", amc_code:"$amc_code", product:"$product"}}}, 
//              {"$project" : {_id:0, folio:"$_id.foliochk", amc_code:"$_id.amc_code", product_code:"$_id.product"}}
//         ]
//         const pipeline1 = [
//             {"$match" : {PAN:pan}}, 
//              {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE"}}}, 
//              {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE", product_code:"$_id.PRODCODE"}}
//         ]
//         folio.aggregate(pipeline, (err, newdata) => {
//           trans.aggregate(pipeline1, (err, newdata1) => {
//             if(newdata1.length != 0 || newdata.length != 0){     
//                              resdata= {
//                                 status:200,
//                                 message:'Successfull',
//                                 data:  newdata1 
//                               }
//                             }else{
//                                 resdata= {
//                                 status:400,
//                                 message:'Data not found',            
//                            }
//                             }
//                             var datacon = newdata.concat(newdata1)
//                             datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                             .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                             .reverse().map(JSON.parse) ;
//                              resdata.data = datacon
//                             //console.log("res="+JSON.stringify(resdata))
//                             res.json(resdata)  
//                             return resdata                    
//                         });
//                     });
//               }
//             }      
//     });    
//     })


app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:req.body.email}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        folioc.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
                foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                    transc.find({"PAN":pan}).distinct("FOLIO_NO", function (err, newdata3) { 
                        transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                    if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){    
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata4
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                            var removeduplicates = Array.from(new Set(datacon));
                            resdata.data = removeduplicates
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
                    });
                });
            });
        }
            }      
    });
    })
    app.get("/api/getapplicant1", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  //trans_cams
           // {$unwind: "$INVNAME"},
            {$group : {_id : {INV_NAME:{"$toUpper":["$INV_NAME"]}, PAN:"$PAN"}}}, 
         // {$project: {_id:0,INV_NAME:{"$toUpper":["$_id.INV_NAME"]},value:{ $concat: [  {"$toUpper":["$INV_NAME"]},"/","$PAN" ] } , label: { $concat: [  {"$toUpper":["$INV_NAME"]},"/","$PAN" ] }  } },
          {$project: {_id:0,INVNAME:{"$toUpper":["$_id.INV_NAME"]}, PAN:"$_id.PAN",value:{ $concat: [  {"$toUpper":["$_id.INV_NAME"]},"/","$_id.PAN" ] } , label: { $concat: [  {"$toUpper":["$_id.INV_NAME"]},"/","$_id.PAN" ] }  } },
        ]

       const pipeline1 = [  //trans_karvy
      //  {$unwind: "$INVNAME"},
        {$group : {_id : {INVNAME:{"$toUpper":["$INVNAME"]}, PAN1:"$PAN1"}}}, 
        //  {$project: {_id:0,INVNAME:{"$toUpper":["$_id.INVNAME"]},value:{ $concat: [ {"$toUpper":["$INVNAME"]},"/","$PAN1" ] } , label: { $concat: [ {"$toUpper":["$INVNAME"]},"/","$PAN1" ] }  } },
          {$project: {_id:0,INVNAME:{"$toUpper":["$_id.INVNAME"]}, PAN:"$_id.PAN1",value:{ $concat: [ {"$toUpper":["$_id.INVNAME"]},"/","$_id.PAN1" ] } , label: { $concat: [ {"$toUpper":["$_id.INVNAME"]},"/","$_id.PAN1" ] }  } },
        ]
       const pipeline2 = [ ///trans_franklin
       // {$unwind: "$INVNAME"},
        {$group : {_id : {INVESTOR_2:{"$toUpper":["$INVESTOR_2"]}, IT_PAN_NO1:"$IT_PAN_NO1"}}}, 
     // {$project: {_id:0,INVESTOR_2:{"$toUpper":["$_id.INVESTOR_2"]},value:{ $concat: [ {"$toUpper":["$INVESTOR_2"]},"/","$IT_PAN_NO1" ] } , label: { $concat: [ {"$toUpper":["$INVESTOR_2"]},"/","$IT_PAN_NO1" ] }  } },
        {$project: {_id:0,INVNAME:{"$toUpper":["$_id.INVESTOR_2"]}, PAN:"$_id.IT_PAN_NO1",value:{ $concat: [ {"$toUpper":["$_id.INVESTOR_2"]},"/","$_id.IT_PAN_NO1" ] } , label: { $concat: [ {"$toUpper":["$_id.INVESTOR_2"]},"/","$_id.IT_PAN_NO1" ] }  } },
      ]
             transc.aggregate(pipeline,  (err, newdata) => {
                  transk.aggregate(pipeline1,  (err, newdata1) => {
                    transf.aggregate(pipeline2,  (err, newdata2) => {
                                if( newdata2 != 0 || newdata1 != 0 || newdata != 0 ){ 
                            //        var datacon = newdata2
                                   var datacon =newdata2.concat(newdata1.concat(newdata))
                                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                      .reverse().map(JSON.parse) ;

                                     var arrObjTwo = Array.from(new Set(datacon));
                            //        let removedupli = arrObjTwo.filter( (ele, ind) => ind === arrObjTwo.findIndex( elem => elem.label === ele.label  ))
                            //        var result = removedupli.reduce((unique, o) => {
                            //         if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
                            //           unique.push(o);
                            //         }
                            //         return unique;
                            //     },[]);
                            //     //  //  console.log(result)
                            //        var gg = result.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.value===v.value))===i)
                            //   //    const unique = [...new Map(datacon.map(item => [item[key], item])).values()]
                                     res.json(arrObjTwo) 
                                    return arrObjTwo   
                                }
                          });
                   });
                });
    }) 
    
    app.get("/api/getapplicant", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  //trans_cams
            {"$group" : {_id : {INV_NAME:{"$toUpper":["$INV_NAME"]}, PAN:"$PAN"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INV_NAME"]}, PAN:"$_id.PAN"}}
       ]
       const pipeline1 = [  //trans_karvy
            {"$group" : {_id : {INVNAME:{"$toUpper":["$INVNAME"]}, PAN1:"$PAN1"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INVNAME"]}, PAN:"$_id.PAN1"}}
       ]
       const pipeline2 = [ ///trans_franklin
            {"$group" : {_id : {INVESTOR_2:{"$toUpper":["$INVESTOR_2"]}, IT_PAN_NO1:"$IT_PAN_NO1"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INVESTOR_2"]}, PAN:"$_id.IT_PAN_NO1"}}
       ]
            transc.aggregate(pipeline,  (err, newdata) => {
                transk.aggregate(pipeline1,  (err, newdata1) => {
                   transf.aggregate(pipeline2,  (err, newdata2) => {
                               if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){ 
                                   var datacon = newdata2.concat(newdata1.concat(newdata))
                                   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                      .reverse().map(JSON.parse) ;
                                res.json(datacon)    
                               }
                        });
                   });
                });
    })
    app.get("/api/getapplicantfolio", function (req, res) {
        // var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        // var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        // var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        //            const pipeline = [  //folio_cams
        //                 {"$group" : {_id : {INV_NAME:"$INV_NAME", PAN_NO:"$PAN_NO"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PAN_NO"}}
        //            ]
        //            const pipeline1 = [  //folio_karvy
        //                 {"$group" : {_id : {INVNAME:"$INVNAME", PANGNO:"$PANGNO"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INVNAME", PAN:"$_id.PANGNO"}}
        //            ]
        //            const pipeline2 = [ ///folio_franklin
        //                 {"$group" : {_id : {INV_NAME:"$INV_NAME", PANNO1:"$PANNO1"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PANNO1"}}
        //            ]
        //     folioc.aggregate(pipeline,  (err, newdata) => {
        //         foliok.aggregate(pipeline1,  (err, newdata1) => {
        //             foliof.aggregate(pipeline2,  (err, newdata2) => {
            var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
            var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
            //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                           const pipeline = [  //trans_cams
                                {"$group" : {_id : {INV_NAME:"$INV_NAME", PAN:"$PAN"}}}, 
                                {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PAN"}}
                           ]
                           const pipeline1 = [  //trans_karvy
                                {"$group" : {_id : {INVNAME:"$INVNAME", PAN1:"$PAN1"}}}, 
                                {"$project" : {_id:0, INVNAME:"$_id.INVNAME", PAN:"$_id.PAN1"}}
                           ]
                        //    const pipeline2 = [ ///trans_franklin
                        //         {"$group" : {_id : {INVESTOR_2:"$INVESTOR_2", IT_PAN_NO1:"$IT_PAN_NO1"}}}, 
                        //         {"$project" : {_id:0, INVNAME:"$_id.INVESTOR_2", PAN:"$_id.IT_PAN_NO1"}}
                        //    ]
                           transc.aggregate(pipeline,  (err, newdata) => {
                            transk.aggregate(pipeline1,  (err, newdata1) => {
                              //  transf.aggregate(pipeline2,  (err, newdata2) => {
                               if( newdata1.length != 0 || newdata.length != 0 ){ 
                                   var datacon = newdata1.concat(newdata)
                                   var removeduplicates = Array.from(new Set(datacon));
                                   res.json(removeduplicates)    
                               }
                       // });
                   });
                });
       })
    app.get("/api/getschemetype", function (req, res) {
     var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
          var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
            var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
            transc.find().distinct("SCHEME_TYPE", function (err, newdata) { 
               // foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
               //     foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                       transk.find().distinct("ASSETTYPE", function (err, newdata3) { 
               //             transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                      // if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){ 
                     
                               //var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                               var datacon = newdata3.concat(newdata)
                             // var removeduplicates = Array.from(new Set(datacon));
                             //  resdata.data = removeduplicates
                               res.json(datacon)    
                           });
                       });
                     //  });
                 //  });
             //  });
       //     }
       //         }      
       // });
       })
    
    app.get("/api/getportfolio1", function (req, res) {
        var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');    
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');   
        const pipeline1 = [  ///trans_karvy
            {"$match" : { INVNAME:req.query.name}},
            {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",SCHEMEISIN:"$SCHEMEISIN"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}}}, 
            {"$group" : {_id :{SCHEME:"$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",SCHEMEISIN:"$_id.SCHEMEISIN"},UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"}}},
           ]   
        
        //    const pipeline = [  ///cams_nav
        //     {"$match" : { ISINDivPayoutISINGrowth:req.body.num}},
        //     {"$group" : {_id :{NetAssetValue:"$NetAssetValue"}}}, 
        //     {"$group" : {_id :{NetAssetValue:"$_id.NetAssetValue"}}}
        //    ]    

        // const pipeline2 = [  ///trans_franklin
        //     {"$match" : { INVESTOR_2:req.body.name}}, 
        //     {"$group" : {_id : {SCHEME_NA1:"$SCHEME_NA1",UNITS:"$UNITS",AMOUNT:"$AMOUNT",FOLIO_NO:"$FOLIO_NO",TRXN_TYPE:"$TRXN_TYPE"}}}, 
        //     {"$project" : {_id:0,SCHEME:"$_id.SCHEME_NA1",UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT",FOLIO_NO:"$_id.FOLIO_NO",SCHEME_TYPE:"$_id.TRXN_TYPE"}}
        // ]     
              
        //var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
         
        //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
         //   transc.aggregate(pipeline, (err, data) => {
                transk.aggregate(pipeline1,  (err, data1) => {
                 //   camsn.aggregate(pipeline, (err, data2) => {
                    //transc.find({"inv_name":req.query.name},{_id:0,scheme:1,units:1,amount:1,folio_no:1,scheme_type:1}, function (err, data) {
                     //   if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if(data1 != 0 ){
                            if (err) {
                                res.send(err);
                            }
                            else {
                               //  var datacon = data2.concat(data1)
                                // var removeduplicates = Array.from(new Set(datacon));
                                // console.log("cams=",data)
                                // console.log("karvy=",data1)
                                // console.log("DATA=",data1)
                                 //console.log("DATA2=",data2)
                                res.send(data1);
                                return data1;
                            }
                         }
               // });
           // });
  });
})

app.post("/api/getschemepersonaldetail", function (req, res) {
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');   
    var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');   
    const pipeline1 = [  ///trans_karvy
        {"$match" : {"FUNDDESC":req.body.scheme,"PAN1": req.body.pan}}, 
        {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",INVNAME:"$INVNAME"}}}, 
        {"$project" : {_id:0 , SCHEME:"$_id.FUNDDESC",FOLIO:"$_id.TD_ACNO",INVNAME:"$_id.INVNAME"}},
       ]
       const pipeline11 = [  ///folio_karvy
        {"$match" : {"PANGNO": req.body.pan}}, 
        {"$group" : {_id :{PANGNO:"$PANGNO",NOMINEE:"$NOMINEE",BNAME:"$BNAME",JTNAME1:"$JTNAME1",JTNAME2:"$JTNAME2",BNKACNO:"$BNKACNO"}}}, 
        {"$project" : {_id:0 ,PAN:"$_id.PANGNO", NOMINEE:"$_id.NOMINEE",BNAME:"$_id.BNAME",JTNAME1:"$_id.JTNAME1",JTNAME2:"$_id.JTNAME2",BNKACNO:"$_id.BNKACNO"}},
       ]   
    
    //    const pipeline = [  ///cams_nav
    //     {"$match" : { ISINDivPayoutISINGrowth:req.body.num}},
    //     {"$group" : {_id :{NetAssetValue:"$NetAssetValue"}}}, 
    //     {"$group" : {_id :{NetAssetValue:"$_id.NetAssetValue"}}}
    //    ]    

    // const pipeline2 = [  ///trans_franklin
    //     {"$match" : { INVESTOR_2:req.body.name}}, 
    //     {"$group" : {_id : {SCHEME_NA1:"$SCHEME_NA1",UNITS:"$UNITS",AMOUNT:"$AMOUNT",FOLIO_NO:"$FOLIO_NO",TRXN_TYPE:"$TRXN_TYPE"}}}, 
    //     {"$project" : {_id:0,SCHEME:"$_id.SCHEME_NA1",UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT",FOLIO_NO:"$_id.FOLIO_NO",SCHEME_TYPE:"$_id.TRXN_TYPE"}}
    // ]     
          
    //var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
     
    //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
     //   transc.aggregate(pipeline, (err, data) => {
            transk.aggregate(pipeline1,  (err, data1) => {
                foliok.aggregate(pipeline11,  (err, data11) => {
             //   camsn.aggregate(pipeline, (err, data2) => {
                //transc.find({"inv_name":req.query.name},{_id:0,scheme:1,units:1,amount:1,folio_no:1,scheme_type:1}, function (err, data) {
                 //   if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                    if(data1 != 0 || data11 !=0 ){
                        if (err) {
                            res.send(err);
                        }
                        else {
                           //  var datacon = data2.concat(data1)
                            // var removeduplicates = Array.from(new Set(datacon));
                            // console.log("cams=",data)
                            // console.log("karvy=",data1)
                            // console.log("DATA=",data1)
                             //console.log("DATA2=",data2)
                             let merged =  data1.map((items, j) => Object.assign({}, items, data11[j]));
                            res.send(merged);
                            return merged;
                        }
                     }
            });
       // });
});
})
app.post("/api/getportfolio", function (req, res) {
        var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');    
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');   
        // const pipeline1 = [  ///trans_karvy
        //     {"$match" : { INVNAME:req.body.pan}},
        //     {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",SCHEMEISIN:"$SCHEMEISIN"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}}}, 
        //     {"$group" : {_id :{SCHEME:"$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",SCHEMEISIN:"$_id.SCHEMEISIN"},UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"}}},
        //    ]  
        //console.log(req.body.pan)
            // const pipeline1=[
            //     {$match : { PAN1:req.body.pan}},
            //     {$group : {_id :{FUNDDESC:"$FUNDDESC",SCHEMEISIN:"$SCHEMEISIN",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
            //     {$group :{_id:{ FUNDDESC:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",TD_ACNO:"$_id.TD_ACNO",ASSETTYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
            //     {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
            //     {$unwind: "$nav"},
            //     {$project :{_id:0, SCHEME:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue", UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }}
            //     ] 
            const pipeline1=[
                    {$match : { PAN1:req.body.pan }},
                    {$group : {_id :{PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",SCHEMEISIN:"$SCHEMEISIN",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} } },
                    {$group :{_id:{ PAN1:"$_id.PAN1",FUNDDESC:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",TD_ACNO:"$_id.TD_ACNO",ASSETTYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue" }, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}  }},
                    {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
                    {$unwind: "$nav"},
                    {$project :{_id:0,PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue", UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }},
                  //  {$project:  {_id:0,PAN1:"$_id.PAN1",NATURE:"$_id.TD_TRTYPE", TD_TRDT:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
                ] 
                transk.aggregate(pipeline1, (err, data1) => {
                                  if (err) {
                                      res.send(err);
                                  }
                                  else {
                                   //   data1 = data1.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime() )
                                   data1 = data1.sort((a, b) => (a.FOLIO_NO > b.FOLIO_NO) ? 1 : -1);
                                   res.send(data1);
                                      return data1;
                                  }
            
         });
    })

  app.get("/api/getpan", function (req, res) {  
    const pipeline = [  //trans_cams
        {"$match" : {PAN:req.query.pan}}, 
         {"$group" : {_id : {PAN:"$PAN", INV_NAME:{"$toUpper":["$INV_NAME"]} } }}, 
         {"$project" : {_id:0, PAN:"$_id.PAN", INV_NAME:{"$toUpper":["$_id.INV_NAME"]} }}
    ]   
    const pipeline1 = [  //trans_karvy
        {"$match" : {PAN1:req.query.pan}}, 
        {"$group" : {_id : {PAN1:"$PAN1", INVNAME:{"$toUpper":["$INVNAME"] }} }}, 
        {"$project" : {_id:0, PAN:"$_id.PAN1", INV_NAME:{"$toUpper":["$_id.INVNAME"] }}}
    ]   
    const pipeline2 = [   //trans_franklin
        {"$match" : {IT_PAN_NO1:req.query.pan}}, 
         {"$group" : {_id : {IT_PAN_NO1:"$IT_PAN_NO1", INVESTOR_2:{"$toUpper":["$INVESTOR_2"] } }}}, 
         {"$project" : {_id:0, PAN:"$_id.IT_PAN_NO1", INV_NAME:{"$toUpper":["$_id.INVESTOR_2"] }}}
    ]    
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
         transc.aggregate(pipeline, (err, data) => {
            transk.aggregate(pipeline1, (err, data1) => {
                transf.aggregate(pipeline2, (err, data2) => {
                    if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if (err) {
                            res.send(err);
                        }
                        else {
                            let merged = [];
                           merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
                            res.send(merged);
                            return merged;
                        }
                     }
                });
            });
        });
})

app.post("/api/getportfolioscheme", function (req, res) {  
    const pipeline = [  //trans_cams
        {"$match" : {PAN:req.body.pan}}, 
         {"$group" : {_id : {PAN:"$PAN", SCHEME:"$SCHEME",FOLIO_NO:"$FOLIO_NO" } }}, 
         {"$project" : {_id:0, PAN:"$_id.PAN", SCHEME:"$_id.SCHEME",FOLIO:"$_id.FOLIO_NO" }}
    ]   
    const pipeline1 = [  //trans_karvy
        {"$match" : {PAN1:req.body.pan}}, 
        {"$group" : {_id : {PAN1:"$PAN1", FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO"} }}, 
        {"$project" : {_id:0, PAN:"$_id.PAN1", SCHEME:"$_id.FUNDDESC",FOLIO:"$_id.TD_ACNO"}}
    ]   
    const pipeline2 = [   //trans_franklin
        {"$match" : {IT_PAN_NO1:req.body.pan}}, 
         {"$group" : {_id : {IT_PAN_NO1:"$IT_PAN_NO1", SCHEME_NA1:"$SCHEME_NA1",FOLIO_NO:"$FOLIO_NO" }}}, 
         {"$project" : {_id:0, PAN:"$_id.IT_PAN_NO1", SCHEME:"$_id.SCHEME_NA1",FOLIO:"$_id.FOLIO_NO" }}
    ]    
        transc.aggregate(pipeline, (err, data) => {
            transk.aggregate(pipeline1, (err, data1) => {
                transf.aggregate(pipeline2, (err, data2) => {
                    if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if (err) {
                            res.send(err);
                        }
                        else {
                            let merged = [];
                            merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
                            res.send(merged);
                            return merged;
                        }
                     }
                });
            });
        });
})

    app.get("/api/getfolio", function (req, res) {
          var transc = mongoose.model('trans_cams', transcams, 'trans_cams'); 
          var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');  
          var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');             
                // transc.find({"INV_NAME":req.query.name}).distinct("FOLIO_NO", function (err, data) {
                //   transk.find({"INVNAME":req.query.name}).distinct("TD_ACNO", function (err, data1) {
                //     transf.find({"INVESTOR_2":req.query.name}).distinct("FOLIO_NO", function (err, data2) {
                        transc.find({"PAN":req.query.pan}).distinct("FOLIO_NO", function (err, data) {
                          transk.find({"PAN1":req.query.pan}).distinct("TD_ACNO", function (err, data1) {
                            transf.find({"IT_PAN_NO1":req.query.pan}).distinct("FOLIO_NO", function (err, data2) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                            var datacon = data2.concat(data1.concat(data))
                            var removeduplicates = Array.from(new Set(datacon));
                            datacon = removeduplicates.map(JSON.stringify)
                                        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                        .filter(function(item, index, arr) {
                                        return arr.indexOf(item, index + 1) === -1;
                                        }) // check if there is any occurence of the item in whole array
                                        .reverse()
                                        .map(JSON.parse);
                                       // datacon = datacon.sort();
                                res.send(datacon);
                                return datacon;
                        }
                    });
                 });
               });
   })
    app.get("/api/getscheme", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');             
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');               
         transc.find({"FOLIO_NO":req.query.folio}).distinct("SCHEME", function (err, data) {  
            transk.find({"TD_ACNO":req.query.folio}).distinct("FUNDDESC", function (err, data1) {
               transf.find({"FOLIO_NO":req.query.folio}).distinct("SCHEME_NA1", function (err, data2) {
                
              if (err) {
                  res.send(err);
              }
              else {
                           var datacon = data2.concat(data1.concat(data))
                           var removeduplicates = Array.from(new Set(datacon));
                            res.send(removeduplicates);
                            return removeduplicates;
              }
            });
         });
        });
  })

//   app.get("/api/getfoliodetail", function (req, res) {  
//     const pipeline = [  //trans_cams
//         {"$match" : {"FOLIO_NO":req.query.folio,"SCHEME":req.query.scheme}}, 
//          {"$group" : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"},}}, 
//          {"$group" : {_id:  {INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}}}
//     ]  
//     const pipeline11 = [  //folio_karvy
//         {"$match" : {"ACNO":req.query.folio,"FUNDDESC":req.query.scheme}}, 
//         {"$group" :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
//         {"$project":{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
//    ]    
//    const pipeline1=[  //trans_karvy
//            {$match : {"TD_ACNO":req.query.folio,"FUNDDESC":req.query.scheme}}, 
//            {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
//            {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
//            {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//            {$group:  {_id:{INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue" } , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
//       ] 
  
//    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
//    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
//     var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');    
//    //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
//         transc.aggregate(pipeline, (err, data) => {
//            transk.aggregate(pipeline1, (err, data1) => {
//                foliok.aggregate(pipeline11, (err, data2) => {
//               // transf.aggregate(pipeline2, (err, data2) => {
//                    if(data2.length != 0  || data1.length != 0  || data.length != 0 ){
//                        if (err) {
//                            res.send(err);
//                        }
//                        else {
//                           let merged = [];
//                            merged = data1.map((item, i) => Object.assign({}, item, data2[i]));
//                           //merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
//                           console.log("merged=",merged)
//                           var datacon = data2.concat(data1.concat(data))
//                            var removeduplicates = Array.from(new Set(datacon));
//                             console.log("datacon=",datacon)
//                             console.log("data1=",data1)
//                             console.log("data2=",data2)
//                             console.log("data=",data)
//                           res.send(removeduplicates);
//                            return removeduplicates;
//                        }
//                     }
//                });
//            });
//        });
// })

  app.post("/api/getfoliodetailweb", function (req, res) {     
    const pipeline3 = [  //trans_cams
        {$match : {"FOLIO_NO":req.body.folio,"SCHEME":req.body.scheme}}, 
        {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
        {$lookup:
        {
        from: "products",
        let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
        pipeline: [
            { $match:
                { $expr:
                    { $and:
                    [
                        { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                        { $eq: [ "$AMC_CODE", "$$amc" ] }
                    ]
                    }
                }
            },
            { $project: {  _id: 0 } }
        ],
        as: "products"
        }},
        { $unwind: "$products"},
        {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
        {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
        { $unwind: "$nav"},
        {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
    ]
    const pipeline33 = [  //folio_cams
        {$match : {"FOLIOCHK":req.body.folio}}, 
        {$group :{_id :  {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO",NOM_NAME:"$NOM_NAME",JNT_NAME1:"$JNT_NAME1",JNT_NAME2:"$JNT_NAME2"} }}, 
        {$project:{_id:0,INVNAME:"$_id.INV_NAME", BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",NOMINEE:"$_id.NOM_NAME",JTNAME1:"$_id.JNT_NAME1",JTNAME2:"$_id.JNT_NAME2"}}
   ]    
    const pipeline11 = [  //folio_karvy
        {$match : {"ACNO":req.body.folio}}, 
        {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
        {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
   ]    
   const pipeline1=[  //trans_karvy
           {$match : {"TD_ACNO":req.body.folio,"FUNDDESC":req.body.scheme}}, 
           {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
           {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
           {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
            { $unwind: "$nav"},
           {$project:  {_id:0, INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
      ] 
      const pipeline2=[  //trans_franklin
        {$match : {"FOLIO_NO":req.body.folio,"SCHEME_NA1":req.body.scheme}}, 
        {$group :{_id : {INVESTOR_2:"$INVESTOR_2",ISIN:"$ISIN",NOMINEE1:"$NOMINEE1",PBANK_NAME:"$PBANK_NAME",PERSONAL23:"$PERSONAL23",JOINT_NAM2:"$JOINT_NAM2",JOINT_NAM1:"$JOINT_NAM1",cnav:"$nav.NetAssetValue"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"} }},
        {$group :{_id:{ INVESTOR_2:"$_id.INVESTOR_2",ISIN:"$_id.ISIN",NOMINEE1:"$_id.NOMINEE1",PBANK_NAME:"$_id.PBANK_NAME",PERSONAL23:"$_id.PERSONAL23",JOINT_NAM2:"$_id.JOINT_NAM2",JOINT_NAM1:"$_id.JOINT_NAM1",cnav:"$nav.NetAssetValue"}, UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }},
        {$lookup: { from: 'cams_nav',localField: '_id.ISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
         { $unwind: "$nav"},
        {$project:  {_id:0, INVNAME:"$_id.INVESTOR_2",SCHEMEISIN:"$_id.ISIN",NOMINEE:"$_id.NOMINEE1",BANK_NAME:"$_id.PBANK_NAME",AC_NO:"$_id.PERSONAL23",JTNAME2:"$_id.JOINT_NAM2",JTNAME1:"$_id.JOINT_NAM1", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
   ]         
  
   var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
   var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
    var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');    
    var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');   
     var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
        transc.aggregate(pipeline3, (err, newdata3) => {
            folioc.aggregate(pipeline33, (err, newdata33) => {
           transk.aggregate(pipeline1, (err, newdata1) => {
               foliok.aggregate(pipeline11, (err, newdata11) => {
                transf.aggregate(pipeline2, (err, newdata2) => {
                    if (
                        newdata2 != 0 ||
                        newdata1 != 0 ||
                        newdata3 != 0 ||
                        newdata33 != 0 ||
                        newdata11 != 0
                    ) {
                        resdata = {
                        status: 200,
                        message: "Successfull",
                        data: newdata2
                        };
                    } else {
                        resdata = {
                        status: 400,
                        message: "Data not found"
                        };
                    }
                    let merged3 =  newdata3.map((items, j) => Object.assign({}, items, newdata33[j]));

                    let merged1 =  newdata1.map((items, j) => Object.assign({}, items, newdata11[j]));
                      var datacon = merged3.concat(merged1.concat(newdata2));
                      datacon = datacon
                          .map(JSON.stringify)
                          .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                          .filter(function(item, index, arr) {
                          return arr.indexOf(item, index + 1) === -1;
                          }) // check if there is any occurence of the item in whole array
                          .reverse()
                          .map(JSON.parse);
                      resdata.data = datacon;
                      //console.log("res="+JSON.stringify(resdata))
                      res.json(resdata);
                      return resdata;

               });
            });
           });
       });
});
  })

app.post("/api/getfoliodetail", function (req, res) {     
                    const pipeline3 = [  //trans_cams
                        {$match : {"FOLIO_NO":req.body.folio,"AMC_CODE":req.body.amc_code,"PRODCODE":req.body.prodcode}}, 
                        {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
                        {$lookup:
                        {
                        from: "products",
                        let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
                        pipeline: [
                            { $match:
                                { $expr:
                                    { $and:
                                    [
                                        { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                                        { $eq: [ "$AMC_CODE", "$$amc" ] }
                                    ]
                                    }
                                }
                            },
                            { $project: {  _id: 0 } }
                        ],
                        as: "products"
                        }},
                        { $unwind: "$products"},
                        {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
                        {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
                        { $unwind: "$nav"},                                                                                                                                                        
                        {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  ,navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } } , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
                    ]
                    const pipeline11 = [  //folio_karvy
                        {$match : {"ACNO":req.body.folio}}, 
                        {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
                        {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
                   ]  
                   const pipeline33 = [  //folio_cams
                    {$match : {"FOLIOCHK":req.body.folio}}, 
                    {$group :{_id :  {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO",NOM_NAME:"$NOM_NAME",JNT_NAME1:"$JNT_NAME1",JNT_NAME2:"$JNT_NAME2"} }}, 
                    {$project:{_id:0,INVNAME:"$_id.INV_NAME", BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",NOMINEE:"$_id.NOM_NAME",JTNAME1:"$_id.JNT_NAME1",JTNAME2:"$_id.JNT_NAME2"}}
               ]    
                const pipeline1=[  //trans_karvy
                        {$match : {"TD_ACNO":req.body.folio,"SCHEMEISIN":req.body.isin}}, 
                        {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
                        {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
                        {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
                            { $unwind: "$nav"},
                        {$project:  {_id:0, INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue" ,navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } }  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
                    ] 
                    const pipeline2=[  //trans_franklin
                        {$match : {"FOLIO_NO":req.body.folio,"ISIN":req.body.isin}}, 
                        {$group :{_id : {INVESTOR_2:"$INVESTOR_2",ISIN:"$ISIN",NOMINEE1:"$NOMINEE1",PBANK_NAME:"$PBANK_NAME",PERSONAL23:"$PERSONAL23",JOINT_NAM2:"$JOINT_NAM2",JOINT_NAM1:"$JOINT_NAM1",cnav:"$nav.NetAssetValue"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"} }},
                        {$group :{_id:{ INVESTOR_2:"$_id.INVESTOR_2",ISIN:"$_id.ISIN",NOMINEE1:"$_id.NOMINEE1",PBANK_NAME:"$_id.PBANK_NAME",PERSONAL23:"$_id.PERSONAL23",JOINT_NAM2:"$_id.JOINT_NAM2",JOINT_NAM1:"$_id.JOINT_NAM1",cnav:"$nav.NetAssetValue"}, UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }},
                        {$lookup: { from: 'cams_nav',localField: '_id.ISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
                        { $unwind: "$nav"},
                        {$project:  {_id:0, INVNAME:"$_id.INVESTOR_2",SCHEMEISIN:"$_id.ISIN",NOMINEE:"$_id.NOMINEE1",BANK_NAME:"$_id.PBANK_NAME",AC_NO:"$_id.PERSONAL23",JTNAME2:"$_id.JOINT_NAM2",JTNAME1:"$_id.JOINT_NAM1", cnav:"$nav.NetAssetValue",navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } }   , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
                ] 
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
                    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
                     var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');  
                     var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');   
                    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
                    transc.aggregate(pipeline3, (err, newdata3) => {
                        folioc.aggregate(pipeline33, (err, newdata33) => {
                            transk.aggregate(pipeline1, (err, newdata1) => {
                                foliok.aggregate(pipeline11, (err, newdata11) => {
                                transf.aggregate(pipeline2, (err, newdata2) => {
                                    if (
                                        newdata2 != 0 ||
                                        newdata1 != 0 ||
                                        newdata3 != 0 ||
                                        newdata33 != 0 ||
                                        newdata11 != 0
                                    ) {
                                        resdata = {
                                        status: 200,
                                        message: "Successfull",
                                        data: newdata2
                                        };
                                    } else {
                                        resdata = {
                                        status: 400,
                                        message: "Data not found"
                                        };
                                    }
                                  let merged3 =  newdata3.map((items, j) => Object.assign({}, items, newdata33[j]));
                                  let merged1 =  newdata1.map((items, j) => Object.assign({}, items, newdata11[j]));
                                    var datacon = merged3.concat(merged1.concat(newdata2));
                                    datacon = datacon
                                        .map(JSON.stringify)
                                        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                        .filter(function(item, index, arr) {
                                        return arr.indexOf(item, index + 1) === -1;
                                        }) // check if there is any occurence of the item in whole array
                                        .reverse()
                                        .map(JSON.parse);
                                    resdata.data = datacon;
                                    //console.log("res="+JSON.stringify(resdata))
                                    res.json(resdata);
                                    return resdata;
                                    });  
                              });
                            });
                        });
                    })
}) 

app.post("/api/getschemedetail", function (req, res) {     
//     const pipeline3 = [  //trans_cams
//         {$match : {"FOLIO_NO":req.body.folio,"AMC_CODE":req.body.amc_code,"PRODCODE":req.body.prodcode}}, 
//         {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
//         {$lookup:
//         {
//         from: "products",
//         let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
//         pipeline: [
//             { $match:
//                 { $expr:
//                     { $and:
//                     [
//                         { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
//                         { $eq: [ "$AMC_CODE", "$$amc" ] }
//                     ]
//                     }
//                 }
//             },
//             { $project: {  _id: 0 } }
//         ],
//         as: "products"
//         }},
//         { $unwind: "$products"},
//         {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
//         {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//         { $unwind: "$nav"},
//         {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
//     ]
//     const pipeline11 = [  //folio_karvy
//         {$match : {"ACNO":req.body.folio}}, 
//         {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
//         {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
//    ]  
//    const pipeline33 = [  //folio_cams
//     {$match : {"FOLIOCHK":req.body.folio}}, 
//     {$group :{_id :  {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO",NOM_NAME:"$NOM_NAME",JNT_NAME1:"$JNT_NAME1",JNT_NAME2:"$JNT_NAME2"} }}, 
//     {$project:{_id:0,INVNAME:"$_id.INV_NAME", BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",NOMINEE:"$_id.NOM_NAME",JTNAME1:"$_id.JNT_NAME1",JTNAME2:"$_id.JNT_NAME2"}}
// ]    
const pipeline1=[  //trans_karvy    "TD_TRTYPE":{$not: /^SINR.*/}
        {$match : {"FUNDDESC":req.body.scheme,"PAN1": req.body.pan  }}, 
        {$group :{_id : {PAN1:"$PAN1",TD_NAV:"$TD_NAV",TD_TRTYPE:"$TD_TRTYPE",TD_TRDT:"$TD_TRDT",TRDESC:"$TRDESC",INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
        {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
     //   { $unwind: "$nav"},
        {$project:  {_id:0,PAN:"$_id.PAN1",TD_NAV:"$_id.TD_NAV",NATURE:"$_id.TD_TRTYPE", TD_TRDT:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
      //  {$sort : {TD_TRDT : -1}}
    ] 
        // const pipeline1=[  //trans_karvy   
        //     {$match : {"FUNDDESC":req.body.scheme,"PAN1": req.body.pan  }}, 
        //     {$group :{_id : {PAN1:"$PAN1",TD_TRTYPE:"$TD_TRTYPE",TD_TRDT:"$TD_TRDT",TRDESC:"$TRDESC",INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
        //     {$group :{_id:{PAN1:"$_id.PAN1",TD_TRTYPE:"$_id.TD_TRTYPE",TD_TRDT:"$_id.TD_TRDT", TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
           
           
           
           
           
        //     {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
        //     { $unwind: "$nav"},
        //     {$project:  {_id:0,PAN1:"$_id.PAN1",NATURE:"$_id.TD_TRTYPE", TD_TRDT:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
        //     //{$sort : {TD_TRDT : -1}}
        //     ] 
    
//     const pipeline2=[  //trans_franklin
//         {$match : {"FOLIO_NO":req.body.folio,"ISIN":req.body.isin}}, 
//         {$group :{_id : {INVESTOR_2:"$INVESTOR_2",ISIN:"$ISIN",NOMINEE1:"$NOMINEE1",PBANK_NAME:"$PBANK_NAME",PERSONAL23:"$PERSONAL23",JOINT_NAM2:"$JOINT_NAM2",JOINT_NAM1:"$JOINT_NAM1",cnav:"$nav.NetAssetValue"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"} }},
//         {$group :{_id:{ INVESTOR_2:"$_id.INVESTOR_2",ISIN:"$_id.ISIN",NOMINEE1:"$_id.NOMINEE1",PBANK_NAME:"$_id.PBANK_NAME",PERSONAL23:"$_id.PERSONAL23",JOINT_NAM2:"$_id.JOINT_NAM2",JOINT_NAM1:"$_id.JOINT_NAM1",cnav:"$nav.NetAssetValue"}, UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }},
//         {$lookup: { from: 'cams_nav',localField: '_id.ISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//         { $unwind: "$nav"},
//         {$project:  {_id:0, INVNAME:"$_id.INVESTOR_2",SCHEMEISIN:"$_id.ISIN",NOMINEE:"$_id.NOMINEE1",BANK_NAME:"$_id.PBANK_NAME",AC_NO:"$_id.PERSONAL23",JTNAME2:"$_id.JOINT_NAM2",JTNAME1:"$_id.JOINT_NAM1", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
// ] 
     
    // transc.aggregate(pipeline3, (err, newdata3) => {
    //     folioc.aggregate(pipeline33, (err, newdata33) => {
            transk.aggregate(pipeline1, (err, newdata1) => {
                // foliok.aggregate(pipeline11, (err, newdata11) => {
                // transf.aggregate(pipeline2, (err, newdata2) => {
                    // if (
                    //     newdata2 != 0 ||
                    //     newdata1 != 0 ||
                    //     newdata3 != 0 ||
                    //     newdata33 != 0 ||
                    //     newdata11 != 0
                    // ) {
                        if(newdata1 != 0){
                        resdata = {
                        status: 200,
                        message: "Successfull",
                        data: newdata1
                        };
                    } else {
                        resdata = {
                        status: 400,
                        message: "Data not found"
                        };
                    }
                //   let merged3 =  newdata3.map((items, j) => Object.assign({}, items, newdata33[j]));
                //   let merged1 =  newdata1.map((items, j) => Object.assign({}, items, newdata11[j]));
                //     var datacon = merged3.concat(merged1.concat(newdata2));
                //     datacon = datacon
                //         .map(JSON.stringify)
                //         .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                //         .filter(function(item, index, arr) {
                //         return arr.indexOf(item, index + 1) === -1;
                //         }) // check if there is any occurence of the item in whole array
                //         .reverse()
                //         .map(JSON.parse);
                    //resdata.data = newdata1;
                    resdata.data = newdata1.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime() )
                    //console.log("res="+JSON.stringify(resdata))
                    res.json(resdata);
                    return resdata;
                //    });  
        //       });
        //     });
        // });
    })
}) 

app.post("/api/getschemeportfoliodetail", function (req, res) {     
    //     const pipeline3 = [  //trans_cams
    //         {$match : {"FOLIO_NO":req.body.folio,"AMC_CODE":req.body.amc_code,"PRODCODE":req.body.prodcode}}, 
    //         {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
    //         {$lookup:
    //         {
    //         from: "products",
    //         let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
    //         pipeline: [
    //             { $match:
    //                 { $expr:
    //                     { $and:
    //                     [
    //                         { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
    //                         { $eq: [ "$AMC_CODE", "$$amc" ] }
    //                     ]
    //                     }
    //                 }
    //             },
    //             { $project: {  _id: 0 } }
    //         ],
    //         as: "products"
    //         }},
    //         { $unwind: "$products"},
    //         {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
    //         {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
    //         { $unwind: "$nav"},
    //         {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
    //     ]
    //     const pipeline11 = [  //folio_karvy
    //         {$match : {"ACNO":req.body.folio}}, 
    //         {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
    //         {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
    //    ]  
    //    const pipeline33 = [  //folio_cams
    //     {$match : {"FOLIOCHK":req.body.folio}}, 
    //     {$group :{_id :  {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO",NOM_NAME:"$NOM_NAME",JNT_NAME1:"$JNT_NAME1",JNT_NAME2:"$JNT_NAME2"} }}, 
    //     {$project:{_id:0,INVNAME:"$_id.INV_NAME", BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",NOMINEE:"$_id.NOM_NAME",JTNAME1:"$_id.JNT_NAME1",JTNAME2:"$_id.JNT_NAME2"}}
    // ]    
    const pipeline1=[  //trans_karvy    "TD_TRTYPE":{$not: /^SINR.*/}
            {$match : {"FUNDDESC":req.body.scheme,"PAN1": req.body.pan  }}, 
            {$group :{_id : {PAN1:"$PAN1",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_TRTYPE:"$TD_TRTYPE",TD_TRDT:"$TD_TRDT",TRDESC:"$TRDESC",INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
         //   {$group :{_id:{PAN1:"$_id.PAN1",TD_ACNO:"$_id.TD_ACNO",FUNDDESC:"$_id.FUNDDESC",TD_TRTYPE:"$_id.TD_TRTYPE",TD_TRDT:"$_id.TD_TRDT", TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
            {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
          //  { $unwind: "$nav"},
            {$project:  {_id:0,PAN:"$_id.PAN1",FOLIO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",NATURE:"$_id.TD_TRTYPE", TD_TRDT:{ $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, TRDESC:"$_id.TRDESC", INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
            //{$sort : {TD_TRDT : -1}}
        ] 
    //     const pipeline2=[  //trans_franklin
    //         {$match : {"FOLIO_NO":req.body.folio,"ISIN":req.body.isin}}, 
    //         {$group :{_id : {INVESTOR_2:"$INVESTOR_2",ISIN:"$ISIN",NOMINEE1:"$NOMINEE1",PBANK_NAME:"$PBANK_NAME",PERSONAL23:"$PERSONAL23",JOINT_NAM2:"$JOINT_NAM2",JOINT_NAM1:"$JOINT_NAM1",cnav:"$nav.NetAssetValue"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"} }},
    //         {$group :{_id:{ INVESTOR_2:"$_id.INVESTOR_2",ISIN:"$_id.ISIN",NOMINEE1:"$_id.NOMINEE1",PBANK_NAME:"$_id.PBANK_NAME",PERSONAL23:"$_id.PERSONAL23",JOINT_NAM2:"$_id.JOINT_NAM2",JOINT_NAM1:"$_id.JOINT_NAM1",cnav:"$nav.NetAssetValue"}, UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }},
    //         {$lookup: { from: 'cams_nav',localField: '_id.ISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
    //         { $unwind: "$nav"},
    //         {$project:  {_id:0, INVNAME:"$_id.INVESTOR_2",SCHEMEISIN:"$_id.ISIN",NOMINEE:"$_id.NOMINEE1",BANK_NAME:"$_id.PBANK_NAME",AC_NO:"$_id.PERSONAL23",JTNAME2:"$_id.JOINT_NAM2",JTNAME1:"$_id.JOINT_NAM1", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
    // ] 
         
        // transc.aggregate(pipeline3, (err, newdata3) => {
        //     folioc.aggregate(pipeline33, (err, newdata33) => {
                transk.aggregate(pipeline1, (err, newdata1) => {
                    // foliok.aggregate(pipeline11, (err, newdata11) => {
                    // transf.aggregate(pipeline2, (err, newdata2) => {
                        // if (
                        //     newdata2 != 0 ||
                        //     newdata1 != 0 ||
                        //     newdata3 != 0 ||
                        //     newdata33 != 0 ||
                        //     newdata11 != 0
                        // ) {
                            if(newdata1 != 0){
                            resdata = {
                            status: 200,
                            message: "Successfull",
                            data: newdata1
                            };
                        } else {
                            resdata = {
                            status: 400,
                            message: "Data not found"
                            };
                        }
                    //   let merged3 =  newdata3.map((items, j) => Object.assign({}, items, newdata33[j]));
                    //   let merged1 =  newdata1.map((items, j) => Object.assign({}, items, newdata11[j]));
                    //     var datacon = merged3.concat(merged1.concat(newdata2));
                    //     datacon = datacon
                    //         .map(JSON.stringify)
                    //         .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    //         .filter(function(item, index, arr) {
                    //         return arr.indexOf(item, index + 1) === -1;
                    //         }) // check if there is any occurence of the item in whole array
                    //         .reverse()
                    //         .map(JSON.parse);
                        //resdata.data = newdata1;
                        resdata.data = newdata1.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime() )
                        //console.log("res="+JSON.stringify(resdata))
                        res.json(resdata);
                        return resdata;
                    //    });  
            //       });
            //     });
            // });
        })
    }) 
// app.post("/api/getamclist", function(req, res) {
//     var resdata = "";
//           if(req.body.email === "" || req.body.email === "undefined" || req.body === ''){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//           }else{

//           Axios.get("https://prodigyfinallive.herokuapp.com/users/"+req.body.email
//     ).then(function(result) {
//         if(result.data.data === undefined && result.data.data === '' && req.body.email === ''){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//         }else{ 
//             if(
//                 result.data.data === undefined &&
//                 result.data.data === "" && 
//                 result.data.data.pan_card === "" 
//                 ){
//                    resdata= {
//                        status:402,
//                        message:'Data not found',            
//                   }
//                   res.json(resdata) 
//                   return resdata;
//                }else{
//                var pan =  result.data.data.pan_card;
//           var folioc = mongoose.model("folio_cams", foliocams, "folio_cams");
//           //var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
//           var transc = mongoose.model("trans_cams", transcams, "trans_cams");
//           var transk = mongoose.model("trans_karvy", transkarvy, "trans_karvy");
//           //var transk = mongoose.model("trans_franklin", transfranklin, "trans_franklin");
//           const pipeline = [
//             //folio_cams
//             { $match: { PAN_NO: pan } },
//             { $group: { _id: { FOLIOCHK: "$FOLIOCHK", AMC_CODE: "$AMC_CODE" } } },
//             {
//               $project: {
//                 _id: 0,
//                 folio: "$_id.FOLIOCHK",
//                 amc_code: "$_id.AMC_CODE"
//               }
//             }
//           ];
//           // 	const pipeline3 = [ //folio_karvy
//           //             {"$match" : {PAN:pan}},
//           //              {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE"}}},
//           //              {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE"}}
//           //         ]
//           const pipeline1 = [
//             //trans_cams
//             { $match: { PAN: pan } },
//             { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" } } },
//             {
//               $project: {
//                 _id: 0,
//                 folio: "$_id.FOLIO_NO",
//                 amc_code: "$_id.AMC_CODE"
//               }
//             }
//           ];
//           const pipeline2 = [
//             //trans_karvy
//             { $match: { PAN1: pan } },
//             { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" } } },
//             {
//               $project: {
//                 _id: 0,
//                 folio: "$_id.TD_ACNO",
//                 amc_code: "$_id.TD_FUND"
//               }
//             }
//           ];
//         //   const pipeline3 = [
//         //     //trans_franklin
//         //     { $match: { IT_PAN_NO1: pan } },
//         //     { $group: { _id: { FOLIO_NO: "$FOLIO_NO", TD_FUND: "$TD_FUND" } } },
//         //     {
//         //       $project: {
//         //         _id: 0,
//         //         folio: "$_id.FOLIO_NO",
//         //         amc_code: "$_id.TD_FUND"
//         //       }
//         //     }
//         //   ];
//           folioc.aggregate(pipeline, (err, newdata) => {
//             transc.aggregate(pipeline1, (err, newdata1) => {
//               transk.aggregate(pipeline2, (err, newdata2) => {
//                 if (
//                   newdata2.length != 0 ||
//                   newdata1.length != 0 ||
//                   newdata.length != 0
//                 ) {
//                   resdata = {
//                     status: 200,
//                     message: "Successfull",
//                     data: newdata2
//                   };
//                 } else {
//                   resdata = {
//                     status: 403,
//                     message: "Data not found"
//                   };
//                 }
//                 var datacon = newdata.concat(newdata1.concat(newdata2));
//                 datacon = datacon
//                   .map(JSON.stringify)
//                   .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                   .filter(function(item, index, arr) {
//                     return arr.indexOf(item, index + 1) === -1;
//                   }) // check if there is any occurence of the item in whole array
//                   .reverse()
//                   .map(JSON.parse);
//                 resdata.data = datacon;
//                 //console.log("res="+JSON.stringify(resdata))
//                 res.json(resdata);
//                 return resdata;
//               });
//             });
//           });
//         }
//       }
//     }) .catch(function (err) {
//         //console.log('ERROR: ', err)
//         resdata= {
//             status:400,
//             message:'Data not Found',            
//     }
//     res.json(resdata)  
//     return resdata 
//     })
// }
//   });

app.post("/api/getamclist", function(req, res) { 
    if(req.body.pan === "" || req.body.pan === undefined || req.body === "" || req.body.pan === null){
                    resdata= {
                        status:400,
                        message:'Data not found',            
                   }
                   res.json(resdata) 
                   return resdata;
                  }else{
                    var pan = req.body.pan;
    var folioc = mongoose.model("folio_cams", foliocams, "folio_cams");
    //var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    var transc = mongoose.model("trans_cams", transcams, "trans_cams");
    var transk = mongoose.model("trans_karvy", transkarvy, "trans_karvy");
    const pipeline = [
      //folio_cams
      { $match: { PAN_NO: pan } },
      { $group: { _id: { FOLIOCHK: "$FOLIOCHK", AMC_CODE: "$AMC_CODE" , SCH_NAME:"$SCH_NAME" } } },
      {
        $project: {
          _id: 0,
          folio: "$_id.FOLIOCHK",
          amc_code: "$_id.AMC_CODE",
          scheme:"$_id.SCH_NAME"
        }
      },
      {$sort: {scheme: 1}}
    ];
    // 	const pipeline3 = [ //folio_karvy
    //             {"$match" : {PAN:pan}},
    //              {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE"}}},
    //              {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE"}}
    //         ]
    const pipeline1 = [
      //trans_cams
      { $match: { PAN: pan } },
      { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" , SCHEME:"$SCHEME" } } },
      {
        $project: {
          _id: 0,
          folio: "$_id.FOLIO_NO",
          amc_code: "$_id.AMC_CODE",
          scheme:"$_id.SCHEME"
        }
      }, {$sort: {scheme: 1}}
    ];
    const pipeline2 = [
      //trans_karvy
      { $match: { PAN1: pan } },
      { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" , FUNDDESC:"$FUNDDESC"} } },
      {
        $project: {
          _id: 0,
          folio: "$_id.TD_ACNO",
          amc_code: "$_id.TD_FUND",
          scheme:"$_id.FUNDDESC"
        }
      }, {$sort: {scheme: 1}}
    ];
    folioc.aggregate(pipeline, (err, newdata) => {
      transc.aggregate(pipeline1, (err, newdata1) => {
        transk.aggregate(pipeline2, (err, newdata2) => {
          if (
            newdata2.length != 0 ||
            newdata1.length != 0 ||
            newdata.length != 0
          ) {
            resdata = {
              status: 200,
              message: "Successfull",
              data: newdata2
            };
          } else {
            resdata = {
              status: 400,
              message: "Data not found"
            };
          }
          var datacon = newdata.concat(newdata1.concat(newdata2));
          datacon = datacon
            .map(JSON.stringify)
            .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function(item, index, arr) {
              return arr.indexOf(item, index + 1) === -1;
            }) // check if there is any occurence of the item in whole array
            .reverse()
            .map(JSON.parse);
            resdata.data = datacon.sort((a, b) => (a.scheme > b.scheme) ? 1 : -1);
            for(var i=0; i<datacon.length; i++){
                //console.log(datacon[i]['amc_code']);
                if(datacon[i]['amc_code'] != "" &&  datacon[i]['folio'] != "" &&  datacon[i]['scheme'] != ""){
                  resdata.data = datacon[i];
                 
                }
            }
          res.json(resdata);
          return resdata;
        });
      });
    });
                  }
});


    //    app.post("/api/getschemelist", function (req, res) {
    //     var resdata="";
      
    //       //Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    //       //{data:{ email:req.body.email}}
    //       if(req.body.email === "" || req.body.email === "undefined" || req.body === ''){
    //         resdata= {
    //             status:400,
    //             message:'Data not found',            
    //        }
    //        res.json(resdata) 
    //        return resdata;
    //       }else{

    //       Axios.get("https://prodigyfinallive.herokuapp.com/users/"+req.body.email

    //          ).then(function(result) {
    //            if(result.data.data === undefined && result.data.data === '' && req.body.email === ''){
    //                resdata= {
    //                    status:400,
    //                    message:'Data not found',            
    //               }
    //               res.json(resdata) 
    //               return resdata;
    //            }else{          
    //           if(
    //             result.data.data === undefined &&
    //             result.data.data === "" && 
    //             result.data.data.pan_card === "" 
    //             ){
    //                resdata= {
    //                    status:402,
    //                    message:'Data not found',            
    //               }
    //               res.json(resdata) 
    //               return resdata;
    //            }else{
    //            var pan =  result.data.data.pan_card;
    //             var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    //             var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    //             var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    //            const pipeline = [
    //                     {$match : {PAN:pan}},
    //                     {$group : {_id : { AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} }  }}},
    //                     {$lookup:
    //                     {
    //                     from: "products",
    //                     let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
    //                     pipeline: [
    //                         { $match:
    //                             { $expr:
    //                                 { $and:
    //                                 [
    //                                     { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
    //                                     { $eq: [ "$AMC_CODE", "$$amc" ] }
    //                                 ]
    //                                 }
    //                             }
    //                         },
    //                         { $project: {  _id: 0 } }
    //                     ],
    //                     as: "products"
    //                     }},
    //                     { $unwind: "$products"},
    //                     {$project :{ _id:0 , products:"$products" } },
    //                ]
    //             const pipeline1=[  //trans_karvy
    //                 {$match : {PAN1:pan,SCHEMEISIN : {$ne : null}}}, 
    //                 {$group : {_id:{SCHEMEISIN:"$SCHEMEISIN"} }},
    //                 {$lookup: { from: 'products',localField: '_id.SCHEMEISIN',foreignField: 'ISIN',as: 'master' } },
    //                 { $unwind: "$master"},
    //                 {$project:{_id:0,products:"$master" }   },
    //            ] 
    //             const pipeline2=[ ///trans_franklin
    //                 {$match : {IT_PAN_NO1:pan,ISIN : {$ne : null}}}, 
    //                 {$group : {_id:{ISIN:"$ISIN"} }},
    //                 {$lookup: { from: 'products',localField: '_id.ISIN',foreignField: 'ISIN',as: 'master' } },
    //                 { $unwind: "$master"},
    //                 {$project:{_id:0,products:"$master" }   },
    //           ] 
    //             transc.aggregate(pipeline, (err, newdata2) => {
    //                transf.aggregate(pipeline2, (err, newdata1) => {
    //                     transk.aggregate(pipeline1, (err, newdata) => {
    //                            if(newdata2.length != 0  || newdata1.length != 0 || newdata.length != 0){        
    //                                 resdata= {
    //                                    status:200,
    //                                    message:'Successfull',
    //                                    data:  newdata2
    //                                  }
    //                                }else{
    //                                    resdata= {
    //                                    status:400,
    //                                    message:'Data not found',            
    //                               }
    //                                }
    //                                var datacon = newdata2.concat(newdata1.concat(newdata))
    //                                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
    //                                .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
    //                                .reverse().map(JSON.parse) ;
    //                                 resdata.data = datacon
    //                                res.json(resdata)  
    //                                return resdata    
                                           
    //                       });
    //                    });
          
    //                  });   
                    
    //              }   
    //           }
    //         }) .catch(function (err) {
    //             //console.log('ERROR: ', err)
    //             resdata= {
    //                 status:400,
    //                 message:'Data not Found',            
    //         }
    //         res.json(resdata)  
    //         return resdata 
    //         })

    //     }
   
    //        })

    app.post("/api/getschemelist", function (req, res) {
        if(req.body.pan === "" || req.body.pan === undefined || req.body === "" || req.body.pan === null){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
          }else{
        var pan = req.body.pan;
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
       const pipeline = [
                {$match : {PAN:pan}},
                {$group : {_id : { AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} }  }}},
                {$lookup:
                {
                from: "products",
                let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                            [
                                { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                                { $eq: [ "$AMC_CODE", "$$amc" ] }
                            ]
                            }
                        }
                    },
                    { $project: {  _id: 0 } }
                ],
                as: "products"
                }},
              
                { $unwind: "$products"},
                //  {$sort: {products.PRODUCT_LONG_NAME: 1}},
                {$project :{ _id:0 , products:"$products" } },
           ]
        const pipeline1=[  //trans_karvy
            {$match : {PAN1:pan,SCHEMEISIN : {$ne : null}}}, 
            {$group : {_id:{SCHEMEISIN:"$SCHEMEISIN"} }},
            {$lookup: { from: 'products',localField: '_id.SCHEMEISIN',foreignField: 'ISIN',as: 'master' } },
            { $unwind: "$master"},
            {$project:{_id:0,products:"$master" }   },
            
       ] 
        const pipeline2=[ ///trans_franklin
            {$match : {IT_PAN_NO1:pan,ISIN : {$ne : null}}}, 
            {$group : {_id:{ISIN:"$ISIN"} }},
            {$lookup: { from: 'products',localField: '_id.ISIN',foreignField: 'ISIN',as: 'master' } },
            { $unwind: "$master"},
            {$project:{_id:0,products:"$master" }   },
      ] 
        transc.aggregate(pipeline, (err, newdata2) => {
           transf.aggregate(pipeline2, (err, newdata1) => {
                transk.aggregate(pipeline1, (err, newdata) => {
                       if(newdata2.length != 0  || newdata1.length != 0 || newdata.length != 0){        
                            resdata= {
                               status:200,
                               message:'Successfull',
                               data:  newdata2
                             }
                           }else{
                               resdata= {
                               status:400,
                               message:'Data not found',            
                          }
                           }
                           var datacon = newdata2.concat(newdata1.concat(newdata))
                           datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                           .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                           .reverse().map(JSON.parse) ;
                           resdata.data = datacon.sort((a, b) => (a.products.PRODUCT_LONG_NAME > b.products.PRODUCT_LONG_NAME) ? 1 : -1);
                           //console.log(datacon)
                            // resdata.data = datacon
                            // PRODUCT_LONG_NAME
                           res.json(resdata)  
                           return resdata    
                                   
                  });
               });
  
             });   
            }  
        })  


app.post("/api/savefoliocams", function (req, res) {
        for (i = 0; i < req.body.length; i++) {   
            folioc.updateMany(
                            { FOLIOCHK: req.body[i].FOLIOCHK , PRODUCT: req.body[i].PRODUCT }, 
                            {$set: 
                                { AMC_CODE : req.body[i].AMC_CODE ,
                                FOLIOCHK : req.body[i].FOLIOCHK ,
                                INV_NAME: req.body[i].INV_NAME ,
                                SCH_NAME : req.body[i].SCH_NAME ,
                                JNT_NAME1 : req.body[i].JNT_NAME1 ,
                                JNT_NAME2 : req.body[i].JNT_NAME2 ,
                                HOLDING_NATURE : req.body[i].HOLDING_NATURE ,
                                PAN_NO : req.body[i].PAN_NO ,
                                JOINT1_PAN : req.body[i].JOINT1_PAN ,
                                AC_NO : req.body[i].AC_NO ,
                                NOM_NAME : req.body[i].NOM_NAME ,
                                NOM2_NAME : req.body[i].NOM2_NAME ,
                                NOM3_NAME : req.body[i].NOM3_NAME ,
                                IFSC_CODE : req.body[i].IFSC_CODE ,
                                PRODUCT : req.body[i].PRODUCT ,
                                BANK_NAME : req.body[i].BANK_NAME ,
                            }}, 
                            {
                                "upsert":true
                            }, 
                            function(err, object) {
                                if (err){
                                    console.warn(err.message);  // returns error if no matching object found
                                }
             })
        }
        console.log("successfully inserted")
 })


 app.post("/api/savefoliokarvy", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
        foliok.updateMany(
                        { ACNO: req.body[i].ACNO , FUNDDESC: req.body[i].FUNDDESC , BNKACNO: req.body[i].BNKACNO , BNKACTYPE: req.body[i].BNKACTYPE, BNKACNO : req.body[i].BNKACNO}, 
                        {$set: 
                            {
                            INVNAME: req.body[i].INVNAME ,
                            JTNAME1 : req.body[i].JTNAME1 ,
                            JTNAME2 : req.body[i].JTNAME2 ,
                            BNKACNO : req.body[i].BNKACNO ,
                            BNAME : req.body[i].BNAME ,
                            PANGNO : req.body[i].PANGNO ,
                            NOMINEE : req.body[i].NOMINEE ,
                            FUNDDESC : req.body[i].FUNDDESC ,
                            ACNO : req.body[i].ACNO ,
                            PRCODE: req.body[i].PRCODE ,
                            FUND: req.body[i].FUND ,
                            BNKACTYPE : req.body[i].BNKACTYPE ,
                        }}, 
                        {
                            "upsert":true
                        }, 
                        function(err, object) {
                            if (err){
                                console.warn(err.message);  // returns error if no matching object found
                            }
         })
    }
    console.log("successfully inserted")
})

app.post("/api/savefoliofranklin", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
        foliof.updateMany(
                        { FOLIO_NO: req.body[i].FOLIO_NO  }, 
                        {$set: 
                            {
                            PANNO1: req.body[i].PANNO1 ,
                            PHONE_RES : req.body[i].PHONE_RES ,
                            F_NAME : req.body[i].F_NAME ,
                            D_BIRTH : req.body[i].D_BIRTH ,
                            ACCNT_NO : req.body[i].ACCNT_NO ,
                            BANK_NAME : req.body[i].BANK_NAME ,
                            ADDRESS1 : req.body[i].ADDRESS1 ,
                            JOINT_NAM1 : req.body[i].JOINT_NAM1 ,
                            INV_NAME: req.body[i].INV_NAME ,
                            FOLIO_NO : req.body[i].FOLIO_NO ,
                            NOMINEE1 : req.body[i].NOMINEE1 ,
                            NEFT_CODE : req.body[i].NEFT_CODE ,
                            IFSC_CODE : req.body[i].IFSC_CODE ,
                            BANK_CODE : req.body[i].BANK_CODE ,
                            COMP_CODE : req.body[i].COMP_CODE,
                            AC_TYPE : req.body[i].AC_TYPE,
                            KYC_ID : req.body[i].KYC_ID,
                            HOLDING_T6 : req.body[i].HOLDING_T6,
                            PBANK_NAME : req.body[i].PBANK_NAME,
                            PERSONAL_9 : req.body[i].PERSONAL_9,



                        }}, 
                        {
                            "upsert":true
                        }, 
                        function(err, object) {
                            if (err){
                                console.warn(err.message);  // returns error if no matching object found
                            }
         })
    }
    console.log("successfully inserted")
})


app.post("/api/savetranscams", function (req, res) {
        for (i = 0; i < req.body.length; i++) {   
            transc.updateMany(
                        { TRXNNO: req.body[i].TRXNNO , TRADDATE : req.body[i].TRADDATE }, 
                        {$set: 
                            { FOLIO_NO : req.body[i].FOLIO_NO ,
                            PRODCODE : req.body[i].PRODCODE ,
                            SCHEME: req.body[i].SCHEME ,
                            INV_NAME : req.body[i].INV_NAME ,
                            TRADDATE : new Date(moment(req.body[i].TRADDATE).format("YYYY-MM-DD")),
                            UNITS : Number(req.body[i].UNITS) ,
                            AMOUNT : Number(req.body[i].AMOUNT) ,
                            TRXN_NATUR : req.body[i].TRXN_NATUR ,
                            SCHEME_TYP : req.body[i].SCHEME_TYP ,
                            PAN : req.body[i].PAN ,
                            TRXN_TYPE_ : req.body[i].TRXN_TYPE_ ,
                            AC_NO : req.body[i].AC_NO ,
                            BANK_NAME : req.body[i].BANK_NAME ,
                            TRXNNO : req.body[i].TRXNNO ,
                            AMC_CODE: req.body[i].AMC_CODE ,
                        }}, 
                        {
                            "upsert":true
                        }, 
                        function(err, object) {
                            if (err){
                                console.warn(err.message);  // returns error if no matching object found
                            }
                        })
         }
         console.dir("successfully");
 })

app.post("/api/savetranskarvy", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
        transk.updateMany(
                { UNQNO : req.body[i].UNQNO , NEWUNQNO : req.body[i].NEWUNQNO ,TD_APPNO : req.body[i].TD_APPNO , TD_TRDT: req.body[i].TD_TRDT   }, 
                    {$set: 
                        { 
                        TD_TRDT : new Date(moment(req.body[i].TD_TRDT).format("YYYY-MM-DD")),
                        TD_FUND : req.body[i].TD_FUND ,
                        SCHEMEISIN : req.body[i].SCHEMEISIN ,
                        TD_UNITS : Number(req.body[i].TD_UNITS) ,
                        ASSETTYPE : req.body[i].ASSETTYPE ,
                        PAN1 : req.body[i].PAN1 ,
                        TRDESC : req.body[i].TRDESC ,
                        IHNO : req.body[i].IHNO ,
                        TD_NAV : Number(req.body[i].TD_NAV) ,
                        TD_APPNO : req.body[i].TD_APPNO ,
                        TD_AMT : Number(req.body[i].TD_AMT) ,
                        TD_POP : req.body[i].TD_POP ,
                        INVNAME : req.body[i].INVNAME ,
                        SMCODE : req.body[i].SMCODE ,
                        TD_TRNO : req.body[i].TD_TRNO ,
                        FUNDDESC : req.body[i].FUNDDESC ,
                        TD_ACNO : req.body[i].TD_ACNO ,
                        FMCODE : req.body[i].FMCODE ,
                        UNQNO : req.body[i].UNQNO ,
                        TD_TRTYPE : req.body[i].TD_TRTYPE ,
                        NEWUNQNO : req.body[i].NEWUNQNO ,
                    }}, 
                    {
                        "upsert":true
                    }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }
                    })
               
    }
    console.dir("successfully");
})

app.post("/api/savetransfranklin", function (req, res) {
        for (i = 0; i < req.body.length; i++) {   
            transf.updateMany(
                    { FOLIO_NO: req.body[i].FOLIO_NO  , TRXN_NO : req.body[i].TRXN_NO , TRXN_DATE : req.body[i].TRXN_DATE}, 
                        {$set: 
                            { 
                            COMP_CODE: req.body[i].COMP_CODE ,
                            SCHEME_CO0: req.body[i].SCHEME_CO0 ,
                            SCHEME_NA1: req.body[i].SCHEME_NA1 ,
                            FOLIO_NO: req.body[i].FOLIO_NO ,
                            TRXN_TYPE: req.body[i].TRXN_TYPE ,
                            TRXN_NO:  req.body[i].TRXN_NO ,
                            INVESTOR_2:  req.body[i].INVESTOR_2 ,
                            TRXN_DATE : new Date(moment(req.body[i].TRXN_DATE).format("YYYY-MM-DD")),
                            NAV : Number(req.body[i].NAV) ,
                            POP: req.body[i].POP ,
                            UNITS : Number(req.body[i].UNITS) ,
                            AMOUNT : Number(req.body[i].AMOUNT) ,
                            ADDRESS1: req.body[i].ADDRESS1 ,
                            IT_PAN_NO1: req.body[i].IT_PAN_NO1 ,
                            ISIN: req.body[i].ISIN ,
                            JOINT_NAM1: req.body[i].JOINT_NAM1 ,
                            JOINT_NAM2: req.body[i].JOINT_NAM2 ,
                            PLAN_TYPE: req.body[i].PLAN_TYPE ,
                            NOMINEE1 : req.body[i].NOMINEE1 ,
                            ACCOUNT_16 : req.body[i].ACCOUNT_16 ,
                            PBANK_NAME : req.body[i].PBANK_NAME ,    
                            PERSONAL23  : req.body[i].PERSONAL23 ,                       
                        }}, 
                        {
                            "upsert":true
                        }, 
                        function(err, object) {
                            if (err){
                                console.warn(err.message);  // returns error if no matching object found
                            }
                        })
                   
        }
        console.dir("successfully");
 })

//  app.get("/api/getfoliocams", function (req, res) {
//     var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
//     model.find({}, function (err, data) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.send(data);
//         }
//     });
// })

app.post("/api/savecamsnav", function (req, res) {
    var model = mongoose.model('cams_nav', navcams, 'cams_nav');
   //var model = mongoose.model('products', productdata, 'products');
    try{
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
    }
}catch(err){
console.log(e)
}
})

app.post("/api/savecamsnav1", function (req, res) {
        for (i = 0; i < req.body.length; i++) {   
            camsn.updateMany(
                        { SchemeName: req.body[i].SchemeName }, 
                        {$set: 
                            { 
                            Date : new Date(req.body[i].Date) ,
                            //Date: new Date(moment(req.body[i].Date).format("YYYY-MM-DD")),
                            NetAssetValue : Number(req.body[i].NetAssetValue) ,
                            ISINDivReinvestment : req.body[i].ISINDivReinvestment ,
                            ISINDivPayoutISINGrowth : req.body[i].ISINDivPayoutISINGrowth,
                            SchemeName : req.body[i].SchemeName ,
                            SchemeCode : req.body[i].SchemeCode ,
                        }}, 
                        {
                            "upsert":true
                        }, 
                        function(err, object) {
                            if (err){
                                console.warn(err.message);  // returns error if no matching object found
                            }else{
                                
                            }
                            console.dir("successfully");
            })
        }
 })




app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  3000;


app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
  });

app.listen(port, ()=> { console.log("server started at port ",port)})


