import React,{ Component } from "react";
import $ from 'jquery';
import axios from 'axios';
import {  MDBDataTableV5 } from 'mdbreact';

class Transactiondetail extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data1: [],
      personaldetail: [],
      schemedetail:[],
      checkedBoxes: [],
      scheme:"",
      pan:"",
      folio:"",
      };
      this.deleteProducts = this.deleteProducts.bind(this);
      this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }
 
  componentDidMount(){

    document.title = "WMS | Transaction Detail"
    const query = new URLSearchParams(this.props.location.search);  
    const pan = query.get('pan');
    const folio = query.get('folio');
    const isin = query.get('isin');
    

   const lastItem = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const scheme= lastItem.replace(/%20/g, " ");
    this.setState({
      pan:pan,
      folio:folio,
      scheme:scheme
    })
    axios.post('/api/gettransschemedetail',{pan:pan,folio:folio,scheme:scheme})
            .then(response => {
                 this.setState({schemedetail: response.data.data, isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    axios.post('/api/getschemepersonaldetail',{pan:pan,folio:folio,scheme:scheme})
            .then(resp => {
                this.setState({personaldetail: resp.data, isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
   
    
  }
  deleteProducts = () => {
		if(window.confirm('Are you sure, want to delete the selected product?')) {

        $.ajax({
          url: "/api/Removedata",
          type: "POST",
          data:{id: this.state.checkedBoxes},
          success: function (response) {
            window.location.reload();
            if(response.status === 200) {
              			document.getElementById('msg').innerHTML = '<span style="color:green;">Products deleted successfully</span>';
                  }
          	}  
          }); 
        }
      }
  toggleCheckbox = (e, item) => {		
		if(e.target.checked) {
			let arr = this.state.checkedBoxes;
			arr.push(item._id);
			this.setState = { checkedBoxes: arr};
		} else {			
			let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item._id), 1);
			this.setState = {
				checkedBoxes: items
			}
		}		
	}

  render(){
   //const { schemedetail } = this.state ;
   var balance = 0;
   var unit = 0;
   var currentNav= 0;
	  const schemedetail = this.state.schemedetail.map(item => {
    if(item.NATURE ==='RED' || item.NATURE ==='FUL' || item.NATURE ==='LTOP' || item.NATURE ==='LTOF' ||item.NATURE ==='STPO'){
   unit = "-"+item.UNITS;
    }else{
      unit = item.UNITS;
    }
      
           balance = parseFloat(unit)+parseFloat(balance);
    return {
      CHECK:<input type="checkbox"  className="selectsingle" value={item._id} checked={this.state.checkedBoxes.find((p) => p.id === item._id)} onChange={(e) => this.toggleCheckbox(e, item)}/>,
      DATE: item.TD_TRDT,
      NATURE: item.NATURE,
      AMOUNT: item.AMOUNT,
      NAV: item.TD_NAV,
      Units: unit,
      Balance: balance.toFixed(4),
      RTA:item.RTA,
    }
  })
   const data = {
    columns: [
      {
        label: 'CHECK',
        field: 'CHECK',
        width: 50
      },
      {
        label: 'DATE',
        field: 'DATE',
        width: 100
      }, 
      {
        label: 'TRXN TYPE',
        field: 'NATURE',
        width: 100
      }, 
      {
        label: 'AMOUNT',
        field: 'AMOUNT',
        width: 100
      },
      {
        label: 'NAV',
        field: 'NAV',
        width: 100
      },
      {
        label: 'UNITS',
        field: 'Units',
        width: 100
      },
      {
        label: 'BALANCE',
        field: 'Balance',
        width: 100
      },
      {
        label: 'RTA',
        field: 'RTA',
        width: 100
      },    
    ],
    rows: schemedetail
    
  };

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
                <h1>Transaction Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Transaction Details</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
          <div className="card card-primary card-outline pl-5 pr-5 normal-table">
             <table className="table">
             {this.state.personaldetail.map((item, index) => ( 
               <tbody>
               <tr>
                 <th>Name</th>
                 <td>{item.INVNAME}</td>
                 <th></th>
                 <td></td>
                 <th>Folio Number</th>
                 <td>{item.FOLIO}</td>
                </tr>

                <tr>
                <th>Scheme Name</th>
                 <td>{item.SCHEME}</td>
                 <th></th>
                 <td></td>
                 <th></th>
                 <td></td>
                </tr>
                </tbody>
            ) ) }
             </table>
             </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
             <form class="form-inline">
                    <div class="form-group mb-2 mx-3">
                        <label for="trans_type" class="sr-only">Password</label>
                        <input type="text" class="form-control" id="trans_type" placeholder="Transaction Type" />
                    </div>
                    <div class="form-group mb-2 mx-3">
                        <label for="trans_type" class="sr-only">From</label>
                        <input type="date" class="form-control" id="trans_type" placeholder=" " />
                    </div>
                    <div class="form-group mb-2 mx-3">
                        <label for="trans_type" class="sr-only">To</label>
                        <input type="date" class="form-control" id="trans_type" placeholder="" />
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Show</button>
                </form>
                </div>
                </div>

          <div className="card card-primary card-outline mt-3">
        <div className="card-header">
        <div id="msg"></div>
        <button type="button"  class="btn btn-primary mb-4" id="delbtn" onClick={this.deleteProducts} >Delete</button>
          {/* <h3 className="card-title">DataTable with default features </h3> */}
        </div>
       
        <div className="card-body">
         
        <MDBDataTableV5  hover
      entriesOptions={[50, 70, 100]}
      entries={50}
      pagesAmount={4}
      refresh
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
        </section>
      </div>
    </>
  );
 }
};

export default Transactiondetail;

