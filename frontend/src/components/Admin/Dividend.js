import React, { Component } from 'react'
import $ from 'jquery';
import Moment from 'moment';
import Select from 'react-select';
import Loader from './loader';


class Dividend extends Component {
  
  constructor(props) {
    super(props);
    this.changeApplicant1 = this.changeApplicant1.bind(this);
    this.onChanger1 = this.onChanger1.bind(this);
    this.onChanger2 = this.onChanger2.bind(this);

    this.state = {
      data1:[],
      data2:[],
      data3:[],
      msg:"",
      msg3:"",
      rvalue:'',
      user:'',
      defaultValue:"",
      year:'',
      mon:'',
      options:'',
      selectedOption: null,
    };
  }
  onChanger1(e) {
    this.setState({
      rvalue: e.target.value    
    });
    var yer =  document.getElementById("finanyear").value
    var fromyear = yer.split('-')[0];
    var toyear = yer.split('-')[1];
    $(".loader").css("display", "block");
    $("#example1").css("display", "none");
    
    $.ajax({
       url: "http://localhost:3001/api/getdividendall",
       type: "POST",
       data:{fromyear:fromyear,toyear:toyear},
        success: function (res1) {
          this.setState({
            data1: res1.data,
            msg: res1.message});

            $(".loader").css("display", "none");
            $("#example1").css("display", "block");

       }.bind(this)
       
     });
 }
  onChanger2(e) {
    this.setState({
      rvalue: e.target.value    
    });
    if(e.target.value === "no"){
      $.ajax({
        url: "http://localhost:3001/api/getapplicant1",
        type: "GET",
         success: function (res2) {
          this.setState({ options: res2 });
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
    }
  }

  changeApplicant1 = (selectedOption) =>{ 
    this.setState({ selectedOption });
    // var index = e.target.selectedIndex;
     var optionElement = selectedOption.value
     var name =  optionElement.split('/')[0];
     var pan =  optionElement.split('/')[1];
     this.setState({
      pan:pan,
      name: name
    })
    var yer =  document.getElementById("finanyear").value
     var fromyear = yer.split('-')[0];
     var toyear = yer.split('-')[1];
     $.ajax({
      url: "http://localhost:3001/api/getdividenduserwise",
      type: "POST",
      data:{fromyear:fromyear,toyear:toyear,pan:pan,name:name},
       success: function (res3) {
        this.setState({
          data3: res3.data,
          msg3: res3.message});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
}
changeyear = (e) =>{
  var yer =  document.getElementById("finanyear").value
  var fromyear = yer.split('-')[0];
  var toyear = yer.split('-')[1]; 

  if(this.state.rvalue === "yes"){
    $(".loader").css("display", "block");
    $("#example1").css("display", "none");
    $.ajax({
      url: "http://localhost:3001/api/getdividendall",
      type: "POST",
      data:{fromyear:fromyear,toyear:toyear},
       success: function (res1) {
        this.setState({
           data1: res1.data,
           msg: res1.message});

           $(".loader").css("display", "none");
           $("#example1").css("display", "block");
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);         
      }
    });   
  }else{
    $.ajax({
      url: "http://localhost:3001/api/getdividenduserwise",
      type: "POST",
      data:{fromyear:fromyear,toyear:toyear,pan:this.state.pan,name:this.state.name},
       success: function (res3) {
        this.setState({
          data3: res3.data,
          msg3: res3.message});
      }.bind(this)
    });
  }
}
 
  componentDidMount(){
    
    document.title = "WMS | Folio Detail"
    var yer =  document.getElementById("finanyear").value
    var fromyear = yer.split('-')[0];
    var toyear = yer.split('-')[1];
    
    // $.ajax({
    //   url: "http://localhost:3001/api/getdividendall",
    //   type: "POST",
    //   data:{fromyear:fromyear,toyear:toyear},
    //    success: function (res1) {
    //     $(".loader").css("display", "none");
    //     this.setState({
    //       data1: res1.data,
    //       msg: res1.message});
          
    //   }.bind(this),
    //   error: function(jqXHR) {
    //     console.log(jqXHR);          
    //   }
    // });
    $.ajax({
      url: "http://localhost:3001/api/getapplicant1",
      type: "GET",
       success: function (res2) {
        this.setState({ options: res2 });
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
  //}
  }
  
  render() {      
    const { selectedOption,options } = this.state;
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
      .normal-table .table td, .normal-table .table th {
        padding: .30rem;
      }
      .table-fix-height{
        height:500px;
      }
      `}
        </style>
      <div className="content-wrapper">
       <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>My Dividends</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">My Dividends</li>
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
                <div className="col-md-12 offset-md-0">
                <div className="row">
                      <div className="col-md-4 offset-md-4 mt-3">
                        <div className="form-group">
                        <label>Select Financial Year</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                                <select className="form-control" onChange={this.changeyear}  id="finanyear" >
                                <option value="2020-2021">2020-2021</option>
                                <option value="2019-2020">2019-2020</option> 
                                <option value="2018-2019">2018-2019</option>
                                <option value="2017-2018">2017-2018</option>
                                <option value="2016-2017">2016-2017</option>
                              </select>    
                            </div>
                            {/* /.input group */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-12 form-group text-center check_btn">
                      <div className="form-group clearfix" style={{marginLeft:'-144px'}}>
                      <div className="icheck-primary d-inline mr-5">
                        <input type="radio" id="radioPrimary1" name="r1" defaultValue="yes" onClick={this.onChanger1} />
                        <label for="radioPrimary1">
                          All
                        </label>
                      </div>
                      <div className="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary2" name="r1" defaultValue="no" onClick={this.onChanger2}   />
                        <label for="radioPrimary2">
                        Clientwise
                        </label>
                      </div>
                    </div>
                        {/* <div className="form-check-inline">
                          <input type="radio" id="yes" name="kstatus" defaultValue="yes" onClick={this.onChangekstatus}  />
                          <label htmlFor="yes">ALL</label>&nbsp;   <br/>
                        </div> */}
                        {/* <div className="form-check-inline">
                          <input type="radio" id="no" name="kstatus" defaultValue="no" onClick={this.onChangekstatus}/>
                          <label htmlFor="no">Userwise</label>
                        </div>  */}
                      </div>
                    </div>

                    <Loader/>

                    { ( this.state.rvalue==='yes')? (
	  <div> 
			 
       { (this.state.msg==='Successfull')? (
                      <div className="card" id="example1">
                        <div className="card-header bg-primary">
                          <h3 className="card-title"></h3>
                          <div className="card-tools">
                            {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                              <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                              <div className="input-group-append">
                                <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                       
                       <table  className="table table-bordered table-striped">
                       <thead className="bg-primary">
                              <tr>
                                <th>S. No.</th>
                                <th>Date</th>
                                <th>Folio no</th>
                                <th>Scheme</th>
                                <th>Amount</th>
                                <th>Trxn Type</th>
                              </tr>
                            </thead>
                           
                            <tbody>
                            {this.state.data1.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td> 
                                    <td>{item.TRADDATE}</td>
                                    <td>{item.FOLIO_NO}</td>
                                    <td>{item.SCHEME}</td>
                                    <td>{item.AMOUNT}</td>
                                    <td>{item.TRXN_NATURE}</td>
                                    {/* {(item.TRXN_NATURE.match(new RegExp(`${"Gross Dividend"}`))) ? (
                                     <td>Dividend Payout</td> ) : (item.TRXN_NATURE.match(new RegExp(`${"Dividend Paid"}`))) ? (
                                      <td>Dividend Paid</td> ) : (item.TRXN_NATURE.match(new RegExp(`${"Dividend Re"}`))) ? (
                                        <td>Div. Reinvest</td> ) : (
                                        <td>Dividend</td> ) } */}
                                </tr>
                            
                            ))}
                                
                              </tbody>
                              
                          </table>
                          
                        </div>
                        {/* /.card-body */}
                      </div>
                        ):  (<div align="center"  className="col-sm-10">
                          <br/>
                        {/* <h6>Data Not Found</h6> */}
                      </div>)}
			 
	  </div>
	  
	   ): ( this.state.rvalue==='no')?(
          <div>
            <form role="form">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                         <div className="form-group">
                            <label>Applicant</label>
                            <Select
        value={selectedOption}
        onChange={this.changeApplicant1}
        options={options} 
      />

                            {/* <select className="form-control" onChange={this.changeApplicant} id="user"  >
                              <option>Select Applicant</option>
                              {this.state.data2.map((item, index) => (
                                     <option data-pan={item.PAN} data-name={item.INVNAME} value={item.PAN}>{item.INVNAME}/{item.PAN}</option>  
                                ))}
                             </select> */}
                          </div>
                        </div>
                        </div>
                        </div>
                        </form>
                        <div> 
			 
       { (this.state.msg3==='Successfull')? (
                      <div className="card">
                        <div className="card-header bg-primary">
                          <h3 className="card-title"></h3>
                          <div className="card-tools">
                            {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                              <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                              <div className="input-group-append">
                                <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body table-responsive p-0">
                       
                          <table className="table table-hover text-nowrap">
                          <thead>
                              <tr>
                                <th>S. No.</th>
                                <th>Date</th>
                                <th>Folio no</th>
                                <th>Scheme</th>
                                <th>Amount</th>
                                <th>Trxn Type</th>
                               </tr>
                            </thead>
                           
                            <tbody>
                            {this.state.data3.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td> 
                                    <td>{item.TRADDATE}</td>
                                    <td>{item.FOLIO_NO}</td>
                                    <td>{item.SCHEME}</td>
                                    <td>{item.AMOUNT}</td>
                                    <td>{item.TRXN_NATURE}</td>
                                    {/* {(item.TRXN_NATURE.match(new RegExp(`${"Gross Dividend"}`))) ? (
                                     <td>Dividend Payout</td> ) : (item.TRXN_NATURE.match(new RegExp(`${"Dividend Paid"}`))) ? (
                                      <td>Dividend Paid</td> ) : (item.TRXN_NATURE.match(new RegExp(`${"Div. Reinvestment"}`))) ? (
                                        <td>Div. Reinvest</td> ) : (
                                        <td>Dividend</td> ) } */}
                                </tr>
                            
                            ))}
                                
                              </tbody>
                              
                          </table>
                          
                        </div>
                        {/* /.card-body */}
                      </div>
                        ):  (<div align="center"  className="col-sm-10">
                          <br/>
                        <h6>Data Not Found</h6>
                      </div>)}
			 
	  </div>
             </div>
             
             ): (<div> <br /> </div>)}

                      {/* /.card */}
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
}
export default Dividend; ;
