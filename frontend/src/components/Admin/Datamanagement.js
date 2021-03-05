import React from "react";
import $ from "jquery";
import { Component } from "react";

//var createReactClass = require('create-react-class');

class Datamanagement extends Component { 
  
  render(){
      $(function() {
    
})
  return (   
    <>
    <div className="content-wrapper">
    <section className="content-header p-1">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h5 className="mb-0">Data Management</h5>
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
     <div class="col-md-4 offset-md-4">
				<nav>
					<div class="nav nav-pills nav-fill" id="nav-tab" role="tablist">
						<a class="nav-item nav-link active nav-primary" id="nav-contact-tab" data-toggle="tab" href="#nav-client" role="tab" aria-controls="nav-client" aria-selected="true">Search As in Client</a>

						<a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-folio" role="tab" aria-controls="nav-folio" aria-selected="false">Search As in Folio</a>
					</div>
				</nav>
				<div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-client" role="tabpanel" aria-labelledby="nav-client-tab">
					<div class="input-group">
                    <input type="text" class="form-control" placeholder="Search As in Client" aria-label="Search As in Client" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"> <span className="fas fa-search mr-2"></span>Search</button>
                    </div>
                    </div>
					</div>

                    <div class="tab-pane fade" id="nav-folio" role="tabpanel" aria-labelledby="nav-folio-tab">
					<div class="input-group ">
                    <input type="text" class="form-control" placeholder="Search As in Folio" aria-label="Search As in Folio" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"> <span className="fas fa-search mr-2"></span>Search</button>
                    </div>
                    </div>
					</div>
				</div>			
			</div>

    <table id="datamanage" className="table table-bordered table-striped">
             <thead>
            <tr>
                <th><input type="checkbox" name="select-all" id="select-all" /></th>
                <th>Sr. No.</th>
                <th>Folio</th>
                <th>Scheme Name</th>
                <th>Applicant Name</th>
                <th>Pan Number</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox" name="checkbox-1" id="checkbox-1" /></td>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>$320,800</td>
                <td>$320,800</td>
            </tr>
            <tr>
                <td><input type="checkbox" name="checkbox-2" id="checkbox-2" /></td>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>$170,750</td>
                <td>$170,750</td>
            </tr>

            <tr>
                <td><input type="checkbox" name="checkbox-3" id="checkbox-3" /></td>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>$170,750</td>
                <td>$170,750</td>
            </tr>
           </tbody>
           </table>
            </div>
            </div>
            </div>
   
    </>
  );
 }
};

export default Datamanagement;
