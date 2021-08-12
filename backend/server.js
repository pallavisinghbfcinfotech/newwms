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


mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	autoIndex: false, // Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0
}).catch(error => console.log(error.reason));

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

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
    PAN_NO: { type: String },
    JOINT1_PAN: { type: String },
    BANK_NAME: { type: String },
    AC_NO: { type: String },
    NOM_NAME: { type: String },
    NOM2_NAME: { type: String },
    NOM3_NAME: { type: String },
    IFSC_CODE: { type: String },
    PRODUCT: { type: String },
    EMAIL: { type: String},
    HOLDING_NA: { type: String},
    JOINT1_PAN: { type: String},
    GUARD_PAN: { type: String},
    TAX_STATUS: { type: String},
    GUARD_NAME: { type: String},
    FOLIO_DATE: { type: String},
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
    PRCODE: { type: String },
    FUND: { type: String },
    BNKACTYPE: { type: String },
    STATUS: { type: String },
    EMAIL: { type: String },
    MODEOFHOLD: { type: String },
    PAN2: { type: String },
    GUARDIANN0: { type: String },
    STATUSDESC: { type: String },
    GUARDPANNO: { type: String },
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
    COMP_CODE: { type: String },
    AC_TYPE: { type: String },
    KYC_ID: { type: String },
    HOLDING_T6: { type: String },
    PBANK_NAME: { type: String },
    PERSONAL_9: { type: String },
    JOINT_NAM2: { type: String },
    TAX_STATUS: { type: String },
    EMAIL: { type: String },
    PANNO2: { type: String },
    HOLDING_T6: { type: String },
    SOCIAL_ST7: { type: String },
    GUARDIAN20: { type: String },
}, { versionKey: false });

const transcams = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String },
    TRXNNO: { type: String },
    TRADDATE: { type: Date },
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    TRXN_NATUR: { type: String },
    SCHEME_TYP: { type: String },
    PAN: { type: String },
    TRXN_TYPE_: { type: String },
    AC_NO: { type: String },
    BANK_NAME: { type: String },
    TAX_STATUS: { type: String },
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
    ASSETTYPE: { type: String },
    TD_UNITS: { type: Number },
    SCHEMEISIN: { type: String },
    TD_FUND: { type: String },
    TD_TRTYPE: { type: String },
    NEWUNQNO: { type: String },
    STATUS: { type: String},
    PAN2: { type: String},
}, { versionKey: false });


const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date },
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
    PERSONAL23: { type: String },
    TAX_STATUS: { type: String },
    EMAIL: { type: String },
    IT_PAN_NO2: { type: String },
    SOCIAL_S18: { type: String },
    HOLDING_19: { type: String },
    ACCOUNT_25: { type: String },
}, { versionKey: false });



  var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
  var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
  var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
  var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams'); 
  var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');  
  var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
  var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');  
  var resdata="";
  var data="";var karvydata="";var camsdata="";var frankdata="";var datacon="";
var i=0;var pipeline="";var pipeline1="";var pipeline2="";var pipeline3="";

app.get("/api/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, camsdata) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data=" + camsdata);
            res.send(camsdata);
        }
    });
})


app.post("/api/Removedata",function(req,res){ 
     transk.remove({ _id: req.body.id }, function(err) {
        transc.remove({ _id: req.body.id }, function(err) {
            transf.remove({ _id: req.body.id }, function(err) {
               if(err){
                   res.send(err);
               }
               else{  
                resdata = {
                    status: 200,
                    message: 'Deleted',
                    }
                      res.send(resdata);      
                      return resdata;     
                  }
           });
        });
    });
   })


// app.post("/api/getschemedetail", function (req, res) {
//     const pipeline3 = [  //trans_cams
//         { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio } },
//         { $group: { _id: { INV_NAME: "$INV_NAME", BANK_NAME: "$BANK_NAME", AC_NO: "$AC_NO", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $reduce: { input: { $split: ["$PRODCODE", "$AMC_CODE"] }, initialValue: "", in: { $concat: ["$$value", "$$this"] } } }, TRADDATE: "$TRADDATE", UNITS: "$UNITS", AMOUNT: "$AMOUNT" } } },
//         {
//             $lookup:
//             {
//                 from: "products",
//                 let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
//                 pipeline: [
//                     {
//                         $match:
//                         {
//                             $expr:
//                             {
//                                 $and:
//                                     [
//                                         { $eq: ["$PRODUCT_CODE", "$$ccc"] },
//                                         { $eq: ["$AMC_CODE", "$$amc"] }
//                                     ]
//                             }
//                         }
//                     },
//                     { $project: { _id: 0 } }
//                 ],
//                 as: "products"
//             }
//         },
//         { $unwind: "$products" },
//         { $group: { _id: { INV_NAME: "$_id.INV_NAME", BANK_NAME: "$_id.BANK_NAME", AC_NO: "$_id.AC_NO", products: "$products.ISIN", TRADDATE: "$TRADDATE" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//         { $lookup: { from: 'cams_nav', localField: '_id.products', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//         { $unwind: "$nav" },
//         { $project: { _id: 0, INVNAME: "$_id.INV_NAME", BANK_NAME: "$_id.BANK_NAME", AC_NO: "$_id.AC_NO", products: "$products.ISIN", cnav: "$nav.NetAssetValue", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//     ]

//     const pipeline1 = [  //trans_karvy    
//         { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio } },
//         { $group: { _id: { PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", TRDESC: "$TRDESC", INVNAME: "$INVNAME", SCHEMEISIN: "$SCHEMEISIN", cnav: "$nav.NetAssetValue" }, TD_UNITS: { $sum: "$TD_UNITS" }, TD_AMT: { $sum: "$TD_AMT" } } },
//         { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//         //   { $unwind: "$nav"},
//         { $project: { _id: 0, PAN: "$_id.PAN1", FUNDDESC: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, TRDESC: "$_id.TRDESC", INVNAME: "$_id.INVNAME", SCHEMEISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" }, RTA: "KARVY" } },
//         { $sort: { TD_TRDT: -1 } }
//     ]

//     const pipeline2 = [  //trans_franklin
//         { $match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan, FOLIO_NO: req.body.folio } },
//         { $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", TRXN_TYPE: "$TRXN_TYPE", INVESTOR_2: "$INVESTOR_2", ISIN: "$ISIN", cnav: "$nav.NetAssetValue" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//         { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//         { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1", FUNDDESC: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, TRDESC: "$_id.TRXN_TYPE", INVNAME: "$_id.INVESTOR_2", SCHEMEISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" }, RTA: "FRANKLIN" } },
//         { $sort: { TD_TRDT: -1 } }
//     ]

//     transc.aggregate(pipeline3, (err, camsdata) => {
//         transk.aggregate(pipeline1, (err, karvydata) => {
//             transf.aggregate(pipeline2, (err, frankdata) => {
//                 if (karvydata != 0 || frankdata != 0 || camsdata != 0) {
//                     resdata = {
//                         status: 200,
//                         message: "Successfull",
//                         data: karvydata
//                     };
//                 } else {
//                     resdata = {
//                         status: 400,
//                         message: "Data not found"
//                     };
//                 }
//                 var datacon = karvydata.concat(frankdata.concat(camsdata));
//                 for (var i = 0; i < datacon.length; i++) {
//                     if (datacon[i]['NATURE'] === "Redemption") {
//                         datacon[i]['NATURE'] = "RED";
//                     } if (datacon[i]['NATURE'].match(/Systematic Investment.*/) || datacon[i]['NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['NATURE'].match(/Systematic - To.*/) || datacon[i]['NATURE'].match(/Systematic-NSE.*/) || datacon[i]['NATURE'].match(/Systematic Physical.*/) || datacon[i]['NATURE'].match(/Systematic.*/) || datacon[i]['NATURE'].match(/Systematic-Normal.*/) || datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
//                         datacon[i]['NATURE'] = "SIP";
//                     }
//                     if (datacon[i]['NATURE'] === "Switch Over Out" || datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "Lateral Shift Out") {
//                         datacon[i]['NATURE'] = "Switch Out";
//                     }
//                     if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
//                         datacon[i]['NATURE'] = "SIPR";
//                     }
//                     if (datacon[i]['NATURE'].match(/Systematic - From.*/)) {
//                         datacon[i]['NATURE'] = "STP";
//                     }
//                     if (datacon[i]['NATURE'] === "Div. Reinvestment") {
//                         datacon[i]['NATURE'] = "Div. Reinv.";
//                     }
//                     if (datacon[i]['NATURE'] === "Gross Dividend") {
//                         datacon[i]['NATURE'] = "Gross Div.";
//                     }
//                     if (datacon[i]['NATURE'] === "Lateral Shift In") {
//                         datacon[i]['NATURE'] = "Switch In";
//                     }
//                     if (datacon[i]['NATURE'] === "Consolidation Out") {
//                         datacon[i]['NATURE'] = "CNO";
//                     }
//                     if (datacon[i]['NATURE'] === "Consolidation In") {
//                         datacon[i]['NATURE'] = "CNI";
//                     }
//                 }
//                 resdata.data = datacon.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime())
//                 res.json(resdata);
//                 return resdata;
//             });
//         });
//     })
// })

app.post("/api/getschemedetail", function (req, res) {
        const pipeline3 = [  //trans_cams
            { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio } },
            { $group: { _id: { PAN:"$PAN" ,SCHEME:"$SCHEME",PURPRICE:"$PURPRICE",TRXN_TYPE_:"$TRXN_TYPE_",
            TRADDATE:"$TRADDATE" ,INV_NAME:"$INV_NAME",AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE",  code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] },  UNITS: "$UNITS", AMOUNT: "$AMOUNT" } } },
            {
                $lookup:
                {
                    from: "products",
                    let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                            { $eq: ["$AMC_CODE", "$$amc"] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    as: "products"
                }
            },
           // { $unwind: "$products" },
            { $group: { _id: { PAN:"$_id.PAN" ,SCHEME:"$_id.SCHEME",PURPRICE:"$_id.PURPRICE",TRXN_TYPE_:"$_id.TRXN_TYPE_", TRADDATE:"$_id.TRADDATE" ,INV_NAME:"$_id.INV_NAME",products: "$products.ISIN" , UNITS:"$_id.UNITS" , AMOUNT:"$_id.AMOUNT" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.products', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
         //   { $unwind: "$nav" },
            { $project: { _id: 0, PAN:"$_id.PAN" , SCHEME:"$_id.SCHEME", TD_NAV:"$_id.PURPRICE" , NATURE:"$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } },INVNAME: "$_id.INV_NAME", SCHEMEISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT",RTA: "CAMS"  } },
        ]
    
        const pipeline1 = [  //trans_karvy    
            { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio } },
            { $group: { _id: { PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", TRDESC: "$TRDESC", INVNAME: "$INVNAME", SCHEMEISIN: "$SCHEMEISIN", cnav: "$nav.NetAssetValue", TD_UNITS:"$TD_UNITS" , TD_AMT: "$TD_AMT" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            //   { $unwind: "$nav"},
            { $project: { _id: 0, PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, TRDESC: "$_id.TRDESC", INVNAME: "$_id.INVNAME", SCHEMEISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", UNITS:"$_id.TD_UNITS", AMOUNT:"$_id.TD_AMT", RTA: "KARVY" } },
            { $sort: { TD_TRDT: -1 } }
        ]
    
        const pipeline2 = [  //trans_franklin
            { $match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan, FOLIO_NO: req.body.folio } },
            { $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", TRXN_TYPE: "$TRXN_TYPE", INVESTOR_2: "$INVESTOR_2", ISIN: "$ISIN", cnav: "$nav.NetAssetValue" , UNITS:"$UNITS" , AMOUNT:"$AMOUNT"  } }},
            { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, TRDESC: "$_id.TRXN_TYPE", INVNAME: "$_id.INVESTOR_2", SCHEMEISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT", RTA: "FRANKLIN" } },
            { $sort: { TD_TRDT: -1 } }
        ]
    
        transc.aggregate(pipeline3, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (karvydata != 0 || frankdata != 0 || camsdata != 0) {
                        resdata = {
                            status: 200,
                            message: "Successfull",
                            data: karvydata
                        };
                    } else {
                        resdata = {
                            status: 400,
                            message: "Data not found"
                        };
                    }
                    var datacon = karvydata.concat(frankdata.concat(camsdata));
                    for (var i = 0; i < datacon.length; i++) {
                          if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
                        datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
                        datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                        datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
                        datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
                        datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
                        datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
                        datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" || datacon[i]['NATURE'] === "STPO") {
                        datacon[i]['NATURE'] = "Switch Out";    
                    } 
			    if (datacon[i]['NATURE'].match(/Systematic Investment.*/) || datacon[i]['NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['NATURE'].match(/Systematic - To.*/) || datacon[i]['NATURE'].match(/Systematic-NSE.*/) || datacon[i]['NATURE'].match(/Systematic Physical.*/) || datacon[i]['NATURE'].match(/Systematic.*/) || datacon[i]['NATURE'].match(/Systematic-Normal.*/) || datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
                            datacon[i]['NATURE'] = "SIP";
                        }
                        if (datacon[i]['NATURE'] === "Switch Over Out" || datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "Lateral Shift Out") {
                            datacon[i]['NATURE'] = "Switch Out";
                        }
                        if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
                            datacon[i]['NATURE'] = "SIPR";
                        }
                        if (datacon[i]['NATURE'].match(/Systematic - From.*/)) {
                            datacon[i]['NATURE'] = "STP";
                        }
                        if (datacon[i]['NATURE'] === "Div. Reinvestment") {
                            datacon[i]['NATURE'] = "Div. Reinv.";
                        }
                        if (datacon[i]['NATURE'] === "Gross Dividend") {
                            datacon[i]['NATURE'] = "Gross Div.";
                        }
                        if (datacon[i]['NATURE'] === "Lateral Shift In") {
                            datacon[i]['NATURE'] = "Switch In";
                        }
                        if (datacon[i]['NATURE'] === "Consolidation Out") {
                            datacon[i]['NATURE'] = "CNO";
                        }
                        if (datacon[i]['NATURE'] === "Consolidation In") {
                            datacon[i]['NATURE'] = "CNI";
                        }
                    }
                    resdata.data = datacon.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime())
                    res.json(resdata);
                    return resdata;
                });
            });
        })
    })

app.post("/api/gettransschemedetail", function (req, res) {
    try{
const pipeline1 = [  //trans_karvy    
    { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan ,TD_ACNO:req.body.folio } },
    //{ $lookup: { from: 'cams_nav', localField: 'SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
    //{ $unwind: "$nav"},
    { $project: { _id:1,PAN: "$PAN1", FUNDDESC:"$FUNDDESC",TD_NAV: "$TD_NAV", NATURE: "$TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$TD_TRDT" } }, TRDESC: "$TRDESC", INVNAME: "$INVNAME",  UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } ,RTA:"KARVY" } },
    {$sort : {TD_TRDT : -1}}
]
const pipeline2=[  //trans_franklin
    {$match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan ,FOLIO_NO:req.body.folio } },
    //{ $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", TRXN_TYPE: "$TRXN_TYPE", INVESTOR_2: "$INVESTOR_2", ISIN: "$ISIN", cnav: "$nav.NetAssetValue" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
    //{ $lookup: { from: 'cams_nav', localField: 'ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
    //{ $unwind: "$nav"},
    { $project: { _id:1,PAN: "$IT_PAN_NO1", FUNDDESC:"$SCHEME_NA1",TD_NAV: "$NAV", NATURE: "$TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$TRXN_DATE" } }, TRDESC: "$TRXN_TYPE", INVNAME: "$INVESTOR_2",  UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } ,RTA:"FRANKLIN" } },
    {$sort : {TD_TRDT : -1}}
] 
const pipeline3=[  //trans_cams
    {$match: { SCHEME: req.body.scheme, PAN: req.body.pan ,FOLIO_NO:req.body.folio } },
    //{ $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", TRXN_TYPE: "$TRXN_TYPE", INVESTOR_2: "$INVESTOR_2", ISIN: "$ISIN", cnav: "$nav.NetAssetValue" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
    //{ $lookup: { from: 'cams_nav', localField: 'ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
    //{ $unwind: "$nav"},
    { $project: { _id:1,PAN: "$PAN", FUNDDESC:"$SCHEME", TD_NAV: "NAV",NATURE: "$TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$TRADDATE" } }, TRDESC: "$TRXN_TYPE_", INVNAME: "$INV_NAME",  UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } ,RTA:"CAMS" } },
    {$sort : {TD_TRDT : -1}}
] 

