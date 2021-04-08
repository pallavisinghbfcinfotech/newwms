import React from "react";
import $ from "jquery";
import { Component } from "react"; 
import {  MDBDataTableV5 } from 'mdbreact';
import { Link } from 'react-router-dom';


class Datamanagement extends Component { 
  constructor(props) {
    super(props);
  
    this.state = {
      data1:[],
      searchdata:[],
     };
  }
  
  serachdata = (e) =>{
    var searchtype = e.target.id;
    var searchvalue = $("input[name='"+searchtype+"']").val();
    $.ajax({
      url: "/api/getsearchdatamanagement",
      type: "POST",
      data:{searchvalue: searchvalue,searchtype: searchtype},
      success: function (res4) {
        this.setState({ searchdata: res4 });
       }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);         
      }
    });    
  }

  componentDidMount(){
    document.title = "WMS | Datamanagement"

  }

  render(){
    const { searchdata } = this.state ;
    // var baseurl = window.location.href
    // var domain = baseurl.split('/');
    // // var url = "http://"+domain[domain.length - 2]+"/Transaction-detail"
    var schemeurl = "Transaction-detail";
    var foliourl = "Datafolio-detail";
    const data = {
    columns: [
      {
        label: 'CHECK',
        field: 'CHECK',
        width: 50
      },
      {
        label: 'FOLIO',
        field: 'FOLIO',
        width: 150
      },
      {
        label: 'SCHEME',
        field: 'SCHEME',
        width: 370
      },
      {
        label: 'APPLICANT',
        field: 'INVNAME',
        width: 200
      },
      {
        label: 'PAN',
        field: 'PAN',
        width: 150
      },
      {
        label: 'AUM',
        field: 'AMOUNT',
        width: 50
      },
      
      {
        label: 'VALUATION DATE',
        field: 'DATE',
        width: 120
      }          
    ],
    rows: searchdata.map(item => {
      return {
        CHECK:<input type="checkbox" value={item.FOLIO} />,
        FOLIO: <a href={foliourl+"?folio="+item.FOLIO+"&rta="+item.RTA} target='_blank'>{item.FOLIO}</a>,
        SCHEME: <a href={schemeurl+"?pan="+item.PAN+"&folio="+item.FOLIO+"&scheme="+item.SCHEME} target='_blank'>{item.SCHEME}</a>,
        // SCHEME: <Link to={"Transaction-detail?scheme="+item.SCHEME+"&pan="+item.PAN+"&folio="+item.FOLIO} > {item.SCHEME} </Link>,
        INVNAME: item.INVNAME,
        PAN: item.PAN,
        AMOUNT: item.AMOUNT,
        DATE: item.DATE,
      }
    })
    
  };
 return (   
    <>
    <div className="content-wrapper">
    <section className="content-header p-1">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3 className="mb-0">Data Management</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="admin">Home</a></li>
                  <li className="breadcrumb-item active">Data Management</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
     <div className="card">             
     <div className="card-body">   
     <div class="col-md-5 offset-md-3">
				<nav>
					<div class="nav nav-pills nav-fill" id="nav-tab" role="tablist">
						<a class="nav-item nav-link active nav-primary" id="nav-contact-tab" data-toggle="tab" href="#nav-client" role="tab" aria-controls="nav-client" aria-selected="true">Search Name</a>

						<a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-folio" role="tab" aria-controls="nav-folio" aria-selected="false">Search Folio</a>

            <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-pan" role="tab" aria-controls="nav-pan" aria-selected="false">Search Pan</a>
					</div>
				</nav>
				<div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-client" role="tabpanel" aria-labelledby="nav-client-tab">
					<div class="input-group">
                    <input type="text" class="form-control searchName" name="searchName"  placeholder="Search Name" aria-label="Search Name" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    <button id="searchName" onClick={this.serachdata} class="btn btn-outline-secondary" type="button"> <span className="fas fa-search mr-2"></span>Search</button>
                    </div>
                    </div>
					</div>

                    <div class="tab-pane fade" id="nav-folio" role="tabpanel" aria-labelledby="nav-folio-tab">
					<div class="input-group ">
                    <input type="text" class="form-control searchFolio" name="searchFolio" placeholder="Search Folio" aria-label="Search Folio" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    <button id="searchFolio" onClick={this.serachdata}  class="btn btn-outline-secondary" type="button"> <span className="fas fa-search mr-2"></span>Search</button>
                    </div>
                    </div>
					</div>

          <div class="tab-pane fade" id="nav-pan" role="tabpanel" aria-labelledby="nav-pan-tab">
					<div class="input-group ">
                    <input type="text" class="form-control searchPan" name="searchPan"  placeholder="Search Pan" aria-label="Search Pan" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    <button id="searchPan" onClick={this.serachdata}  class="btn btn-outline-secondary" type="button"> <span className="fas fa-search mr-2"></span>Search</button>
                    </div>
                    </div>
					</div>
				</div>			
			</div>
           <div>  

              {/* <MDBDataTable
              entriesOptions={[100, 300, 400, 600]}
              entries={100}
               pagesAmount={4}
              scrollY
              maxHeight="400px"
              striped
              bordered
              small
              responsive
              hover
              data={data}    
              sortRows={[]}
                  /> */}
             <MDBDataTableV5  hover
      entriesOptions={[100, 300, 500]}
      entries={100}
      pagesAmount={4}
      scrollY
      maxHeight="400px"
      striped
      bordered
      small
      responsive
      hover
      data={data}
      pagingTop
      searchTop
      searchBottom={false}/>
          </div>      
            </div>
            </div>
            </div>
   
    </>
  );
 }
};

export default Datamanagement;
