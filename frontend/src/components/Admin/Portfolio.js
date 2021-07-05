import React from "react";
import { dateFormat } from 'dateformat';
import { Component } from "react";
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';


//var createReactClass = require('create-react-class');

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.changeApplicant = this.changeApplicant.bind(this);
    this.getportfolio = this.getportfolio.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],
      data2: [],
      data3: [],
      data5: [],
      navdate: [],
      searchname: [],
    };
  }

  selectnameandcategory = (e) => {
    var inputValue = $(".searchname").val();
    var catValue = $("#category").val();
    if(inputValue === ""){
      alert("Please select applicant");
      $(".searchname").focus();
    }else{
    var name = inputValue.split('/')[0];
    var pan = inputValue.split('/')[1];
    var userdetail = "<b>" + name + "/" + "[" + pan + "]" + "</b>";
    $(".namepan").html(userdetail);
    var fullSchemeHtml = "";
    var sch = "";
    $.ajax({
      url: "/api/getportfolioscheme",
      type: "POST",
      data: { pan: pan, name: name ,category:catValue},
      success: function (res) {
        for (var i = 0; i < res.length; i++) {
     //   console.log("first response=",res[i].SCHEME,res[i].FOLIO)
          $.ajax({
            url: "/api/getschemeportfoliodetail",
            type: "POST",
            data: { scheme:res[i].SCHEME, pan:res[i].PAN, folio:res[i].FOLIO, name:res[i].NAME,RTA:res[i].RTA },
            success: function (res2) {
              
              res2.data = res2.data.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime());
              fullSchemeHtml += "<tr>"
              var unit = 0; var balance = 0; var amount = 0; var amt = 0; var cnav = 0; var currentval = 0; var gain = 0; var absreturn = 0; var days = 0; var date1 = ""; var date2 = ""; var totaldays = 0;
              var t = 0; var cagr = 0; var avgDays = 0; var rootval = 0; var nval = 0; var mathpo = 0;
              var arrunit = []; var arrnav = [];var amtt=0;var arrdays=[];var alldays=[];
              var arrpurchase = []; var j = 0;var temp333 =0;var temp222=0;
              var temp1, temp2 = 0; var temp3 = 0; var temp4 = 0; var temp33 = 0; var temp22 = 0; var totdays = 0;
              var isin = ""; var newnavdate = "";var daystotal=0;            
              for (var n = 0; n < res2.data.length; n++) {
                if(typeof res2.data[0] != "undefined"){
                if (res2.data[n].SCHEME === res2.data[0].SCHEME) {
                for (var jj = 0; jj < arrunit.length; jj++) {
                  if (arrunit[jj] === 0)
                    arrunit.shift();
                  if (arrpurchase[jj] === 0)
                    arrpurchase.shift();
                    if (arrdays[jj] === 0)
                    arrdays.shift();
                    if (alldays[jj] === 0)
                    alldays.shift();
                }
               
                if (res2.data[n].NATURE != 'Switch Out') {
                  unit = res2.data[n].UNITS
                  amount = res2.data[n].AMOUNT;
                  var date = res2.data[n].TD_TRDT;
                  var navdate = res2.data[n].navdate;

                  var d = new Date(date.split("-").reverse().join("-"));
                  var dd = d.getDate();
                  var mm = d.getMonth() + 1;
                  var yy = d.getFullYear();
                  var newdate = mm + "/" + dd + "/" + yy;


                  var navd = new Date(navdate);
                  var navdd = navd.getDate();
                  var navmm = navd.getMonth() + 1;
                  var navyy = navd.getFullYear();
                  var newnavdate = navmm + "/" + navdd + "/" + navyy;
                  date1 = new Date(newdate);
                  date2 = new Date(newnavdate);
                  days = moment(date2).diff(moment(date1), 'days');
                  //amtt = res2.data[n].AMT+amtt ;
                  arrunit.push(res2.data[n].UNITS);
                  arrpurchase.push(Math.round(res2.data[n].UNITS * parseFloat(res2.data[n].TD_NAV)));
                  arrdays.push(parseFloat(days)*res2.data[n].UNITS * parseFloat(res2.data[n].TD_NAV));
                  alldays.push(parseFloat(days));
                  temp1 = res2.data[n].UNITS;
                  temp2 = temp1 + temp2;
                  var navrate = res2.data[n].TD_NAV
                } else {
                  unit = "-" + res2.data[n].UNITS
                  amount = "-" + res2.data[n].AMOUNT
                      if (temp4 != "") {
                        arrunit.splice(0, 0, temp4);
                      }
                      temp2 = res2.data[n].UNITS;
                      for (var p = 0; p < arrunit.length; p++) {
                        temp3 = arrunit[p];
                        arrunit[p] = 0;
                        if (temp2 > temp3) {
                          arrpurchase[p] = 0;
                          arrdays[p]=0;
                          alldays[p]=0;
                          temp2 = parseFloat(temp2) - parseFloat(temp3);
                        } else {
                          temp4 = temp3 - temp2;
                          var len = res2.data.length -1;                  
                          if(res2.data[len].NATURE === "SIP" || res2.data[len].NATURE === "Purchase"){
                            arrpurchase[p] = temp4 * parseFloat(res2.data[p].TD_NAV);
                            arrdays[p] = parseFloat(alldays[p])*temp4 * parseFloat(res2.data[p].TD_NAV);
                          }else{
                            arrpurchase[p] = temp4 * parseFloat(navrate);
                            arrdays[p] = parseFloat(alldays[p])*temp4 * parseFloat(navrate);
                          }
                          break;
                        }
                      }
                  }
                  balance = parseFloat(unit) + parseFloat(balance);
                  cnav = res2.data[n].cnav
                  currentval = cnav * balance
                 
                  var scheme = res2.data[n].SCHEME;
                  var folio = res2.data[n].FOLIO;
                  var isin = res2.data[n].ISIN;
                }
              }
              }
              temp22 = 0;           
              for (var k = 0; k < arrpurchase.length; k++) {
                temp33 = Math.round(arrpurchase[k]);
                temp22 = temp33 + temp22;
                temp333 = Math.round(arrdays[k]);
                temp222 = temp333 + temp222;
             
              }

              gain = currentval - temp22;
              absreturn = ((parseFloat(currentval) - parseFloat(temp22)) / parseFloat(temp22)) * 100;
              nval = parseFloat(currentval) / parseFloat(temp22);
              t = parseFloat(temp222/temp22) / 365;
             
                  rootval = 1 / parseFloat(t);
                
              mathpo = Math.pow(parseFloat(nval), parseFloat(rootval));
            
              cagr = (parseFloat(mathpo) - 1) * 100;
             
              var baseurl = window.location.href
              var domain = baseurl.split('/');
              var scheme_name_data = scheme;
              var portfoliourl = "http://" + domain[domain.length - 2] + "/Portfoliodetail?scheme=" + scheme_name_data + "&pan=" + pan + "&folio=" + folio;
             if (balance > 0.01 && balance != 0 && balance != 0.000) {
                fullSchemeHtml += "<td><a href='" + portfoliourl + "' target='_blank'>" + scheme + "</a></td><td>" + folio + "</td><td>" + balance.toFixed(3) + "</td><td>" + temp22 + "</td><td>" + cnav + "</td><td>" + Math.round(currentval) + "</td><td>" + Math.round(gain) + "</td><td>" + Math.round(temp222/temp22) + "</td><td>" + absreturn.toFixed(2) + "</td><td>" + cagr.toFixed(2) + "</td></tr>";
                $(".randerData").html(fullSchemeHtml)
             }
            }.bind(this),
            error: function (jqXHR) {
              console.log(jqXHR);
            }
          })
        }


        this.setState({ data5: res });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }
    });
    }
  }
  
  

  getportfolio = (e) => {
    var baseurl = window.location.href
    var domain = baseurl.split('/');
    var portfoliourl = domain[domain.length - 2] + "/Portfoliodetail?scheme=" + e.SCHEME + "&pan=" + e.PAN;
    window.open(portfoliourl, "_blank") //to open new page
  }

  suggestionBox = (e) => {
    $(".inputdata").show();
    var inputValue = $(".searchname").val();
    $.ajax({
      url: "/api/getsearchname",
      type: "POST",
      data: { name: inputValue },
      success: function (res4) {
        this.setState({ searchname: res4 });

      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }
    });
  }

  changeApplicant = (e) => {
    var selectedvalue = e.target.innerText;
    $(".searchname").val(selectedvalue);
    $(".inputdata").hide();
  }

  componentDidMount() {
    document.title = "WMS | Portfolio Detail"
    $.ajax({
      url: "/api/getschemetype",
      type: "GET",
      success: function (res2) {
        this.setState({ data2: res2 });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }
    });
    $(".inputdata").hide();
  }
  render() {
    var balance = 0;
    var unit = 0;
    var currentNav = 0;
    return (
      <>
        <style jsx>
          {`
      .list-group-item{
        border:none!important;
      }
      .list-group-item:hover{
        border:none!important;
      }
      .hide-bal{
        display:none;
      }
      .search-data{
        list-style: none;
        padding: 10px;
        border: 1px solid #eee;
        height: auto;
        overflow-y: auto;
        background-color: white;
        position: absolute;
        max-width: 486px;
        max-height: 200px;
        min-width:333px;
        z-index: 9;
        width: auto;
      }
      .search-data li {
        list-style: none;
        padding: 6px 10px;
        border-bottom: 1px solid #eee;
        cursor:pointer;
        
      }
        .search-data li:hover{
          background-color:#eee;
        }

      `}
        </style>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Portfolio Report</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Portfolio Report</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">


                  <div className="card card-primary card-outline">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-md-4 offset-md-1">
                          <div className="form-group">
                            <label>Applicant :</label>

                            <input type="text" name="searchname" onKeyUp={this.suggestionBox} className="form-control searchname" autoComplete="off" />
                            <div className="inputdata">
                              <ul className="search-data">
                                {this.state.searchname.map((item, index) => (
                                  <li onClick={this.changeApplicant} >{item.INVNAME}/{item.PAN}</li>
                                ))}

                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 offset-md-1">
                          <div className="form-group">
                            <label>Category :</label>
                            <select className="form-control" id="category">
                              <option value="ALL">ALL</option>
                              <option value="EQUITY">EQUITY</option>
                              <option value="DEBT">DEBT</option>
                              {/* {this.state.data2.map((item, index) => (
                                <option value={item}>{item}</option>

                              ))} */}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2 offset-md-1">
                          <div className="form-group">
                            <div >
                              <button type="button" class="btn btn-primary mb-4" onClick={this.selectnameandcategory}>Show</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <table id="example2" class="table table-bordered table-hover table-responsive">
                        <thead>
                          <tr className="bg-primary">
                            <th>Scheme/Company</th>
                            <th>Folio</th>
                            <th>Balance Units</th>
                            <th>Purchase</th>
                            <th>Current NAV</th>
                            <th>Current Value</th>
                            {/* <th>Div. Paid</th> */}
                            <th>Gain/Loss</th>
                            <th>Days</th>
                            <th>Absolute Return%</th>
                            <th>CAGR(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="namepan"> </td>
                          </tr>
                        </tbody>
                        <tbody class="randerData">

                        </tbody>
                        {/* <tfoot>
                                    <tr className="bg-gray">
                                    <th>Total</th>
                                        <th></th>
                                        <th>{Math.round(this.state.data3.reduce((total, currentValue) => total = total + currentValue.AMOUNT,0))}</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>{Math.round(this.state.data3.reduce((total, currentValue) => total = total + currentValue.UNITS,0))}</th>
                                        <th>{Math.round(this.state.data3.reduce((total, currentValue) => total = total + (currentValue.UNITS * currentValue.cnav[0]),0))}</th>
                                        <th></th>
                                        <th>{Math.round(this.state.data3.reduce((total, currentValue) => total = total + ((currentValue.UNITS * currentValue.cnav[0])-(currentValue.AMOUNT)),0))}</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot> */}
                      </table>

                    </div>





                  </div>

                </div>
                {/*/.col (left) */}
              </div>
              {/* /.row */}
            </div>{/* /.container-fluid */}
          </section>
        </div>
      </>
    );
  }
};

export default Portfolio;