transk.aggregate(pipeline1, (err, karvydata) => {
    transf.aggregate(pipeline2, (err, frankdata) => {
        transc.aggregate(pipeline3, (err, camsdata) => {
    if (karvydata != 0 || frankdata !=0 || camsdata !=0) {
        resdata = {
            status: 200,
            message: "Successfull",
            data: karvydata
        };
    } else {
        resdata = {
            status: 400,
            message: "Data not found"
        };
    }
     var datacon = karvydata.concat(frankdata.concat(camsdata));    
        for (var i = 0; i < datacon.length; i++) {
        if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "FUL" || datacon[i]['NATURE'] === "Full Redemption") {
            datacon[i]['NATURE'] = "RED";
        }if (datacon[i]['NATURE'].match(/Systematic Investment.*/) || datacon[i]['NATURE'] === "SIN" ||
        datacon[i]['NATURE'].match(/Systematic Withdrawal.*/) || 
        datacon[i]['NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['NATURE'].match(/Systematic - To.*/) || datacon[i]['NATURE'].match(/Systematic-NSE.*/) || datacon[i]['NATURE'].match(/Systematic Physical.*/) || datacon[i]['NATURE'].match(/Systematic.*/) || datacon[i]['NATURE'].match(/Systematic-Normal.*/) || datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
            datacon[i]['NATURE'] = "SIP";
        }
        if (datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" || datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "Lateral Shift Out") {
            datacon[i]['NATURE'] = "Switch Out";
        }
        if ((Math.sign(datacon[i]['AMOUNT']) === -1) || datacon[i]['NATURE'] === "SINR") {
            datacon[i]['NATURE'] = "SIP Rej.";
        }
        if (datacon[i]['NATURE'].match(/Systematic - From.*/)) {
            datacon[i]['NATURE'] = "STP";
        }
        if (datacon[i]['NATURE'] === "Div. Reinvestment") {
            datacon[i]['NATURE'] = "Div. Reinv.";
        }
        if (datacon[i]['NATURE'] === "Gross Dividend") {
            datacon[i]['NATURE'] = "Gross Div.";
        }
        if (datacon[i]['NATURE'] === "Lateral Shift In" || 
        datacon[i]['NATURE'] === "Switch Over In" || datacon[i]['NATURE'] === "LTIN") {
            datacon[i]['NATURE'] = "Switch In";
        }
        if (datacon[i]['NATURE'] === "Consolidation Out") {
            datacon[i]['NATURE'] = "CNO";
        }
        if (datacon[i]['NATURE'] === "Consolidation In") {
            datacon[i]['NATURE'] = "CNI";
        }
        if (datacon[i]['NATURE'] === "Purchase" || 
        datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "Initial Allotment"
        || datacon[i]['NATURE'] === "NEWPUR") {
            datacon[i]['NATURE'] = "Purchase";
        }
        if (datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "ADD" || datacon[i]['NATURE'] === "ADDPUR") {
            datacon[i]['NATURE'] = "Add. Purchase";
        }
    } 
    // resdata.data = datacon;
    resdata.data = datacon.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime())
    res.json(resdata);
    return resdata;
});
}); 
})
} catch (err) {
    console.log(e)
}
})


