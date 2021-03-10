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
          data4: [],
          data5: [],
        };
      }

      getportfolio = (e) =>{
     var baseurl = window.location.href
        var domain = baseurl.split('/');

    var portfoliourl = domain[domain.length - 2]+"/Portfoliodetail?scheme="+e.SCHEME+"&pan="+e.PAN;
    window.open(portfoliourl, "_blank") //to open new page
         
 }
      
      changeApplicant = (e) =>{
        var sel = e.target.value;
        $.ajax({
            url: "/api/getpan",
            type: "GET",
            data:{pan: e.target.value},
             success: function (res4) {
              this.setState({ data4: res4 });
            }.bind(this),
            error: function(jqXHR) {
              console.log(jqXHR);         
            }
          });     

        var fullSchemeHtml = "";
        
        var sch="";
        $.ajax({
          url: "/api/getportfolioscheme",
          type: "POST",
          data:{pan: e.target.value},
           success: function (res) {
            //console.log(res)
             for(var i = 0; i< res.length;i++){
              // $("#scheme").html(res[i].SCHEME);
              
              var sch_name = res[i].SCHEME;
             // fullSchemeHtml += "<tr><td>djsdgshjghjsg</td></tr>";
              $.ajax({
                url: "/api/getschemeportfoliodetail",
                type: "POST",
                data:{scheme:res[i].SCHEME,pan:res[i].PAN},
                 success: function (res2) {
                  fullSchemeHtml += "<tr>"
                  var unit = 0;var balance=0;var amount = 0;var amt =0;var cnav=0;var currentval=0;var gain=0; var absreturn=0;var days = 0; var date1 = ""; var date2 = ""; var totaldays = 0;
                  var t =0;var cagr=0;var avgDays=0;var rootval=0;var nval=0;var mathpo=0;
                  for(var j = 0; j<res2.data.length; j++){

                    if(res2.data[j].NATURE == 'RED' || res2.data[j].NATURE == 'LTOP'){
                      unit = "-"+res2.data[j].UNITS
                      amount = "-"+res2.data[j].AMOUNT
                    }else{
                      unit = res2.data[j].UNITS
                      amount = res2.data[j].AMOUNT
                    }
                    if(res2.data[j].SCHEME == res2.data[0].SCHEME){                     
                      balance = parseFloat(unit)+parseFloat(balance)                      
                      amt = parseFloat(amount)+parseFloat(amt)
                      cnav = res2.data[j].cnav[0]
                      currentval = cnav*balance
                      gain= currentval-amt
                      absreturn = ((parseFloat(currentval)-parseFloat(amt))/parseFloat(amt))*100

                      var date= res2.data[j].TD_TRDT;
                      var d=new Date(date.split("-").reverse().join("-"));
                      var dd=d.getDate();
                      var mm=d.getMonth()+1;
                      var yy=d.getFullYear();
                      var newdate=mm+"/"+dd+"/"+yy;
                      
                      date1 = new Date(newdate);    
                      date2 = new Date();  
                      days = moment(date2).diff(moment(date1), 'days');
                      totaldays = parseFloat(days) + parseFloat(totaldays);
                      avgDays = Math.round(parseFloat(totaldays)/parseFloat(res2.data.length));
                      t = parseFloat(avgDays)/365;
                      rootval= 1/parseFloat(t);
                      nval = parseFloat(currentval)/parseFloat(amt)
                      mathpo = Math.pow(parseFloat(nval) , parseFloat(rootval) )
                      cagr = ( parseFloat(mathpo)-1)* 100;
                    }
                    
                  }
                 
                   var baseurl = window.location.href
                   var domain = baseurl.split('/');
                  
                     
                  var scheme_name_data = res2.data[0].SCHEME;
                  scheme_name_data = scheme_name_data.replace(/\s+/g, '%20');
                    var portfoliourl = "http://"+domain[domain.length - 2]+"/Portfoliodetail?scheme="+scheme_name_data+"&pan="+res2.data[0].PAN;
                    fullSchemeHtml += "<td><a href='"+portfoliourl+"' target='_blank'>"+res2.data[0].SCHEME+"</a></td><td>"+res2.data[0].FOLIO+"</td><td>"+balance.toFixed(3)+"</td><td>"+Math.round(amt)+"</td><td>"+cnav+"</td><td>"+Math.round(currentval)+"</td><td></td><td>"+gain.toFixed(4)+"</td><td>"+Math.round(avgDays)+"</td><td>"+absreturn.toFixed(4)+"</td><td>"+cagr.toFixed(4)+"</td></tr>";
                  $(".randerData").html(fullSchemeHtml)
                  
                 }.bind(this),
                 error: function(jqXHR) {
                  console.log(jqXHR);         
                }
                })
              
             }


            this.setState({ data5: res });
          }.bind(this),
          error: function(jqXHR) {
            console.log(jqXHR);         
          }

          
          
        });  

    }

  componentDidMount(){
    document.title = "WMS | Folio Detail"
    $.ajax({
        url: "/api/getapplicant",
        type: "GET",
         success: function (res1) {
          this.setState({ data1: res1 });
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
      $.ajax({
        url: "/api/getschemetype",
        type: "GET",
         success: function (res2) {
          this.setState({ data2: res2 });
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
  }
  render(){
   var balance = 0;
   var unit = 0;
   var currentNav= 0;
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
                                        <select className="form-control" id="applicant" onChange={this.changeApplicant}>
                                            <option value>Select Applicant</option>
                                {this.state.data1.map((item, index) => (
                                    <option value={item.PAN}>{item.INVNAME}/{item.PAN}</option>
                                  
                                ))}
                                </select>
                                    </div>
                                </div>
                                <div className="col-md-4 offset-md-1">
                                    <div className="form-group">
                                        <label>Category :</label>
                                        <select className="form-control">
                                            <option value="">All</option>
                                            {this.state.data2.map((item, index) => (
                                    <option value={item}>{item}</option>
                                  
                                ))}
                                        </select>
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
                                        <th>Div. Paid</th>
                                        <th>Gain/Loss</th>
                                        <th>Days</th>
                                        <th>Absolute Return%</th>
                                        <th>CAGR(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td>{this.state.data4.map((item, index) => (
                                                <b>{item.INV_NAME} [Pan: {item.PAN}]</b>
                                                ))}
                                                </td>
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