app.post("/api/getsearchfoliodetail", function (req, res) {
                        var pipeline="";var trans='';var rta="";
                        if(req.body.rta === "CAMS"){
                            pipeline = [  //trans_cams
                                { $match:{  FOLIO_NO:req.body.folio,SCHEME:req.body.scheme } },
                                { $group: { _id: { PAN:"$PAN",INV_NAME:"$INV_NAME", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", SCHEME_TYP: "$SCHEME_TYP",AC_NO: "$AC_NO",BANK_NAME: "$BANK_NAME" } } },
                                { $lookup: { from: 'folio_cams', localField: '_id.FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
                                { $unwind: "$detail" },
                                { $project: { _id: 0, PAN:"$_id.PAN",INVNAME:"$_id.INV_NAME", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME" ,TYPE:"$_id.SCHEME_TYP",ACCOUNTNO: "$_id.AC_NO",BANK: "$_id.BANK_NAME" ,MODEOFHOLD:"$detail.HOLDING_NA",NOMINEE:"$detail.NOM_NAME",EMAIL:"$detail.EMAIL" } },
                            ]
                            trans = mongoose.model('trans_cams', transcams, 'trans_cams');
                        }else if(req.body.rta === "KARVY"){
                            pipeline = [  //trans_karvy
                                { $match:{  TD_ACNO:req.body.folio,FUNDDESC:req.body.scheme} },
                                { $group: { _id: { PAN1:"$PAN1",INVNAME:"$INVNAME", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", ASSETTYPE: "$ASSETTYPE",AC_NO: "$AC_NO"  } } },
                                { $lookup: { from: 'folio_karvy', localField: '_id.TD_ACNO', foreignField: 'ACNO', as: 'detail' } },
                                { $unwind: "$detail" },
                                { $project: { _id: 0, PAN:"$_id.PAN1",INVNAME:"$_id.INVNAME", FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC",TYPE:"$_id.ASSETTYPE" ,ACCOUNTNO: "$detail.BNKACNO",BANK: "$detail.BNAME" ,BANKTYPE:"$detail.BNKACTYPE",MODEOFHOLD:"$detail.MODEOFHOLD",NOMINEE:"$detail.NOMINEE",EMAIL:"$detail.EMAIL" } },
                            ]
                            trans = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                        }else{
                            pipeline = [  //trans_franklin
                                { $match:{  FOLIO_NO:req.body.folio,SCHEME_NA1:req.body.scheme } },
                                { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",INVESTOR_2:"$INVESTOR_2", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", PLAN_TYPE: "$PLAN_TYPE",PERSONAL23: "$PERSONAL23",PBANK_NAME: "$PBANK_NAME" ,ACCOUNT_25:"$ACCOUNT_25",HOLDING_19:"$HOLDING_19",NOMINEE1:"$NOMINEE1",EMAIL:"$EMAIL"  } } },
                                { $project: { _id: 0, PAN:"$_id.IT_PAN_NO1",INVNAME:"$_id.INVESTOR_2", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1",TYPE:"$_id.PLAN_TYPE",ACCOUNTNO: "$_id.PERSONAL23",BANK: "$_id.PBANK_NAME" ,BANKTYPE:"$_id.ACCOUNT_25",MODEOFHOLD:"$_id.HOLDING_19",NOMINEE:"$_id.NOMINEE1",EMAIL:"$_id.EMAIL" } },
                            ]
                            trans = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                        }
                        trans.aggregate(pipeline, (err, data) => {
                        if(data != 0 ){
                                resdata = {
                                    status: 200,
                                    message: 'Successfull',
                                    data: data
                                }
                            } else {
                                resdata = {
                                    status: 400,
                                    message: 'Data not found',
                                }
                            }
                            var removeduplicates = data.map(JSON.stringify)
                            .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) {
                                return arr.indexOf(item, index + 1) === -1;
                            }) // check if there is any occurence of the item in whole array
                            .reverse()
                            .map(JSON.parse);
                            var datacon = Array.from(new Set(removeduplicates));
                            resdata.data = datacon;
                          res.send(resdata);
                          return resdata;
                        });      
  })

app.post("/api/getdetailnamewise", function (req, res) {
    var pipeline1="";var pipeline2="";var pipeline3="";
    if(req.body.searchtype === "searchName"){
    pipeline1 = [  //trans_cams
        { $match: {   INV_NAME:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' },SCHEME: { $ne: null },FOLIO_NO: { $ne: null } }  },
        { $group: { _id: { PAN: "$PAN",FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME" } } },
        { $project: { _id: 0, PAN:"$_id.PAN", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME" } }
    ]
    pipeline2 = [  //trans_karvy
        { $match: {   INVNAME:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' }, FUNDDESC: { $ne: null } ,TD_ACNO: { $ne: null } }  },
        { $group: { _id: {  PAN1: "$PAN1",TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", } } },
        { $project: { _id: 0,  PAN: "$_id.PAN1",FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", } }
    ]
    pipeline3 = [ ///trans_franklin
        { $match: {   INVESTOR_2:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' },SCHEME_NA1: { $ne: null },FOLIO_NO: { $ne: null } }  },
        { $group: { _id: {  IT_PAN_NO1: "$IT_PAN_NO1" ,FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1" } } },
        { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1",FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1" } }
    ]
    }else if(req.body.searchtype === "searchPan"){
        pipeline1 = [  //trans_cams
            { $match: {   PAN:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' },SCHEME: { $ne: null },FOLIO_NO: { $ne: null } }  },
            { $group: { _id: { PAN: "$PAN",FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME" } } },
            { $project: { _id: 0, PAN:"$_id.PAN", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME" } }
        ]
        pipeline2 = [  //trans_karvy
            { $match: {   PAN1:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' } , FUNDDESC: { $ne: null } ,TD_ACNO: { $ne: null }}  },
            { $group: { _id: {  PAN1: "$PAN1",TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", } } },
            { $project: { _id: 0,  PAN: "$_id.PAN1",FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", } }
        ]
        pipeline3 = [ ///trans_franklin
            { $match: {   IT_PAN_NO1:{$regex : `^${req.body.searchvalue}.*` , $options: 'i' },SCHEME_NA1: { $ne: null },FOLIO_NO: { $ne: null } }  },
            { $group: { _id: {  IT_PAN_NO1: "$IT_PAN_NO1" ,FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1" } } },
            { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1",FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1" } }
        ]
    }else{
        pipeline1 = [  //trans_cams
            { $match: {   FOLIO_NO:req.body.searchvalue,SCHEME: { $ne: null } }  },
            { $group: { _id: { PAN: "$PAN",FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME" } } },
            { $project: { _id: 0, PAN:"$_id.PAN", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME" } }
        ]
        pipeline2 = [  //trans_karvy
            { $match: {   TD_ACNO:req.body.searchvalue , FUNDDESC: { $ne: null } }  },
            { $group: { _id: {  PAN1: "$PAN1",TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", } } },
            { $project: { _id: 0,  PAN: "$_id.PAN1",FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", } }
        ]
        pipeline3 = [ ///trans_franklin
            { $match: {   FOLIO_NO:req.body.searchvalue,SCHEME_NA1: { $ne: null } }  },
            { $group: { _id: {  IT_PAN_NO1: "$IT_PAN_NO1" ,FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1" } } },
            { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1",FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1" } }
        ]
    }
    transc.aggregate(pipeline1, (err, camsdata) => {
        transk.aggregate(pipeline2, (err, karvydata) => {
            transf.aggregate(pipeline3, (err, frankdata) => {
                 if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                 var datacon = frankdata.concat(karvydata.concat(camsdata))
                  datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                        res.json(datacon)
                }
            });
        });
    });
})

app.post("/api/getsearchdatamanagement", function (req, res) {

    var marketvalue=0;var cnav=0;
    var unit=0;var balance=0;
    var searchtype=req.body.searchtype;
    var pipeline1="";var pipeline2="";var pipeline3="";
        pipeline1 = [  //trans_cams
            { $match:{ SCHEME:req.body.scheme,PAN:{$regex : `^${req.body.pan}.*` , $options: 'i' },FOLIO_NO:req.body.folio } },
            { $group: { _id: {  PAN:"$PAN", INV_NAME: { "$toLower": ["$INV_NAME"] }, FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", TRXN_TYPE_:"$TRXN_TYPE_",TRADDATE:"$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $reduce: { input: { $split: ["$PRODCODE", "$AMC_CODE"] }, initialValue: "", in: { $concat: ["$$value", "$$this"] } } } } ,UNITS: { $sum: "$UNITS" }} },
            {
                $lookup:
                {
                    from: "products",
                    let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                            { $eq: ["$AMC_CODE", "$$amc"] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    as: "products"
                }
            },

            //{ $unwind: "$products" },
            { $group: { _id:{ PAN:"$_id.PAN", INV_NAME: { "$toLower": ["$_id.INV_NAME"] }, FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TRXN_TYPE_:"$_id.TRXN_TYPE_",TRADDATE:"$_id.TRADDATE",ISIN:"$products.ISIN" } ,UNITS: { $sum: "$UNITS" }} },
            { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            // { $unwind: "$nav" },
             { $project: { _id: 0, PAN:"$_id.PAN",INVNAME: { "$toLower": ["$_id.INV_NAME"] }, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME",  NATURE: "$_id.TRXN_TYPE_",DATE:{ $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } },RTA:"CAMS",cnav: "$nav.NetAssetValue",navdate:"$nav.Date" , UNITS: { $sum: "$UNITS" }} },
             { $sort: { INVNAME: 1 } }
        ]
        
        pipeline2 = [  //trans_karvy
            { $match:{ FUNDDESC:req.body.scheme,PAN1:{$regex : `^${req.body.pan}.*` , $options: 'i' },TD_ACNO:req.body.folio,SCHEMEISIN: { $ne : ""} ,SCHEMEISIN: { $ne : null} } },
            { $group: { _id: { PAN1:"$PAN1",INVNAME:"$INVNAME", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_TRTYPE: "$TD_TRTYPE",TD_TRDT:"$TD_TRDT" , SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" } } },
            {
                $lookup:
                {
                    from: "cams_nav",
                    let: { isin: "$_id.SCHEMEISIN" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $or:
                                        [
                                            { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
                                            { $eq: ["$ISINDivReinvestment", "$$isin"] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    as: "nav"
                }
            },
            //{ $unwind: "$nav" },
            { $project: { _id: 0, PAN:"$_id.PAN1",INVNAME: { "$toLower": ["$_id.INVNAME"] }, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC",  NATURE: "$_id.TD_TRTYPE" ,DATE:{ $dateToString: { format: "%m/%d/%Y", date: "$_id.TD_TRDT" } } ,RTA:"KARVY",cnav: "$nav.NetAssetValue",navdate:"$nav.Date", UNITS: { $sum: "$TD_UNITS" }} },
            { $sort: { INVNAME: 1 } }
        ]


        pipeline3 = [  //trans_franklin
            { $match:{ SCHEME_NA1:req.body.scheme,IT_PAN_NO1:{$regex : `^${req.body.pan}.*` , $options: 'i' },FOLIO_NO:req.body.folio ,ISIN: { $ne : ""} ,ISIN: { $ne : null} } },
            { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",INVESTOR_2:"$INVESTOR_2", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",TRXN_DATE:"$TRXN_DATE", ISIN:"$ISIN" }, UNITS: { $sum: "$UNITS" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
           // { $unwind: "$nav" },
            { $project: { _id: 0, PAN:"$_id.IT_PAN_NO1",INVNAME: { "$toLower": ["$_id.INVESTOR_2"] }, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", NATURE:"$_id.TRXN_TYPE",DATE:{ $dateToString: { format: "%m/%d/%Y", date: "$_id.TRXN_DATE" } }, RTA:"FRANKLIN",cnav: "$nav.NetAssetValue",navdate:"$nav.Date" , UNITS: { $sum: "$UNITS" }} },
            { $sort: { INVNAME: 1 } }
        ]   
   transf.aggregate(pipeline3, (err, frankdata) => {
      transc.aggregate(pipeline1, (err, camsdata) => {
        transk.aggregate(pipeline2, (err, karvydata) => {
       if( camsdata != 0 || karvydata !=0 || frankdata !=0){
            resdata = {
                status: 200,
                message: 'Successfull',
                data: karvydata
            }
        } else {
            resdata = {
                status: 400,
                message: 'Data not found',
            }
        }
        var datacon = karvydata.concat(camsdata.concat(frankdata));
                          var removeduplicates = datacon.map(JSON.stringify)
                          .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                          .filter(function (item, index, arr) {
                              return arr.indexOf(item, index + 1) === -1;
                          }) // check if there is any occurence of the item in whole array
                          .reverse()
                          .map(JSON.parse);
                            var uniquedata = Array.from(new Set(removeduplicates));
                       
                           resdata.data = uniquedata.sort((a, b) => (a.INVNAME.replace(/ /g,'') > b.INVNAME.replace(/ /g,'')) ? 1 :(b.INVNAME.replace(/ /g,'') > a.INVNAME.replace(/ /g,'')) ? -1 :0);
                            res.send(resdata);
                           return resdata;
                        });
                    });       
       });      
  })
app.post("/api/getsipstpuserwise", function (req, res) {
    try{
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    var pan = req.body.pan;
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if (req.body.name != "" && req.body.pan == "" || req.body.pan === "Please Provide" || req.body.pan === "Not An Assessee") {
        const pipeline = [  ///trans_cams
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR",  FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR",  FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TRXN_NATUR: /Systematic/ } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
        const pipeline1 = [  ///trans_karvy
            { $group: { _id: {  TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC",  TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0,TD_TRNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC",  FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TRXN_NATUR: /Systematic/ } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
        const pipeline2 = [  ///trans_franklin
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TRXN_NATUR: /SIP/ }] } },
            { $sort: { TRADDATE: -1 } }
        ]

        transc.aggregate(pipeline, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                     datacon = frankdata.concat(karvydata.concat(camsdata))
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    for (var i = 0; i < datacon.length; i++) {
                        if (datacon[i]['TRXN_NATUR'].match(/Systematic.*/)) {
                            datacon[i]['TRXN_NATUR'] = "SIP";
                        }
                        if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
                            datacon[i]['TRXN_NATUR'] = "SIPR";
                        }
                        if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                            datacon[i]['TRXN_NATUR'] = "STP";
                        }
                    }
                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                    res.json(resdata)
                    return resdata
                });
            });
        });
    } else if(req.body.pan != "" && req.body.name != ""){
        const pipeline = [  ///trans_cams
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT",TAX_STATUS:"$TAX_STATUS" ,TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR",  FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT" ,TAX_STATUS:"$_id.TAX_STATUS", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'si' } } , { TRXN_NATUR: /Systematic/ } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
        const pipeline1 = [  ///trans_karvy
            { $group: { _id: { TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC",  TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT",STATUS:"$STATUS", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0,  TD_TRNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC",STATUS:"$_id.STATUS" ,AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan } ,{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } , { TRXN_NATUR: /Systematic/ }  ] } },
            { $sort: { TRADDATE: -1 } }
        ]
        const pipeline2 = [  ///trans_franklin
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1",SOCIAL_S18:"$SOCIAL_S18", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1",SOCIAL_S18:"$_id.SOCIAL_S18", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan } , { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'si' } }    ] } },
            { $sort: { TRADDATE: -1 } }
        ]

        transc.aggregate(pipeline, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                    datacon = frankdata.concat(karvydata.concat(camsdata))
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    for (var i = 0; i < datacon.length; i++) {
                        if (datacon[i]['TRXN_NATUR'].match(/Systematic.*/)) {
                            datacon[i]['TRXN_NATUR'] = "SIP";
                        }
                        if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
                            datacon[i]['TRXN_NATUR'] = "SIPR";
                        }
                        if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                            datacon[i]['TRXN_NATUR'] = "STP";
                        }
                    }
                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                    res.json(resdata)
                    return resdata
                });
            });
        });
    }else{
        resdata = {
            status: 400,
            message: 'Data not found',
        }
        res.json(resdata)
         return resdata
    }
} catch (err) {
    console.log(err)
}
})

app.post("/api/getsipstpall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);

    const pipeline = [  ///trans_cams
        { $group: { _id: { TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
        { $match: { $and: [{ month: mon }, { year: yer }, { TRXN_NATUR: /Systematic/ }, { TRXN_NATUR: { $not: /^Systematic - From.*/ } }] } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline1 = [  ///trans_karvy
        { $group: { _id: { TD_TRNO:"$TD_TRNO", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
        { $match: { $and: [{ month: mon }, { year: yer }, { TRXN_NATUR: /Systematic/ }, { TRXN_NATUR: { $not: /^Systematic - From.*/ } }] } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline2 = [  ///trans_franklin
        { $group: { _id: { TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
        { $match: { $and: [{ month: mon }, { year: yer }, { TRXN_NATUR: /Systematic/ }, { TRXN_NATUR: { $not: /^Systematic - From.*/ } }] } },
        { $sort: { TRADDATE: -1 } }
    ]
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                 datacon = frankdata.concat(karvydata.concat(camsdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                    if (datacon[i]['TRXN_NATUR'].match(/Systematic.*/)) {
                        datacon[i]['TRXN_NATUR'] = "SIP";
                    }
                    if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
                        datacon[i]['TRXN_NATUR'] = "SIPR";
                    }
                    if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                        datacon[i]['TRXN_NATUR'] = "STP";
                    }
                }
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                return resdata

            });
        });
    });
})



// app.post("/api/gettransactionuserwise", function (req, res) {
//     try{
//     var mon = parseInt(req.body.month);
//     var yer = parseInt(req.body.year);
//     if ( req.body.pan === "Please Provide" || req.body.pan === "" || req.body.pan === "Not An Assessee") {
//         req.body.pan="";
//         //console.log("pan not available")
//          pipeline = [  ///trans_cams
//             { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer } ,{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline1 = [  ///trans_karvy
//             { $group: { _id: {  TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//             { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME:{$regex : `^${req.body.name}.*` , $options: 'i' }}] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline2 = [  ///trans_franklin
//             { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//     } else if(req.body.pan != "" && req.body.name != ""){
//        // console.log("pan available")
//          pipeline = [  ///trans_cams
//             { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan } , { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline1 = [  ///trans_karvy
//             { $group: { _id: { TD_TRNO:"$TD_TRNO", INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//             { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline2 = [  ///trans_franklin
//             { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//     }
//         transc.aggregate(pipeline, (err, camsdata) => {
//             transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
//                         //   if( newdata != 0){
//                         resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                     } else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                     }
//                     var datacon = frankdata.concat(karvydata.concat(camsdata))
//                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                     for (var i = 0; i < datacon.length; i++) {
//                         if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || 
//                     datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
//                         datacon[i]['TRXN_NATUR'] = "RED";
//                     } if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
//                     datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
//                         datacon[i]['TRXN_NATUR'] = "SIP";
//                     } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
//                         datacon[i]['TRXN_NATUR'] = "SIPR";
//                     } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
//                         datacon[i]['TRXN_NATUR'] = "STP";
//                     }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
//                      || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
//                       || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
//                       || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
//                       datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
//                         datacon[i]['TRXN_NATUR'] = "Switch Out";
//                     }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
//                     || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
//                     || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
//                         datacon[i]['TRXN_NATUR'] = "Switch In";
//                     }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || datacon[i]['TRXN_NATUR'] === "Dividend Paid"
//                      || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
//                         datacon[i]['TRXN_NATUR'] = "Dividend";
//                     }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
//                         datacon[i]['TRXN_NATUR'] = "Dividend Payout";
//                     }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
//                         datacon[i]['TRXN_NATUR'] = "Con In";
//                     }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
//                         datacon[i]['TRXN_NATUR'] = "Con Out";
//                     }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
//                         datacon[i]['TRXN_NATUR'] = "Con Out";
//                     }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
//                     datacon[i]['TRXN_NATUR'] === "Initial Allotment"
//                     || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
//                         datacon[i]['TRXN_NATUR'] = "Purchase";
//                     }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
//                      datacon[i]['TRXN_NATUR'] === "ADDPUR") {
//                         datacon[i]['TRXN_NATUR'] = "Add. Purchase";
//                     }
//                 }
//                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                     res.json(resdata)
//                     return resdata
//                 });
//             });
//         });
// } catch (err) {
//     console.log(err)
// }
// })

app.post("/api/gettransactionuserwise", function (req, res) {
    try{
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    if ( req.body.pan === "Please Provide" || req.body.pan === "" || req.body.pan === "Not An Assessee") {
        req.body.pan="";
         pipeline = [  ///trans_cams
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer } ,{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }] } },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline1 = [  ///trans_karvy
            { $group: { _id: {  TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME:{$regex : `^${req.body.name}.*` , $options: 'i' }}] } },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline2 = [  ///trans_franklin
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }] } },
            { $sort: { TRADDATE: -1 } }
        ]

        // transc.aggregate(pipeline, (err, camsdata) => {
        //     transk.aggregate(pipeline1, (err, karvydata) => {
        //         transf.aggregate(pipeline2, (err, frankdata) => {
        //             if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
        //                 //   if( newdata != 0){
        //                 resdata = {
        //                     status: 200,
        //                     message: 'Successfull',
        //                     data: frankdata
        //                 }
        //             } else {
        //                 resdata = {
        //                     status: 400,
        //                     message: 'Data not found',
        //                 }
        //             }
        //             datacon = frankdata.concat(karvydata.concat(camsdata))
        //             datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
        //                 .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
        //                 .reverse().map(JSON.parse);
        //             for (var i = 0; i < datacon.length; i++) {
        //                 if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || 
        //                 datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
        //                     datacon[i]['TRXN_NATUR'] = "RED";
        //                 } if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
        //                 datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
        //                     datacon[i]['TRXN_NATUR'] = "SIP";
        //                 } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
        //                     datacon[i]['TRXN_NATUR'] = "SIPR";
        //                 } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
        //                     datacon[i]['TRXN_NATUR'] = "STP";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
        //                  || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
        //                   || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
        //                   || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
        //                   datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
        //                     datacon[i]['TRXN_NATUR'] = "Switch Out";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
        //                 || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
        //                 || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
        //                     datacon[i]['TRXN_NATUR'] = "Switch In";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || datacon[i]['TRXN_NATUR'] === "Dividend Paid"
        //                  || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
        //                     datacon[i]['TRXN_NATUR'] = "Dividend";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
        //                     datacon[i]['TRXN_NATUR'] = "Dividend Payout";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
        //                     datacon[i]['TRXN_NATUR'] = "Con In";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
        //                     datacon[i]['TRXN_NATUR'] = "Con Out";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
        //                     datacon[i]['TRXN_NATUR'] = "Con Out";
        //                 }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
        //                 datacon[i]['TRXN_NATUR'] === "Initial Allotment"
        //                 || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
        //                     datacon[i]['TRXN_NATUR'] = "Purchase";
        //                 }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
        //                  datacon[i]['TRXN_NATUR'] === "ADDPUR") {
        //                     datacon[i]['TRXN_NATUR'] = "Add. Purchase";
        //                 }
        //             }
        //             resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
        //             res.json(resdata)
        //             return resdata
        //         });
        //     });
        // });
    } else if(req.body.pan != "" && req.body.name != ""){
        pipeline = [  ///trans_cams
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan } , { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline1 = [  ///trans_karvy
            { $group: { _id: { TD_TRNO:"$TD_TRNO", INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline2 = [  ///trans_franklin
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
            { $sort: { TRADDATE: -1 } }
        ]
    }
        transc.aggregate(pipeline, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
                        //   if( newdata != 0){
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                        var datacon = frankdata.concat(karvydata.concat(camsdata));
                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                        for (var i = 0; i < datacon.length; i++) {
                            if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || datacon[i]['TRXN_NATUR'] === "SIPR" || 
                        datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
                            datacon[i]['TRXN_NATUR'] = "RED";
                        }  if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
                         datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                            datacon[i]['TRXN_NATUR'] = "SIP";
                        } if (datacon[i]['TRXN_NATUR'] === "Systematic Withdrawal") {
                            datacon[i]['TRXN_NATUR'] = "SWP";
                        }if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                            datacon[i]['TRXN_NATUR'] = "SIPR";
                        } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
                            datacon[i]['TRXN_NATUR'] = "STP";
                        }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
                         || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
                          || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
                          || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
                          datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
                            datacon[i]['TRXN_NATUR'] = "Switch Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                        || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                        || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                            datacon[i]['TRXN_NATUR'] = "Switch In";
                        }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || 
                        datacon[i]['TRXN_NATUR'] === "Dividend Paid"
                         || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
                            datacon[i]['TRXN_NATUR'] = "Dividend";
                        }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                            datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
                            datacon[i]['TRXN_NATUR'] = "Con In";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                            datacon[i]['TRXN_NATUR'] = "Con Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                            datacon[i]['TRXN_NATUR'] = "Con Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
                        datacon[i]['TRXN_NATUR'] === "Initial Allotment"
                        || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
                            datacon[i]['TRXN_NATUR'] = "Purchase";
                        }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                         datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                            datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                        }
                     }
                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
                     res.json(resdata)
                    return resdata
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    } 
                    
                });
            });
        });
    // }else{
    //     resdata = {
    //         status: 400,
    //         message: 'Data not found',
    //     }
    //     res.json(resdata)
    //     return resdata
    // }
} catch (err) {
    console.log(err)
}
})

app.post("/api/gettransactionall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    const pipeline = [  ///trans_cams
        { $group: { _id: { TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
        { $match: { $and: [{ month: mon }, { year: yer }] } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline1 = [  ///trans_karvy
        { $group: { _id: {  TD_TRNO:"$TD_TRNO",TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0,TD_TRNO:"$_id.TD_TRNO",TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
        { $match: { $and: [{ month: mon }, { year: yer }] } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline2 = [  ///trans_franklin
        { $group: { _id: { TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
        { $match: { $and: [{ month: mon }, { year: yer },] } },
        { $sort: { TRADDATE: -1 } }
    ]
    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                var datacon = frankdata.concat(karvydata.concat(camsdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                   if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || 
                    datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
                        datacon[i]['TRXN_NATUR'] = "RED";
                    } if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
                    datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                        datacon[i]['TRXN_NATUR'] = "SIP";
                    } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                        datacon[i]['TRXN_NATUR'] = "SIPR";
                    } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
                        datacon[i]['TRXN_NATUR'] = "STP";
                    }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
                     || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
                      || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
                      || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
                      datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
                        datacon[i]['TRXN_NATUR'] = "Switch Out";
                    }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                    || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                    || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                        datacon[i]['TRXN_NATUR'] = "Switch In";
                    }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || datacon[i]['TRXN_NATUR'] === "Dividend Paid"
                     || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
                        datacon[i]['TRXN_NATUR'] = "Dividend";
                    }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                        datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                    }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
                        datacon[i]['TRXN_NATUR'] = "Con In";
                    }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                        datacon[i]['TRXN_NATUR'] = "Con Out";
                    }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                        datacon[i]['TRXN_NATUR'] = "Con Out";
                    }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
                    datacon[i]['TRXN_NATUR'] === "Initial Allotment"
                    || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
                        datacon[i]['TRXN_NATUR'] = "Purchase";
                    }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                     datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                        datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                    }
                }
                //   console.log(datacon);
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                //return resdata
            });
        });
    });

})

app.post("/api/gettaxsavinguserwise", function (req, res) {
    try{
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
    var pan = req.body.pan;
   if ( req.body.pan === "Please Provide" || req.body.pan === "" || req.body.pan === "Not An Assessee") {
         pipeline = [  ///trans_cams
            { $match: { $and: [{ SCHEME: /Tax/ }, { INV_NAME: req.body.name }, { AMOUNT: { $gte: 0 } },{ TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } },  } },
            
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline1 = [  ///trans_karvy
            { $match: { $and: [{$or: [{ FUNDDESC: /TAX/ },{ FUNDDESC: /Long Term Equity Fund/ },{ FUNDDESC: /IDBI Equity Advantage Fund/ },{ FUNDDESC: /Sundaram Diversified Equity Fund/ } ] }, { INVNAME: req.body.name }, { TRDESC: { $not: /^Redemption.*/ } },{ TRDESC: { $not: /^Rejection.*/ } },{ TRDESC: { $not: /^Gross Dividend.*/ } },{ TRDESC: { $not: /^Switch Over Out.*/ } },  { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } },{ TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline2 = [  ///trans_franklin
            { $match: { $and: [{ SCHEME_NA1: /TAX/ }, { INVESTOR_2: req.body.name }, { AMOUNT: { $gte: 0 } } , { TRXN_TYPE: { $not: /^SIPR.*/ } } , { TRXN_TYPE: { $not: /^TO.*/ } } , { TRXN_TYPE: { $not: /^DP.*/ } },{ TRXN_TYPE: { $not: /^RED.*/ } },{ TRXN_TYPE: { $not: /^REDR.*/ } },{ TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE", year1: { $year: ('$_id.TRXN_DATE') }, year2: { $year: ('$_id.TRXN_DATE') } } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
            { $sort: { TRADDATE: -1 } }
        ]
    } else if(req.body.pan != "" && req.body.name != ""){
       pipeline = [  ///trans_cams
        { $match: { $and: [{ SCHEME: /Tax/ }, { PAN: pan },{ INV_NAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { AMOUNT: { $gte: 0 } },{ TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }} },
        { $sort: { TRADDATE: -1 } }
    ]
       pipeline1 = [  ///trans_karvy                                             
        { $match: { $and: [{$or: [{ FUNDDESC: /TAX/ },{ FUNDDESC: /Long Term Equity Fund/ },{ FUNDDESC: /IDBI Equity Advantage Fund/ },{ FUNDDESC: /Sundaram Diversified Equity Fund/ } ] } , { PAN1: pan },{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } , { TD_AMT: { $gte: 0 } } ,{ TRDESC: { $not: /^Consolidation Out.*/ } },{ TRDESC: { $not: /^Redemption.*/ } },{ TRDESC: { $not: /^Rejection.*/ } },{ TRDESC: { $not: /^Gross Dividend.*/ } },{ TRDESC: { $not: /^Switch Over Out.*/ } },  { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } },{ TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
        { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
        { $sort: { TRADDATE: -1 } }
    ]
       pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ SCHEME_NA1: /TAX/ }, { IT_PAN_NO1: pan }, { INVESTOR_2: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { AMOUNT: { $gte: 0 } } , { TRXN_TYPE: { $not: /^SIPR.*/ } },{ TRXN_TYPE: { $not: /^TO.*/ } },{ TRXN_TYPE: { $not: /^DP.*/ } },{ TRXN_TYPE: { $not: /^RED.*/ } },{ TRXN_TYPE: { $not: /^REDR.*/ } },{ TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } } , { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }  ] } },
        { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE"  } } },
        { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
        { $sort: { TRADDATE: -1 } }
    ]
  }
        transc.aggregate(pipeline, (err, camsdata) => {
             transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                      resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                    var datacon = frankdata.concat(karvydata.concat(camsdata))
                    
                   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                        for (var i = 0; i < datacon.length; i++) {
                            if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                                datacon[i]['TRXN_NATUR'] = "SIP";
                            } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                                datacon[i]['TRXN_NATUR'] = "SIPR";
                            } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                                datacon[i]['TRXN_NATUR'] = "STP";
                            } if (datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "Fresh Purchase") {
                                datacon[i]['TRXN_NATUR'] = "Purchase";
                            }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                            datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                               datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                           }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || datacon[i]['TRXN_NATUR'] === "NFO Purchase" || 
                           datacon[i]['TRXN_NATUR'] === "Initial Allotment" || datacon[i]['TRXN_NATUR'] === "NEWPUR" ) {
                               datacon[i]['TRXN_NATUR'] = "Purchase";
                           }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                           || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                           || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                               datacon[i]['TRXN_NATUR'] = "Switch In";
                           }
                        }
                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                    res.json(resdata)
                    return resdata
                });
             });
         });
} catch (err) {
    console.log(err)
}
});

app.post("/api/gettaxsaving", function (req, res) {
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
     pipeline = [  ///trans_cams
        { $match: { $and: [{ SCHEME: /Tax/ }, { TRXN_NATUR: { $not: /^Redemption.*/ } }, { TRXN_NATUR: { $not: /^Dividend.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
        { $group: { _id: { SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME", TRXN_NATURE: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } } } },
       
        { $sort: { TRADDATE: -1 } }
    ]
    pipeline1 = [  ///trans_karvy
        { $match: { $and: [{$or: [{ FUNDDESC: /TAX/ },{ FUNDDESC: /Long Term Equity Fund/ },{ FUNDDESC: /IDBI Equity Advantage Fund/ },{ FUNDDESC: /Sundaram Diversified Equity Fund/ } ] },{ TRDESC: { $not: /^Gross Dividend.*/ } }, { TRDESC: { $not: /^Redemption.*/ } }, { TRDESC: { $not: /^Switch Over Out.*/ } },{ TRDESC: { $not: /^S T P Out.*/ } }, { TRDESC: { $not: /^Dividend.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } } ,{ TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
        { $group: { _id: { FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
        { $sort: { TRADDATE: -1 } }
    ]
     pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ SCHEME_NA1: /TAX/ },{ TRXN_TYPE: { $not: /^TO.*/ } }, { TRXN_TYPE: { $not: /^RED.*/ } },{ TRXN_TYPE: { $not: /^DP.*/ } },{ TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Dividend.*/ } }, { TRXN_TYPE: { $not: /^Switchout.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } } ,{ TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
        { $group: { _id: { SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME_NA1", TRXN_NATURE: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
        { $sort: { TRADDATE: -1 } }
    ]

    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                var datacon = frankdata.concat(karvydata.concat(camsdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                    if (datacon[i]['TRXN_NATURE'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATURE'].match(/Systematic (ECS).*/)) {
                        datacon[i]['TRXN_NATURE'] = "SIP";
                    } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                        datacon[i]['TRXN_NATURE'] = "SIPR";
                    } if (datacon[i]['TRXN_NATURE'].match(/Systematic - From.*/)) {
                        datacon[i]['TRXN_NATURE'] = "STP";
                    } if (datacon[i]['TRXN_NATURE'] === "Additional Purchase" || datacon[i]['TRXN_NATURE'] === "Fresh Purchase") {
                        datacon[i]['TRXN_NATURE'] = "Purchase";
                    }if(datacon[i]['TRXN_NATURE'] === "Additional Purchase" || datacon[i]['TRXN_NATURE'] === "ADD" ||
                    datacon[i]['TRXN_NATURE'] === "ADDPUR") {
                       datacon[i]['TRXN_NATURE'] = "Add. Purchase";
                   }if (datacon[i]['TRXN_NATURE'] === "Purchase" || datacon[i]['TRXN_NATURE'] === "NEW" || 
                   datacon[i]['TRXN_NATURE'] === "Initial Allotment" || datacon[i]['TRXN_NATURE'] === "NEWPUR") {
                       datacon[i]['TRXN_NATURE'] = "Purchase";
                   }if (datacon[i]['TRXN_NATURE'] === "Lateral Shift In" || datacon[i]['TRXN_NATURE'] === "Switch-In" 
                   || datacon[i]['TRXN_NATURE'] === "Transfer-In" || datacon[i]['TRXN_NATURE'] === "Switch Over In" 
                   || datacon[i]['TRXN_NATURE'] === "LTIN" || datacon[i]['TRXN_NATURE'] === "LTIA") {
                       datacon[i]['TRXN_NATURE'] = "Switch In";
                   }
                }
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                return resdata
            });
        })
    });
});

app.post("/api/getdividendall", function (req, res) {
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    const pipeline = [  ///trans_cams
        { $match: { $and: [{ TRXN_NATUR: /Dividend/ }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME", TRXN_NATURE: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, year1: { $year: ('$_id.TRADDATE') }, year2: { $year: ('$_id.TRADDATE') } } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline1 = [  ///trans_karvy
        { $match: { $and: [{ TRDESC: /Dividend/ }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, SCHEME: "$_id.FUNDDESC", TRXN_NATURE: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, year1: { $year: ('$_id.TD_TRDT') }, year2: { $year: ('$_id.TD_TRDT') } } },
        { $sort: { TRADDATE: -1 } }
    ]
    const pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ TRXN_NATURE: /Dividend/ }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME_NA1", TRXN_NATURE: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, year1: { $year: ('$_id.TRXN_DATE') }, year2: { $year: ('$_id.TRXN_DATE') } } },
        { $sort: { TRADDATE: -1 } }
    ]
    transf.aggregate(pipeline2, (err, frankdata) => {
        transc.aggregate(pipeline, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                if (karvydata.length != 0 || camsdata.length != 0 || frankdata.length != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: karvydata
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                var datacon = karvydata.concat(camsdata.concat(frankdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                    if (datacon[i]['TRXN_NATURE'] === "Gross Dividend") {
                        datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                    } if (datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATURE'].match(/Dividend Reinvest.*/)) {
                        datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                    }
                }
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                return resdata
            });
        });
    })

});

app.post("/api/getdividenduserwise", function (req, res) {
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    if (req.body.pan === null || req.body.pan === '') {
        const pipeline = [  ///trans_cams
            { $match: { $and: [{ TRXN_NATUR: /Div/ }, { INV_NAME: req.body.name }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATURE: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } },  } },
        ]
        const pipeline1 = [  ///trans_karvy
            { $match: { $and: [{ TRDESC: /Div/ }, { INVNAME: req.body.name }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATURE: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
        ]
        const pipeline2 = [  ///trans_franklin
            { $match: { $and: [{ $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] }, { INVESTOR_2: req.body.name }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATURE: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
        ]
        transf.aggregate(pipeline2, (err, frankdata) => {
            transc.aggregate(pipeline, (err, camsdata) => {
                transk.aggregate(pipeline1, (err, karvydata) => {
                    if (karvydata.length != 0 || camsdata.length != 0 || frankdata.length != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: karvydata
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                    var datacon = karvydata.concat(camsdata.concat(frankdata))
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    for (var i = 0; i < datacon.length; i++) {
                        if (datacon[i]['TRXN_NATURE'] === "Gross Dividend") {
                            datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                        } if (datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/)) {
                            datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                        }
                    }
                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                    res.json(resdata)
                    return resdata
                });
            });
        });
    } else {
        const pipeline = [  ///trans_cams
            { $match: { $and: [{ TRXN_NATUR: /Div/ }, { PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATURE: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } },  } },
        ]
        const pipeline1 = [  ///trans_karvy
            { $match: { $and: [{ TRDESC: /Div/ }, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATURE: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
        ]
        const pipeline2 = [  ///trans_franklin
            { $match: { $and: [{ $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] }, { IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATURE: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
        ]
        transf.aggregate(pipeline2, (err, frankdata) => {
            transc.aggregate(pipeline, (err, camsdata) => {
                transk.aggregate(pipeline1, (err, karvydata) => {
                    if (karvydata.length != 0 || camsdata.length != 0 || frankdata.length != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: karvydata
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                    var datacon = karvydata.concat(camsdata.concat(frankdata))
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                    for (var i = 0; i < datacon.length; i++) {
                        if (datacon[i]['TRXN_NATURE'] === "Gross Dividend") {
                            datacon[i]['TRXN_NATURE'] = "Dividend Payout";
                        } if (datacon[i]['TRXN_NATURE'].match(/Div. Rei.*/)) {
                            datacon[i]['TRXN_NATURE'] = "Div. Reinv.";
                        }
                    }
                    resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                    res.json(resdata)
                    return resdata
                });
            });
        });
    }

});

app.post("/api/getdividendscheme", function (req, res) {
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
    const pipeline = [  ///trans_cams                                                     
        { $match: { $and: [{ TRXN_NATUR: /Div/ }, { SCHEME: req.body.scheme }, { PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INV_NAME: "$INV_NAME", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, INVNAME: "$_id.INV_NAME", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } } } },
    ]
    const pipeline1 = [  ///trans_karvy
        { $match: { $and: [{ TRDESC: /Div/ }, { FUNDDESC: req.body.scheme }, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INVNAME: "$INVNAME", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, INVNAME: "$_id.INVNAME", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
    ]
    const pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ TRXN_TYPE: /Div/ }, { SCHEME_NA1: req.body.scheme }, { IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INVESTOR_2: "$INVESTOR_2", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
    ]

    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                var datacon = frankdata.concat(karvydata.concat(camsdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                    if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                        datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                    } if (datacon[i]['TRXN_NATUR'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATUR'].match(/Dividend Reinvest*/)) {
                        datacon[i]['TRXN_NATUR'] = "Div. Reinv.";
                    } if (datacon[i]['TRXN_NATUR'].match(/Dividend Paid*/)) {
                        datacon[i]['TRXN_NATUR'] = "Div. Paid";
                    }
                }
                resdata.data = datacon;
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                return resdata
            });
        });
    });
});

app.post("/api/getdividend", function (req, res) {
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"

    const pipeline = [  ///trans_cams                                                     
        { $match: { $and: [{ TRXN_NATUR: /Div/ }, { PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { SCHEME: "$SCHEME", INV_NAME: "$INV_NAME" }, AMOUNT: { $sum: "$AMOUNT" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT" } } },
    ]
    const pipeline1 = [  ///trans_karvy
        { $match: { $and: [{ TRDESC: /Div/ }, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { FUNDDESC: "$FUNDDESC", INVNAME: "$INVNAME" }, AMOUNT: { $sum: "$TD_AMT" } } },
        { $project: { _id: 0, SCHEME: "$_id.FUNDDESC", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT" } } },
    ]
    const pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ TRXN_TYPE: /Div/ }, { IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { SCHEME_NA1: "$SCHEME_NA1", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
        { $project: { _id: 0, SCHEME: "$_id.SCHEME_NA1", INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT" } } },

    ]

    transc.aggregate(pipeline, (err, newdata) => {
        transk.aggregate(pipeline1, (err, newdata1) => {
            transf.aggregate(pipeline2, (err, newdata2) => {
                if (newdata != 0 || newdata1 != 0 || newdata2 != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: newdata2
                    }
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                resdata.data = datacon;
                res.json(resdata)
                return resdata
            });
        });
    })
});

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
    try {
        pipeline1 = [  ///trans_karvy
            { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio } },
            { $group: { _id: { PAN1: "$PAN1", INVNAME: "$INVNAME", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO", } } },
            { $lookup: { from: 'folio_karvy', localField: '_id.TD_ACNO', foreignField: 'ACNO', as: 'detail' } },
            { $unwind: "$detail" },
            { $project: { _id: 0, PAN: "$_id.PAN1", INVNAME: "$_id.INVNAME", FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", NOMINEE: "$detail.NOMINEE", BANK: "$detail.BNAME", ACCOUNTNO: "$detail.BNKACNO" } },
        ]
        pipeline2 = [  ///trans_franklin
            { $match: { IT_PAN_NO1: req.body.pan, SCHEME_NA1: req.body.scheme, FOLIO_NO: req.body.folio } },
            { $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", FOLIO_NO: "$FOLIO_NO", INVESTOR_2: "$INVESTOR_2", NOMINEE1: "$NOMINEE1", PBANK_NAME: "$PBANK_NAME", PERSONAL23: "$PERSONAL23" } } },
            { $project: { _id: 0, PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", FOLIO: "$_id.FOLIO_NO", INVNAME: "$_id.INVESTOR_2", NOMINEE: "$_id.NOMINEE1", BNAME: "$_id.PBANK_NAME", ACCOUNTNO: "$_id.PERSONAL23" } }
        ]
        pipeline3 = [  //trans_cams
            { $match: { PAN: req.body.pan, SCHEME: req.body.scheme, FOLIO_NO: req.body.folio } },
            { $group: { _id: { PAN: "$PAN", INV_NAME: "$INV_NAME", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", SCHEME_TYP: "$SCHEME_TYP", AC_NO: "$AC_NO", BANK_NAME: "$BANK_NAME" } } },
            { $lookup: { from: 'folio_cams', localField: '_id.FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
            { $unwind: "$detail" },
            { $project: { _id: 0, PAN: "$_id.PAN", INVNAME: "$_id.INV_NAME", FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", ACCOUNTNO: "$_id.AC_NO", BANK: "$_id.BANK_NAME", NOMINEE: "$detail.NOM_NAME" } },
        ]
        transc.aggregate(pipeline3, (err, camsdata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                transk.aggregate(pipeline1, (err, karvydata) => {
                    if (karvydata != 0 || frankdata != 0 || camsdata != 0) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            var datacon = frankdata.concat(karvydata.concat(camsdata));
                            var removeduplicates = datacon.map(JSON.stringify)
                                .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                .filter(function (item, index, arr) {
                                    return arr.indexOf(item, index + 1) === -1;
                                }) // check if there is any occurence of the item in whole array
                                .reverse().map(JSON.parse);
                            datacon = Array.from(new Set(removeduplicates));
                            var filtered = datacon.filter(
                                (temp => a =>
                                    (k => !temp[k] && (temp[k] = true))(a.FOLIO + '|' + a.SCHEME)
                                )(Object.create(null))
                            );
                            datacon = filtered;
                            res.send(datacon);
                            return datacon;
                        }
                    }
                });
            });
        });
    } catch (err) {
        console.log(e)
    }
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

app.post("/api/getsearchname", function (req, res) {
  //  var name = req.body.name;
    const pipeline1 = [  //trans_karvy
        { $match:{  INVNAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { INVNAME: { "$toUpper": ["$INVNAME"] } ,PAN1:"$PAN1"} } },
        { $project: { _id: 0, INVNAME:{ "$toUpper": ["$_id.INVNAME"] }, PAN:"$_id.PAN1" } }
    ]
    const pipeline2 = [  //trans_cams
        { $match:{  INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { INV_NAME: { "$toUpper": ["$INV_NAME"] } ,PAN:"$PAN"} } },
        { $project: { _id: 0, INVNAME:{ "$toUpper": ["$_id.INV_NAME"] }, PAN:"$_id.PAN" } }
    ]
    const pipeline3 = [  //trans_franklin
        { $match:{  INVESTOR_2:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { INVESTOR_2: { "$toUpper": ["$INVESTOR_2"] } ,IT_PAN_NO1:"$IT_PAN_NO1"} } },
        { $project: { _id: 0, INVNAME:{ "$toUpper": ["$_id.INVESTOR_2"] }, PAN:"$_id.IT_PAN_NO1" } }
    ]

    transk.aggregate(pipeline1, (err, karvydata) => {
        transc.aggregate(pipeline2, (err, camsdata) => {
            transf.aggregate(pipeline3, (err, frankdata) => {
               if ( frankdata != 0 || camsdata != 0 || karvydata != 0) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        var datacon= frankdata.concat(camsdata.concat(karvydata))
                        var removeduplicates = datacon.map(JSON.stringify)
                        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) {
                            return arr.indexOf(item, index + 1) === -1;
                        }) // check if there is any occurence of the item in whole array
                        .reverse()
                        .map(JSON.parse);
                        datacon = Array.from(new Set(removeduplicates));
                        res.send(datacon);
                        return datacon;
                    }
                }
     });
    });
});
})


app.post("/api/getnavdate", function (req, res) {
    const pipeline = [  
        { $match: { ISINDivPayoutISINGrowth: req.body.isin } },
        { $group: { _id: { SchemeName:"$SchemeName",Date: "$Date" } } },
        { $project: { _id: 0, SchemeName:"$_id.SchemeName", navdate: { $dateToString: { format: "%m/%d/%Y", date: "$_id.Date" } } } }
    ]

    var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');
    camsn.aggregate(pipeline, (err, data) => {
         
        var removeduplicates = Array.from(new Set(data));
        var datacon = removeduplicates.map(JSON.stringify)
                        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) {
                            return arr.indexOf(item, index + 1) === -1;
                        }) // check if there is any occurence of the item in whole array
                        .reverse()
                        .map(JSON.parse);
      //  console.log(datacon)
        res.send(datacon);
    });
})


// app.post("/api/getportfolioscheme", function (req, res) {
//         pipeline = [  //trans_cams
//             { $match: { PAN: req.body.pan , INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
//             { $group: { _id: { INV_NAME:"$INV_NAME",PAN: "$PAN", SCHEME: "$SCHEME", FOLIO_NO: "$FOLIO_NO" } } },
//             { $project: { _id: 0, NAME :"$_id.INV_NAME",PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", FOLIO: "$_id.FOLIO_NO" } }
//         ]
//     if(req.body.category ==="ALL"){
//         pipeline1 = [  //trans_karvy
//             { $match: { PAN1: req.body.pan, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//             { $group: { _id: { INVNAME:"$INVNAME",PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO" } } },
//             { $project: { _id: 0,NAME:"$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", FOLIO: "$_id.TD_ACNO" } }
//         ]
//     }else{
//         pipeline1 = [  //trans_karvy
//             { $match: { PAN1: req.body.pan, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' },ASSETTYPE: { $regex: `^${req.body.category}.*`, $options: 'i' } } },
//             { $group: { _id: { INVNAME:"$INVNAME",PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO" } } },
//             { $project: { _id: 0,NAME:"$_id.INVNAME",  PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", FOLIO: "$_id.TD_ACNO" } }
//         ]
//     }
    
//     pipeline2 = [   //trans_franklin
//         { $match: { IT_PAN_NO1: req.body.pan, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//         { $group: { _id: { INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", FOLIO_NO: "$FOLIO_NO" } } },
//         { $project: { _id: 0,NAME:"$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", FOLIO: "$_id.FOLIO_NO" } }
//     ]
//      transc.aggregate(pipeline, (err, data) => {
//          transk.aggregate(pipeline1, (err, data1) => {
//            transf.aggregate(pipeline2, (err, data2) => {
//             if ( data2 != 0 || data1 !=0) {
//                 if (err) {
//                     res.send(err);
//                 }
//                 else {
//                     let merged = data2.concat(data1);
//                     var removeduplicates = Array.from(new Set(merged));
//                     datacon = removeduplicates.map(JSON.stringify)
//                         .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) {
//                             return arr.indexOf(item, index + 1) === -1;
//                         }) // check if there is any occurence of the item in whole array
//                         .reverse()
//                         .map(JSON.parse);
//                     //let merged = [];
//                     //merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
//                     //console.log(merged)
//                     // datacon = datacon.filter(
//                     //     (temp => a =>
//                     //         (k => !temp[k] && (temp[k] = true))(a.SCHEME + '|' + a.FOLIO)
//                     //     )(Object.create(null))
//                     // );
//                        res.json(datacon);
//                     return datacon;
//                 }
//             }
//              });
//         });
//     });
// })

app.post("/api/getportfolioscheme", function (req, res) {
  
if(req.body.category ==="ALL"){
    pipeline1 = [  //trans_cams
        { $match: { PAN: req.body.pan , INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { INV_NAME:"$INV_NAME",PAN: "$PAN", SCHEME: "$SCHEME", FOLIO_NO: "$FOLIO_NO" } } },
        { $project: { _id: 0, NAME :"$_id.INV_NAME",PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", FOLIO: "$_id.FOLIO_NO",RTA:"CAMS" } }
    ]
    pipeline2 = [  //trans_karvy
        { $match: { PAN1: req.body.pan, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
        { $group: { _id: { INVNAME:"$INVNAME",PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO" } } },
        { $project: { _id: 0,NAME:"$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", FOLIO: "$_id.TD_ACNO" ,RTA:"KARVY" } }
    ]  
//     pipeline3 = [   //trans_franklin
//         { $match: { IT_PAN_NO1: req.body.pan, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//         { $group: { _id: { INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", FOLIO_NO: "$FOLIO_NO" } } },
//         { $project: { _id: 0,NAME:"$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", FOLIO: "$_id.FOLIO_NO",RTA:"FRANKLIN" } }
//     ]
}else{
    pipeline1 = [  //trans_cams
        { $match: { PAN: req.body.pan , INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' },SCHEME_TYP: { $regex: `^${req.body.category}.*`, $options: 'i' } } },
        { $group: { _id: { INV_NAME:"$INV_NAME",PAN: "$PAN", SCHEME: "$SCHEME", FOLIO_NO: "$FOLIO_NO" } } },
        { $project: { _id: 0, NAME :"$_id.INV_NAME",PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", FOLIO: "$_id.FOLIO_NO",RTA:"CAMS" } }
    ]
    pipeline2 = [  //trans_karvy
        { $match: { PAN1: req.body.pan, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' },ASSETTYPE: { $regex: `^${req.body.category}.*`, $options: 'i' } } },
        { $group: { _id: { INVNAME:"$INVNAME",PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO" } } },
        { $project: { _id: 0,NAME:"$_id.INVNAME",  PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", FOLIO: "$_id.TD_ACNO" } }
    ]
//     pipeline3 = [   //trans_franklin
//         { $match: { IT_PAN_NO1: req.body.pan, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//         { $group: { _id: { INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", FOLIO_NO: "$FOLIO_NO" } } },
//         { $project: { _id: 0,NAME:"$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", FOLIO: "$_id.FOLIO_NO",RTA:"FRANKLIN" } }
//     ]
}
transc.aggregate(pipeline1, (err, data1) => {
    transk.aggregate(pipeline2, (err, data2) => {
//        transf.aggregate(pipeline3, (err, data3) => {     
      
        if (data2.length !=0 || data1.length !=0) {
            if (err) {
                res.send(err);
            }
            else {
                let merged = data1.concat(data2);
                var removeduplicates = Array.from(new Set(merged));
                datacon = removeduplicates.map(JSON.stringify)
                    .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) {
                        return arr.indexOf(item, index + 1) === -1;
                    }) // check if there is any occurence of the item in whole array
                    .reverse()
                    .map(JSON.parse);
                //let merged = [];
                //merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
                //console.log(merged)
                datacon = datacon.filter(
                    (temp => a =>
                        (k => !temp[k] && (temp[k] = true))(a.SCHEME + '|' + a.FOLIO)
                    )(Object.create(null))
                );
                   res.json(datacon);
                return datacon;
            }
        }
//         });
    });
});
})

app.get("/api/getfolio", function (req, res) {
    pipeline1 = [  //trans_cams
                { $match:{  PAN:req.query.pan,INV_NAME:{$regex : `^${req.query.name}.*` , $options: 'i' } } },
                { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE:"$AMC_CODE" } } },
                { $lookup: { from: 'amc_list', localField: '_id.AMC_CODE', foreignField: 'amc_code', as: 'amclist' } },
                { $unwind: "$amclist" },
                { $project: { _id: 0, AMC: "$amclist.long_name" , FOLIO:"$_id.FOLIO_NO"  } },
                { $sort: {AMC:1}}
            ]
            pipeline2 = [  //trans_karvy
                { $match:{ PAN1:req.query.pan,INVNAME:{$regex : `^${req.query.name}.*` , $options: 'i' }} },
                { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND:"$TD_FUND" } } },
                { $lookup: { from: 'amc_list', localField: '_id.TD_FUND', foreignField: 'amc_code', as: 'amclist' } },
                { $unwind: "$amclist" },
                { $project: { _id: 0, AMC: "$amclist.long_name" , FOLIO:"$_id.TD_ACNO"  } },
                { $sort: {AMC:1}}
            ]
            pipeline3 = [  //trans_franklin
                { $match:{ IT_PAN_NO1:req.query.pan,INVESTOR_2:{$regex : `^${req.query.name}.*` , $options: 'i' }} },
                { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE:"$COMP_CODE" } } },
                { $lookup: { from: 'amc_list', localField: '_id.COMP_CODE', foreignField: 'amc_code', as: 'amclist' } },
                { $unwind: "$amclist" },
                { $project: { _id: 0, AMC: "$amclist.long_name" , FOLIO:"$_id.FOLIO_NO"  } },
                { $sort: {AMC:1}}
            ]
            transc.aggregate(pipeline1, (err, camsdata) => {
                transk.aggregate(pipeline2, (err, karvydata) => {
                    transf.aggregate(pipeline3, (err, frankdata) => {
              if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
             if (err) {
                 res.send(err);
             }
             else {
                 var datacon = frankdata.concat(karvydata.concat(camsdata))
                 var removeduplicates = Array.from(new Set(datacon));
                 datacon = removeduplicates.map(JSON.stringify)
                     .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                     .filter(function (item, index, arr) {
                         return arr.indexOf(item, index + 1) === -1;
                     }) // check if there is any occurence of the item in whole array
                     .reverse()
                     .map(JSON.parse);
                     datacon = datacon.sort((a, b) => (a.AMC > b.AMC) ? 1 : -1);
                 res.send(datacon);
                 return datacon;
             }
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


// app.post("/api/getfoliodetailweb", function (req, res) {
//     var unit = 0; var balance = 0;var currentvalue=0;var amt=0;var cnav = 0;
//     const pipeline1 = [  //trans_cams
//         { $match: { FOLIO_NO: req.body.folio, SCHEME: req.body.scheme,PAN:req.body.pan } },
//         { $group: { _id: { FOLIO_NO:"$FOLIO_NO",INV_NAME: "$INV_NAME",SCHEME:"$SCHEME",BANK_NAME: "$BANK_NAME", AC_NO: "$AC_NO",TRXN_TYPE_: "$TRXN_TYPE_",TRADDATE:"$TRADDATE",AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code:{ $ltrim: { input: "$PRODCODE", chars: "$AMC_CODE" } } } , UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" }  } },
//         {
//             $lookup:
//             {
//                 from: "products",
//                 let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
//                 pipeline: [
//                     {
//                         $match:
//                         {
//                             $expr:
//                             {
//                                 $and:
//                                     [
//                                         { $eq: ["$PRODUCT_CODE", "$$ccc"] },
//                                         { $eq: ["$AMC_CODE", "$$amc"] }
//                                     ]
//                             }
//                         }
//                     },
//                     { $project: { _id: 0 } }
//                 ],
//                 as: "products"
//             }
//         },
//       //   { $unwind: "$products" },
//          { $lookup: { from: 'cams_nav', localField: 'products.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//        //  { $unwind: "$nav" },
//          { $lookup: { from: 'folio_cams', localField: '_id.FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
//        //  { $unwind: "$detail" },
//          { $project: { _id: 0, FOLIO:"$_id.FOLIO_NO",INVNAME: "$_id.INV_NAME",SCHEME:"$_id.SCHEME",NATURE: "$_id.TRXN_TYPE_",TD_TRDT:"$_id.TRADDATE",ISIN: "$products.ISIN",NOMINEE: "$detail.NOM_NAME", BANK_NAME: "$_id.BANK_NAME", AC_NO: "$_id.AC_NO",JTNAME2: "$detail.JNT_NAME2", JTNAME1: "$detail.JNT_NAME1", cnav: "$nav.NetAssetValue",  UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//     ]

//     const pipeline2 = [  //trans_karvy
//         { $match: { TD_ACNO: req.body.folio, FUNDDESC: req.body.scheme ,PAN1:req.body.pan} },
//         { $group: { _id: {TD_ACNO:"$TD_ACNO", INVNAME: "$INVNAME",FUNDDESC:"$FUNDDESC",TD_TRTYPE: "$TD_TRTYPE",TD_TRDT:"$TD_TRDT", SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" } , TD_AMT: { $sum: "$TD_AMT" }} },
//         {
//             $lookup:
//             {
//                 from: "cams_nav",
//                 let: { isin: "$_id.SCHEMEISIN" },
//                 pipeline: [
//                     {
//                         $match:
//                         {
//                             $expr:
//                             {
//                                 $or:
//                                     [
//                                         { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
//                                         { $eq: ["$ISINDivReinvestment", "$$isin"] }
//                                     ]
//                             }
//                         }
//                     },
//                     { $project: { _id: 0 } }
//                 ],
//                 as: "nav"
//             }
//         },
//       //  { $unwind: "$nav" },
//         { $lookup: { from: 'folio_karvy', localField: '_id.TD_ACNO', foreignField: 'ACNO', as: 'detail' } },
//       //  { $unwind: "$detail" },
//         { $project: { _id: 0, FOLIO:"$_id.TD_ACNO",INVNAME: "$_id.INVNAME",SCHEME:"$_id.FUNDDESC",NATURE: "$_id.TD_TRTYPE",TD_TRDT:"$_id.TD_TRDT",ISIN: "$_id.SCHEMEISIN" ,NOMINEE: "$detail.NOMINEE",  BANK_NAME: "$detail.BNAME" ,AC_NO: "$detail.BNKACNO", JTNAME2: "$detail.JTNAME2", JTNAME1: "$detail.JTNAME1",cnav: "$nav.NetAssetValue", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } } ,
//     ]

//     const pipeline3 = [  //trans_franklin
//         { $match: { FOLIO_NO: req.body.folio, SCHEME_NA1: req.body.scheme ,IT_PAN_NO1:req.body.pan} },
//         { $group: { _id: { FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE: "$TRXN_TYPE",TRXN_DATE:"$TRXN_DATE", ISIN: "$ISIN", NOMINEE1: "$NOMINEE1", PBANK_NAME: "$PBANK_NAME", PERSONAL23: "$PERSONAL23", JOINT_NAM2: "$JOINT_NAM2", JOINT_NAM1: "$JOINT_NAM1" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//        // { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField:{ $or: ['ISINDivReinvestment','ISINDivPayoutISINGrowth'] }, as: 'nav' } },
//        // { $unwind: "$nav" },
//        {
//         $lookup:
//         {
//             from: "cams_nav",
//             let: { isin: "$_id.ISIN" },
//             pipeline: [
//                 {
//                     $match:
//                     {
//                         $expr:
//                         {
//                             $or:
//                                 [
//                                     { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
//                                     { $eq: ["$ISINDivReinvestment", "$$isin"] }
//                                 ]
//                         }
//                     }
//                 },
//                 { $project: { _id: 0 } }
//             ],
//             as: "nav"
//         }
//     },
//    // { $unwind: "$nav" },
//         { $project: { _id: 0,FOLIO:"$_id.FOLIO_NO", INVNAME: "$_id.INVESTOR_2",SCHEME:"$_id.SCHEME_NA1", NATURE: "$_id.TRXN_TYPE",TD_TRDT:"$_id.TRXN_DATE",ISIN: "$_id.ISIN", NOMINEE: "$_id.NOMINEE1", BANK_NAME: "$_id.PBANK_NAME", AC_NO: "$_id.PERSONAL23", JTNAME2: "$_id.JOINT_NAM2", JTNAME1: "$_id.JOINT_NAM1", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
//     ]

//        transc.aggregate(pipeline1, (err, camsdata) => {
//           transk.aggregate(pipeline2, (err, karvydata) => {
//               transf.aggregate(pipeline3, (err, frankdata) => {
//                         if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
//                            resdata = {
//                                 status: 200,
//                                 message: "Successfull",
//                                 data: karvydata
//                             };
//                         } else {
//                             resdata = {
//                                 status: 400,
//                                 message: "Data not found"
//                             };
//                         }
//                          var datacon = frankdata.concat(karvydata.concat(camsdata));
//                          console.log(datacon)
//                          datacon = datacon
//                             .map(JSON.stringify)
//                             .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                             .filter(function (item, index, arr) {
//                                 return arr.indexOf(item, index + 1) === -1;
//                             }) // check if there is any occurence of the item in whole array
//                             .reverse()
//                             .map(JSON.parse);
                         
//                         for(i = 0; i<datacon.length; i++) {
//                             if (datacon[i]['NATURE'] === "RED" ||datacon[i]['NATURE'] === "LTOP" ||datacon[i]['NATURE'] === "Lateral Shift Out" || 
//                             datacon[i]['NATURE'] === "Switch Out" ||datacon[i]['NATURE'] === "IPOR" ||datacon[i]['NATURE'] === "LTOF" ||
//                             datacon[i]['NATURE'] === "FUL" ||datacon[i]['NATURE'] === "STPO" ||datacon[i]['NATURE'] === "CNO" ||
//                             datacon[i]['NATURE'] === "FULR" ||datacon[i]['NATURE'] === "Full Redemption" || datacon[i]['NATURE'] === "Partial Switch Out"
//                             || datacon[i]['NATURE'] === "Full Switch Out" || datacon[i]['NATURE'] === "Partial Redemption"
//                             || datacon[i]['NATURE'] === "SWD" || datacon[i]['NATURE'] === "SWOF") {
//                                 unit = "-"+datacon[i].UNITS;
//                               }else{
//                                 unit = datacon[i].UNITS;
//                               }
                         
//                              balance = parseFloat(unit)+parseFloat(balance) ;
//                              cnav = datacon[i].cnav;
//                         }
//                         var index = datacon.length - 1 ;
//                         if(balance>0){
//                         datacon[index].UNITS = balance;
//                         datacon[index].AMOUNT = parseFloat(cnav)*parseFloat(balance) ;
//                         }else if(balance.isNaN || cnav !=""){
//                         datacon[index].UNITS = 0;
//                         datacon[index].AMOUNT = 0 ;
//                          }
//                        else{
//                             datacon[index].UNITS = balance;
//                             datacon[index].AMOUNT = 0 ;
//                         }

//                          if(datacon[0].BANK_NAME[0].length <2 || datacon[0].BANK_NAME[0] === ""){
//                              datacon[index].BANK_NAME =  datacon[0].BANK_NAME;  
//                          }else{
//                              datacon[index].BANK_NAME =  datacon[0].BANK_NAME[0];
//                          }
//                         if(datacon[0].AC_NO[0].length <2 || datacon[0].AC_NO[0] === ""){
//                              datacon[index].AC_NO =  datacon[0].AC_NO;
//                         }else{
//                              datacon[index].AC_NO =  datacon[0].AC_NO[0];
//                          }
//                          if( datacon[0].JTNAME2[0] === ""){
//                              datacon[index].JTNAME2 =  datacon[0].JTNAME2;
//                            }else{
//                             datacon[index].JTNAME2 =  datacon[0].JTNAME2[0];
//                             }  
//                            if(datacon[0].JTNAME1 === "" ){
//                             datacon[index].JTNAME1 = datacon[0].JTNAME1; 
//                            }
//                          else if(datacon[0].JTNAME1[0].length <2 ||  datacon[0].JTNAME1[0] === "" ||datacon[0].JTNAME1 === ""  ){
//                             datacon[index].JTNAME1 =  datacon[0].JTNAME1;
//                           }else{
//                            datacon[index].JTNAME1 =  datacon[0].JTNAME1[0];
//                            }
//                            if(datacon[0].NOMINEE ===""){
//                             datacon[index].NOMINEE =  datacon[0].NOMINEE;
//                            }
//                            else if(datacon[0].NOMINEE[0].length <2 ||  datacon[0].NOMINEE[0] === ""  ){
//                              datacon[index].NOMINEE =  datacon[0].NOMINEE;
//                            }else{
//                              datacon[index].NOMINEE =  datacon[0].NOMINEE[0];
//                             }
//                         datacon[index].INVNAME =  datacon[0].INVNAME;
//                        resdata.data = [datacon[index]];
//                         res.json(resdata);
//                         return resdata;

//                     });
//                });
//            });
// })

app.post("/api/getfoliodetailweb", function (req, res) {
    var unit = 0; var balance = 0;var currentvalue=0;var amt=0;var cnav = 0;
    const pipeline1 = [  //trans_cams
        { $match: { FOLIO_NO: req.body.folio, SCHEME: req.body.scheme,PAN:req.body.pan } },                                                                                                                            
        // { $group: { _id: { FOLIO_NO:"$FOLIO_NO",INV_NAME: "$INV_NAME",SCHEME:"$SCHEME",BANK_NAME: "$BANK_NAME", AC_NO: "$AC_NO",TRXN_TYPE_: "$TRXN_TYPE_",TRADDATE:"$TRADDATE",AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code:{ $ltrim: { input: "$PRODCODE", chars: "$AMC_CODE"} } } , UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" }  } },
       { $group: { _id: { FOLIO_NO:"$FOLIO_NO",INV_NAME: "$INV_NAME",SCHEME:"$SCHEME",BANK_NAME: "$BANK_NAME", AC_NO: "$AC_NO",TRXN_TYPE_: "$TRXN_TYPE_",TRADDATE:"$TRADDATE",AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE",   code:{ $substr: [ "$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1 ] } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" }  } },
        {
            $lookup:
            {
                from: "products",
                let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                        { $eq: ["$AMC_CODE", "$$amc"] }
                                    ]
                            }
                        }
                    },
                    { $project: { _id: 0 } }
                ],
                as: "products"
            }
        },
       // { $unwind: "$products" },
        { $lookup: { from: 'cams_nav', localField: 'products.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
       // { $unwind: "$nav" },
         { $lookup: { from: 'folio_cams', localField: '_id.FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
        // { $unwind: "$detail" },
         { $project: { _id: 0, FOLIO:"$_id.FOLIO_NO",INVNAME: "$_id.INV_NAME",SCHEME:"$_id.SCHEME",NATURE: "$_id.TRXN_TYPE_",TD_TRDT:"$_id.TRADDATE",ISIN: "$products.ISIN",NOMINEE: "$detail.NOM_NAME", BANK_NAME: "$_id.BANK_NAME", AC_NO: "$_id.AC_NO",JTNAME2: "$detail.JNT_NAME2", JTNAME1: "$detail.JNT_NAME1", cnav: "$nav.NetAssetValue",  UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
    ]

    const pipeline2 = [  //trans_karvy
        { $match: { TD_ACNO: req.body.folio, FUNDDESC: req.body.scheme ,PAN1:req.body.pan} },
        { $group: { _id: {TD_ACNO:"$TD_ACNO", INVNAME: "$INVNAME",FUNDDESC:"$FUNDDESC",TD_TRTYPE: "$TD_TRTYPE",TD_TRDT:"$TD_TRDT", SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" } , TD_AMT: { $sum: "$TD_AMT" }} },
        {
            $lookup:
            {
                from: "cams_nav",
                let: { isin: "$_id.SCHEMEISIN" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $or:
                                    [
                                        { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
                                        { $eq: ["$ISINDivReinvestment", "$$isin"] }
                                    ]
                            }
                        }
                    },
                    { $project: { _id: 0 } }
                ],
                as: "nav"
            }
        },
      //  { $unwind: "$nav" },
        { $lookup: { from: 'folio_karvy', localField: '_id.TD_ACNO', foreignField: 'ACNO', as: 'detail' } },
      //  { $unwind: "$detail" },
        { $project: { _id: 0, FOLIO:"$_id.TD_ACNO",INVNAME: "$_id.INVNAME",SCHEME:"$_id.FUNDDESC",NATURE: "$_id.TD_TRTYPE",TD_TRDT:"$_id.TD_TRDT",ISIN: "$_id.SCHEMEISIN" ,NOMINEE: "$detail.NOMINEE",  BANK_NAME: "$detail.BNAME" ,AC_NO: "$detail.BNKACNO", JTNAME2: "$detail.JTNAME2", JTNAME1: "$detail.JTNAME1",cnav: "$nav.NetAssetValue", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } } ,
    ]

    const pipeline3 = [  //trans_franklin
        { $match: { FOLIO_NO: req.body.folio, SCHEME_NA1: req.body.scheme ,IT_PAN_NO1:req.body.pan} },
        { $group: { _id: { FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE: "$TRXN_TYPE",TRXN_DATE:"$TRXN_DATE", ISIN: "$ISIN", NOMINEE1: "$NOMINEE1", PBANK_NAME: "$PBANK_NAME", PERSONAL23: "$PERSONAL23", JOINT_NAM2: "$JOINT_NAM2", JOINT_NAM1: "$JOINT_NAM1" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
       // { $unwind: "$nav" },
       {
        $lookup:
        {
            from: "cams_nav",
            let: { isin: "$_id.ISIN" },
            pipeline: [
                {
                    $match:
                    {
                        $expr:
                        {
                            $or:
                                [
                                    { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
                                    { $eq: ["$ISINDivReinvestment", "$$isin"] }
                                ]
                        }
                    }
                },
                { $project: { _id: 0 } }
            ],
            as: "nav"
        }
    },
   // { $unwind: "$nav" },
        { $project: { _id: 0,FOLIO:"$_id.FOLIO_NO", INVNAME: "$_id.INVESTOR_2",SCHEME:"$_id.SCHEME_NA1", NATURE: "$_id.TRXN_TYPE",TD_TRDT:"$_id.TRXN_DATE",ISIN: "$_id.ISIN", NOMINEE: "$_id.NOMINEE1", BANK_NAME: "$_id.PBANK_NAME", AC_NO: "$_id.PERSONAL23", JTNAME2: "$_id.JOINT_NAM2", JTNAME1: "$_id.JOINT_NAM1", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
    ]

       transc.aggregate(pipeline1, (err, camsdata) => {
          transk.aggregate(pipeline2, (err, karvydata) => {
              transf.aggregate(pipeline3, (err, frankdata) => {
                        if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
                           resdata = {
                                status: 200,
                                message: "Successfull",
                                data: frankdata
                            };
                        } else {
                            resdata = {
                                status: 400,
                                message: "Data not found"
                            };
                        }
                         var datacon = frankdata.concat(karvydata.concat(camsdata));
                         console.log(datacon)
                         datacon = datacon
                            .map(JSON.stringify)
                            .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) {
                                return arr.indexOf(item, index + 1) === -1;
                            }) // check if there is any occurence of the item in whole array
                            .reverse()
                            .map(JSON.parse);
                         
                        for(i = 0; i<datacon.length; i++) {
                            if (datacon[i]['NATURE'] === "RED" ||datacon[i]['NATURE'] === "LTOP" ||datacon[i]['NATURE'] === "Lateral Shift Out" || 
                            datacon[i]['NATURE'] === "Switch Out" ||datacon[i]['NATURE'] === "IPOR" ||datacon[i]['NATURE'] === "LTOF" ||
                            datacon[i]['NATURE'] === "FUL" ||datacon[i]['NATURE'] === "STPO" ||datacon[i]['NATURE'] === "CNO" ||
                            datacon[i]['NATURE'] === "FULR" ||datacon[i]['NATURE'] === "Full Redemption" || datacon[i]['NATURE'] === "Partial Switch Out"
                            || datacon[i]['NATURE'] === "Full Switch Out" || datacon[i]['NATURE'] === "Partial Redemption"
                            || datacon[i]['NATURE'] === "SWD" || datacon[i]['NATURE'] === "SWOF" || datacon[i]['NATURE'] === "TOCOB") {
                                unit = "-"+datacon[i].UNITS;
                              }else{
                                unit = datacon[i].UNITS;
                              }
                         
                             balance = parseFloat(unit)+parseFloat(balance) ;
                             cnav = datacon[i].cnav;
                            
                        }
                        var index = datacon.length - 1 ;
                      
                        if(balance>0){
                        datacon[index].UNITS = balance;
                        datacon[index].AMOUNT = parseFloat(cnav)*parseFloat(balance) ;
                        }else if(balance.isNaN || cnav !=""){
                        datacon[index].UNITS = 0;
                        datacon[index].AMOUNT = 0 ;
                         }
                       else{
                            datacon[index].UNITS = 0;
                            datacon[index].AMOUNT = 0 ;
                        }

                         if(datacon[0].BANK_NAME[0].length <2 || datacon[0].BANK_NAME[0] === ""){
                             datacon[index].BANK_NAME =  datacon[0].BANK_NAME;  
                         }else{
                             datacon[index].BANK_NAME =  datacon[0].BANK_NAME[0];
                         }
                        if(datacon[0].AC_NO[0].length <2 || datacon[0].AC_NO[0] === ""){
                             datacon[index].AC_NO =  datacon[0].AC_NO;
                        }else{
                             datacon[index].AC_NO =  datacon[0].AC_NO[0];
                         }
                         if( datacon[0].JTNAME2[0] === ""){
                             datacon[index].JTNAME2 =  datacon[0].JTNAME2;
                           }else{
                            datacon[index].JTNAME2 =  datacon[0].JTNAME2[0];
                            }  
                           // console.log(typeof datacon[0].JTNAME1[0])
                           if(datacon[0].JTNAME1 === "" ){
                            datacon[index].JTNAME1 = datacon[0].JTNAME1; 
                           }
                         else if(datacon[0].JTNAME1[0].length <2 ||  datacon[0].JTNAME1[0] === "" ||datacon[0].JTNAME1 === ""  ){
                            datacon[index].JTNAME1 =  datacon[0].JTNAME1;
                          }else{
                           datacon[index].JTNAME1 =  datacon[0].JTNAME1[0];
                           }
                           if(datacon[0].NOMINEE ===""){
                            datacon[index].NOMINEE =  datacon[0].NOMINEE;
                           }
                           else if(datacon[0].NOMINEE[0].length <2 ||  datacon[0].NOMINEE[0] === ""  ){
                             datacon[index].NOMINEE =  datacon[0].NOMINEE;
                           }else{
                             datacon[index].NOMINEE =  datacon[0].NOMINEE[0];
                            }
                        datacon[index].INVNAME =  datacon[0].INVNAME;
                        
                        
                        
                        
                       resdata.data = [datacon[index]];

                        res.json(resdata);
                        return resdata;

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

app.post("/api/getschemeportfoliodetail", function (req, res) {

    pipeline1 = [  //trans_cams
        { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio, INV_NAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", PURPRICE: "$PURPRICE", TRXN_TYPE_: "$TRXN_TYPE_", TRADDATE: "$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
        {
            $lookup:
            {
                from: "products",
                let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                        { $eq: ["$AMC_CODE", "$$amc"] }
                                    ]
                            }
                        }
                    },
                    { $project: { _id: 0 } }
                ],
                as: "products"
            }
        },

        { $unwind: "$products" },
        { $group: { _id: { FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", PURPRICE: "$_id.PURPRICE", TRXN_TYPE_: "$_id.TRXN_TYPE_", TRADDATE: "$_id.TRADDATE", ISIN: "$products.ISIN" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
        { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
        { $unwind: "$nav" },

        { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TD_NAV: "$_id.PURPRICE", NATURE: "$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } }, ISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
        { $sort: { TD_TRDT: -1 } }
    ]
    pipeline2 = [  //trans_karvy   
        { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
        { $group: { _id: { TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" }, TD_AMT: { $sum: "$TD_AMT" } } },
        { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
        { $unwind: "$nav" },
        { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, ISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } },
        { $sort: { TD_TRDT: -1 } }
    ]
    if (req.body.RTA === "CAMS") {
        transc.aggregate(pipeline1, (err, camsdata) => {
            if (camsdata != 0) {
                resdata = {
                    status: 200,
                    message: "Successfull",
                    data: camsdata
                }
            } else {
                resdata = {
                    status: 400,
                    message: "Data not found"
                }
            }
            datacon = camsdata;
            for (var i = 0; i < datacon.length; i++) {
                if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
                    datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
                    datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                    datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
                    datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
                    datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
                    datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
                    datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
                    datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
                    datacon[i]['NATURE'] === "SWD") {
                    datacon[i]['NATURE'] = "Switch Out";
                }
                if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
                    datacon[i]['NATURE'] === "SIN" ||
                   // datacon[i]['NATURE'].match(/Systematic Withdrawal.*/) ||
                    datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
                    datacon[i]['NATURE'].match(/Systematic - To.*/) ||
                    datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
                    datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
                    datacon[i]['NATURE'].match(/Systematic.*/) ||
                    datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
                    datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
                    datacon[i]['NATURE'] = "SIP";
                }
                if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase") {
                    datacon[i]['NATURE'] = "Purchase";
                }
                if (datacon[i]['NATURE'] === "Switch In" || datacon[i]['NATURE'] === "LTIA" || 
                   datacon[i]['NATURE'] === "LTIN") {
                    datacon[i]['NATURE'] = "Switch In";
                }
              
            }
            //   resdata.data = datacon;
            resdata.data = datacon.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime())
            res.json(resdata);
            return resdata;
        });
    } else {
        transk.aggregate(pipeline2, (err, karvydata) => {
            if (karvydata != 0) {
                resdata = {
                    status: 200,
                    message: "Successfull",
                    data: karvydata
                }
            } else {
                resdata = {
                    status: 400,
                    message: "Data not found"
                }
            }
            datacon = karvydata;
            for (var i = 0; i < datacon.length; i++) {
                if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
                    datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
                    datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                    datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
                    datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
                    datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
                    datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
                    datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
                    datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF"||
                    datacon[i]['NATURE'] === "SWD") {
                    datacon[i]['NATURE'] = "Switch Out";
                }
                if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
                    datacon[i]['NATURE'] === "SIN" ||
                    //datacon[i]['NATURE'].match(/Systematic Withdrawal.*/) ||
                    datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
                    datacon[i]['NATURE'].match(/Systematic - To.*/) ||
                    datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
                    datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
                    datacon[i]['NATURE'].match(/Systematic.*/) ||
                    datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
                    datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
                    datacon[i]['NATURE'] = "SIP";
                }
                if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase") {
                    datacon[i]['NATURE'] = "Purchase";
                }
                if (datacon[i]['NATURE'] === "Switch In" || datacon[i]['NATURE'] === "LTIA" || 
                datacon[i]['NATURE'] === "LTIN") {
                 datacon[i]['NATURE'] = "Switch In";
             }
           
            }
            
            resdata.data = datacon.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime())
            res.json(resdata);
            return resdata;
        });

    }
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

app.post("/api/getamclist", function (req, res) {
    try {
        if (req.body.pan === "" || req.body.pan === undefined || req.body === "" || req.body.pan === null) {
            resdata = {
                status: 400,
                message: 'Data not found',
            }
            res.json(resdata)
            return resdata;
        } else {
            var pan = req.body.pan;

            const pipeline = [
                //trans_franklin
                { $match: { IT_PAN_NO1: pan } },
                { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE: "$COMP_CODE" } } },
                {
                    $project: {
                        _id: 0,
                        folio: "$_id.FOLIO_NO",
                        amc_code: "$_id.COMP_CODE",
                    }
                },
                { $sort: { amc_code: 1 } },

            ];

            const pipeline1 = [
                //trans_cams
                { $match: { PAN: pan } },
                { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" } } },
                {
                    $project: {
                        _id: 0,
                        folio: "$_id.FOLIO_NO",
                        amc_code: "$_id.AMC_CODE",
                    }
                },
                { $sort: { amc_code: 1 } }
            ];
            const pipeline2 = [
                //trans_karvy
                { $match: { PAN1: pan } },
                { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" } } },
                {
                    $project: {
                        _id: 0,
                        folio: "$_id.TD_ACNO",
                        amc_code: "$_id.TD_FUND",
                    }
                },
                { $sort: { amc_code: 1 } }
            ];
            transf.aggregate(pipeline, (err, newdata) => {
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
                            .filter(function (item, index, arr) {
                                return arr.indexOf(item, index + 1) === -1;
                            }) // check if there is any occurence of the item in whole array
                            .reverse()
                            .map(JSON.parse);

                        for (var i = 0; i < datacon.length; i++) {
                            //console.log(datacon[i]['amc_code']);
                            if (datacon[i]['amc_code'] != "" && datacon[i]['folio'] != "" && datacon[i]['scheme'] != "") {

                                resdata.data = datacon[i];

                            }
                        }
                        resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
                        res.json(resdata);
                        return resdata;
                    });
                });
            });
        }
    } catch (err) {
        console.log(e)
    }
});



app.post("/api/getschemelist", function (req, res) {
    if (req.body.pan === "" || req.body.pan === undefined || req.body === "" || req.body.pan === null) {
        resdata = {
            status: 400,
            message: 'Data not found',
        }
        res.json(resdata)
        return resdata;
    } else {
        var pan = req.body.pan;
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [
            { $match: { PAN: pan } },
            { $group: { _id: { AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $reduce: { input: { $split: ["$PRODCODE", "$AMC_CODE"] }, initialValue: "", in: { $concat: ["$$value", "$$this"] } } } } } },
            {
                $lookup:
                {
                    from: "products",
                    let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                            { $eq: ["$AMC_CODE", "$$amc"] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    as: "products"
                }
            },

            { $unwind: "$products" },
            //  {$sort: {products.PRODUCT_LONG_NAME: 1}},
            { $project: { _id: 0, products: "$products" } },
        ]
        const pipeline1 = [  //trans_karvy
            { $match: { PAN1: pan, SCHEMEISIN: { $ne: null } } },
            { $group: { _id: { SCHEMEISIN: "$SCHEMEISIN" } } },
            { $lookup: { from: 'products', localField: '_id.SCHEMEISIN', foreignField: 'ISIN', as: 'master' } },
            { $unwind: "$master" },
            { $project: { _id: 0, products: "$master" } },

        ]
        const pipeline2 = [ ///trans_franklin
            { $match: { IT_PAN_NO1: pan, ISIN: { $ne: null } } },
            { $group: { _id: { ISIN: "$ISIN" } } },
            { $lookup: { from: 'products', localField: '_id.ISIN', foreignField: 'ISIN', as: 'master' } },
            { $unwind: "$master" },
            { $project: { _id: 0, products: "$master" } },
        ]
        transc.aggregate(pipeline, (err, newdata2) => {
            transf.aggregate(pipeline2, (err, newdata1) => {
                transk.aggregate(pipeline1, (err, newdata) => {
                    if (newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: newdata2
                        }
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                    }
                    var datacon = newdata2.concat(newdata1.concat(newdata))
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
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
            { FOLIOCHK: req.body[i].FOLIOCHK, SCH_NAME: req.body[i].SCH_NAME, AC_NO: req.body[i].AC_NO, PRODUCT: req.body[i].PRODUCT,FOLIO_DATE: req.body[i].FOLIO_DATE },
            {
                $set:
                {
                    AMC_CODE: req.body[i].AMC_CODE,
                    FOLIOCHK: req.body[i].FOLIOCHK,
                    INV_NAME: req.body[i].INV_NAME,
                    SCH_NAME: req.body[i].SCH_NAME,
                    JNT_NAME1: req.body[i].JNT_NAME1,
                    JNT_NAME2: req.body[i].JNT_NAME2,
                    PAN_NO: req.body[i].PAN_NO,
                    JOINT1_PAN: req.body[i].JOINT1_PAN,
                    AC_NO: req.body[i].AC_NO,
                    NOM_NAME: req.body[i].NOM_NAME,
                    NOM2_NAME: req.body[i].NOM2_NAME,
                    NOM3_NAME: req.body[i].NOM3_NAME,
                    IFSC_CODE: req.body[i].IFSC_CODE,
                    PRODUCT: req.body[i].PRODUCT,
                    BANK_NAME: req.body[i].BANK_NAME,
                    EMAIL: req.body[i].EMAIL,
                    HOLDING_NA: req.body[i].HOLDING_NA,
                    JOINT1_PAN: req.body[i].JOINT1_PAN,
                    GUARD_PAN: req.body[i].GUARD_PAN,
                    TAX_STATUS: req.body[i].TAX_STATUS,
                    GUARD_NAME: req.body[i].GUARD_NAME,
                    FOLIO_DATE: new Date(moment(req.body[i].FOLIO_DATE).format("YYYY-MM-DD")),
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                }
            })
    }
    console.log("successfully inserted")
})



 app.post("/api/savefoliokarvy", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        foliok.updateMany(
            { INVNAME: req.body[i].INVNAME, JTNAME1: req.body[i].JTNAME1, ACNO: req.body[i].ACNO, FUNDDESC: req.body[i].FUNDDESC, BNKACNO: req.body[i].BNKACNO, BNKACTYPE: req.body[i].BNKACTYPE, PANGNO: req.body[i].PANGNO },
            {
                $set:
                {
                    INVNAME: req.body[i].INVNAME,
                    JTNAME1: req.body[i].JTNAME1,
                    JTNAME2: req.body[i].JTNAME2,
                    BNKACNO: req.body[i].BNKACNO,
                    BNAME: req.body[i].BNAME,
                    PANGNO: req.body[i].PANGNO,
                    NOMINEE: req.body[i].NOMINEE,
                    FUNDDESC: req.body[i].FUNDDESC,
                    ACNO: req.body[i].ACNO,
                    PRCODE: req.body[i].PRCODE,
                    FUND: req.body[i].FUND,
                    BNKACTYPE: req.body[i].BNKACTYPE,
                    STATUS: req.body[i].STATUS,
                    EMAIL: req.body[i].EMAIL,
                    MODEOFHOLD: req.body[i].MODEOFHOLD,
                    PAN2: req.body[i].PAN2,
                    GUARDIANN0: req.body[i].GUARDIANN0,
                    STATUSDESC: req.body[i].STATUSDESC,
                    GUARDPANNO: req.body[i].GUARDPANNO,
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                }
            })
    }
    console.log("successfully inserted")
})

app.post("/api/savefoliofranklin", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        foliof.updateMany(
            { FOLIO_NO: req.body[i].FOLIO_NO ,PERSONAL_9: req.body[i].PERSONAL_9,},
            {
                $set:
                {
                    PANNO1: req.body[i].PANNO1,
                    PHONE_RES: req.body[i].PHONE_RES,
                    F_NAME: req.body[i].F_NAME,
                    D_BIRTH: req.body[i].D_BIRTH,
                    ACCNT_NO: req.body[i].ACCNT_NO,
                    BANK_NAME: req.body[i].BANK_NAME,
                    ADDRESS1: req.body[i].ADDRESS1,
                    JOINT_NAM1: req.body[i].JOINT_NAM1,
                    INV_NAME: req.body[i].INV_NAME,
                    FOLIO_NO: req.body[i].FOLIO_NO,
                    NOMINEE1: req.body[i].NOMINEE1,
                    NEFT_CODE: req.body[i].NEFT_CODE,
                    IFSC_CODE: req.body[i].IFSC_CODE,
                    BANK_CODE: req.body[i].BANK_CODE,
                    COMP_CODE: req.body[i].COMP_CODE,
                    AC_TYPE: req.body[i].AC_TYPE,
                    KYC_ID: req.body[i].KYC_ID,
                    HOLDING_T6: req.body[i].HOLDING_T6,
                    PBANK_NAME: req.body[i].PBANK_NAME,
                    PERSONAL_9: req.body[i].PERSONAL_9,
                    JOINT_NAM2: req.body[i].JOINT_NAM2,
                    TAX_STATUS: req.body[i].TAX_STATUS,
                    EMAIL: req.body[i].EMAIL,
                    PANNO2: req.body[i].PANNO2,
                    HOLDING_T6: req.body[i].HOLDING_T6,
                    SOCIAL_ST7: req.body[i].SOCIAL_ST7,
                    GUARDIAN20: req.body[i].GUARDIAN20,
                 }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                }
            })
    }
    console.log("successfully inserted")
})

app.post("/api/savetranscams", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        transc.updateMany(
            { TRXNNO: req.body[i].TRXNNO},
            {
                $set:
                {
                    FOLIO_NO: req.body[i].FOLIO_NO,
                    PRODCODE: req.body[i].PRODCODE,
                    SCHEME: req.body[i].SCHEME,
                    INV_NAME: req.body[i].INV_NAME,
                    TRADDATE: new Date(moment(req.body[i].TRADDATE).format("YYYY-MM-DD")),
                    UNITS: Number(req.body[i].UNITS),
                    AMOUNT: Number(req.body[i].AMOUNT),
                    TRXN_NATUR: req.body[i].TRXN_NATUR,
                    SCHEME_TYP: req.body[i].SCHEME_TYP,
                    PAN: req.body[i].PAN,
                    TRXN_TYPE_: req.body[i].TRXN_TYPE_,
                    AC_NO: req.body[i].AC_NO,
                    BANK_NAME: req.body[i].BANK_NAME,
                    TRXNNO: req.body[i].TRXNNO,
                    AMC_CODE: req.body[i].AMC_CODE,
                    TAX_STATUS: req.body[i].TAX_STATUS,
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                }
            })
    }
    console.dir("successfully");
})

app.post("/api/savetranskarvy", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        transk.updateMany(
            { UNQNO: req.body[i].UNQNO, NEWUNQNO: req.body[i].NEWUNQNO, TD_APPNO: req.body[i].TD_APPNO,TD_TRNO: req.body[i].TD_TRNO },
            {
                $set:
                {
                    TD_TRDT: new Date(moment(req.body[i].TD_TRDT).format("YYYY-MM-DD")),
                    TD_FUND: req.body[i].TD_FUND,
                    SCHEMEISIN: req.body[i].SCHEMEISIN,
                    TD_UNITS: Number(req.body[i].TD_UNITS),
                    ASSETTYPE: req.body[i].ASSETTYPE,
                    PAN1: req.body[i].PAN1,
                    TRDESC: req.body[i].TRDESC,
                    IHNO: req.body[i].IHNO,
                    TD_NAV: Number(req.body[i].TD_NAV),
                    TD_APPNO: req.body[i].TD_APPNO,
                    TD_AMT: Number(req.body[i].TD_AMT),
                    TD_POP: req.body[i].TD_POP,
                    INVNAME: req.body[i].INVNAME,
                    SMCODE: req.body[i].SMCODE,
                    TD_TRNO: req.body[i].TD_TRNO,
                    FUNDDESC: req.body[i].FUNDDESC,
                    TD_ACNO: req.body[i].TD_ACNO,
                    FMCODE: req.body[i].FMCODE,
                    UNQNO: req.body[i].UNQNO,
                    TD_TRTYPE: req.body[i].TD_TRTYPE,
                    NEWUNQNO: req.body[i].NEWUNQNO,
                    PAN2: req.body[i].PAN2,
                    STATUS: req.body[i].STATUS,
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                }
            })

    }
    console.dir("successfully");
})

app.post("/api/savetransfranklin", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        transf.updateMany(
            { FOLIO_NO: req.body[i].FOLIO_NO, TRXN_NO: req.body[i].TRXN_NO },
            {
                $set:
                {
                    COMP_CODE: req.body[i].COMP_CODE,
                    SCHEME_CO0: req.body[i].SCHEME_CO0,
                    SCHEME_NA1: req.body[i].SCHEME_NA1,
                    FOLIO_NO: req.body[i].FOLIO_NO,
                    TRXN_TYPE: req.body[i].TRXN_TYPE,
                    TRXN_NO: req.body[i].TRXN_NO,
                    INVESTOR_2: req.body[i].INVESTOR_2,
                    TRXN_DATE: new Date(moment(req.body[i].TRXN_DATE).format("YYYY-MM-DD")),
                    NAV: Number(req.body[i].NAV),
                    POP: req.body[i].POP,
                    UNITS: Number(req.body[i].UNITS),
                    AMOUNT: Number(req.body[i].AMOUNT),
                    ADDRESS1: req.body[i].ADDRESS1,
                    IT_PAN_NO1: req.body[i].IT_PAN_NO1,
                    ISIN: req.body[i].ISIN,
                    JOINT_NAM1: req.body[i].JOINT_NAM1,
                    JOINT_NAM2: req.body[i].JOINT_NAM2,
                    PLAN_TYPE: req.body[i].PLAN_TYPE,
                    NOMINEE1: req.body[i].NOMINEE1,
                    ACCOUNT_16: req.body[i].ACCOUNT_16,
                    PBANK_NAME: req.body[i].PBANK_NAME,
                    PERSONAL23: req.body[i].PERSONAL23,
                    TAX_STATUS: req.body[i].TAX_STATUS,
                    EMAIL: req.body[i].EMAIL,
                    IT_PAN_NO2: req.body[i].IT_PAN_NO2,
                    SOCIAL_S18: req.body[i].SOCIAL_S18,
                    HOLDING_19: req.body[i].HOLDING_19,
                    ACCOUNT_25: req.body[i].ACCOUNT_25,
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
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

app.post("/api/savecamsnav1", function (req, res) {
    var model = mongoose.model('cams_nav', navcams, 'cams_nav');
    try {
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
    } catch (err) {
        console.log(e)
    }
})

app.post("/api/savecamsnav", function (req, res) {
    for (i = 0; i < req.body.length; i++) {
        camsn.updateMany(
            { ISINDivPayoutISINGrowth: req.body[i].ISINDivPayoutISINGrowth, SchemeCode: req.body[i].SchemeCode },
            {
                $set:
                {
                    SchemeCode: req.body[i].SchemeCode,
                    ISINDivPayoutISINGrowth: req.body[i].ISINDivPayoutISINGrowth,
                    ISINDivReinvestment: req.body[i].ISINDivReinvestment,
                    SchemeName: req.body[i].SchemeName,
                    NetAssetValue: Number(req.body[i].NetAssetValue),
                    Date: new Date(moment(req.body[i].Date).format("YYYY-MM-DD")),
                }
            },
            {
                "upsert": true
            },
            function (err, object) {
                if (err) {
                    console.warn(err.message);  // returns error if no matching object found
                } else {

                }

            })
    }
    console.dir("successfully");
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


