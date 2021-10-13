import React,{ Component } from "react";
import $ from "jquery";
import {  MDBDataTableV5 } from 'mdbreact';
import Loader from './loader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Trans_Report extends Component {
  
    constructor(props) {
        super(props);
         this.selectdata = this.selectdata.bind(this);
         this.checkAll = this.checkAll.bind(this);
         this.toggleCheckbox = this.toggleCheckbox.bind(this);
         this.selectRow = this.selectRow.bind(this);
         this.updateData = this.updateData.bind(this);
        
        this.state = {
          searchdata: [],
          amclist:[],
          checkedBoxes: [],
          searchuserid: [],
          searchid: [],
        }
      }
     
    selectdata = (e)=> {
      var inputValue = $(".searchname").val();
      if(inputValue === ""){
        alert("please enter name");
        $(".searchname").focus();
      }else{
      var fromdate = $("#from").val();
       var todate = $("#to").val();
       
        $(".loader").css("display", "block");
        $("#datasection").css("display", "none");
          $.ajax({
            url: "/api/searchclient",
            type: "POST",
            data: { name: inputValue,fromdate:fromdate,todate:todate},
            success: function (res) {
              this.setState({ searchdata: res.data});      
                $(".loader").css("display", "none");
                $("#datasection").css("display", "block");
            }.bind(this),
            error: function (jqXHR) {
              console.log(jqXHR);
            }
          });
      }
    }
      checkAll() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var selectchecked = document.getElementById('check');       
      if (selectchecked.checked === true) {
        for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                this.setState = {  
                }
                this.state.checkedBoxes.push(checkboxes[i].value);
             } 
      }else{
        for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        }
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
    
    selectRow = (e)=> {		
        var ids = $(':checkbox:checked').map(function() {
          return this.id;
        }).get();
        var idval = $(':checkbox:checked').map(function() {
          return this.name;
        }).get();
          var inc = 0;
          if(idval.length === 1){
            alert("Please merge min two data.");
          }
         for(var i=0;i< idval.length; i++){
          if(idval[0] != idval[i]){
            inc = inc+i;
          }
          else{
            inc= -1;
          }
         }
         if(inc > 0){
          confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure want to merge two different pan.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  $.ajax({
                    url: "/api/getselecteddata",
                    type: "POST",
                    data: { id: ids },
                    success: function (res1) {
                      var foliodetail = "<option value=''>Select Data.</option>";
                      {res1.map((item, index) => (
                        foliodetail += "<option value='"+item.PAN+"/"+item.INVNAME+"/"+item.GUARDPAN+"/"+item.ADD1+"/"+item.ADD2+"/"+item.ADD3+"'>"+item.INVNAME+"  "+item.PAN+"  "+item.ADD1+"  "+item.ADD2+"  "+item.ADD3+"</pre></option>"   
                      ))}
                      console.log("foliodetail",foliodetail);
                      $("#resdata").html(foliodetail);
                    }.bind(this)
                  });
                }
              },
              {
                label: 'No',
                onClick: () =>{ return false;}
              }
            ]
          });
        
          return false;
        }
        if(inc < 0){
          $.ajax({
                url: "/api/getselecteddata",
                type: "POST",
                data: { id: ids },
                success: function (res1) {
                  var foliodetail = "<option value=''>Select Data.</option>";
                  {res1.map((item, index) => (
                    foliodetail += "<option value='"+item.PAN+"/"+item.INVNAME+"/"+item.GUARDPAN+"/"+item.ADD1+"/"+item.ADD2+"/"+item.ADD3+"'>"+item.INVNAME+"  "+item.PAN+"  "+item.ADD1+"  "+item.ADD2+"  "+item.ADD3+"</pre></option>"   
                  ))}
                  console.log("foliodetail",foliodetail);
                  $("#resdata").html(foliodetail);
                }.bind(this)
              });
        }
       
    }
    
    updateData = ()=> {		
      var selectedValue = $("#resdata").val();
      if(selectedValue === ""){
        alert("please select which data you want to update")
      }else{
      var ids = $(':checkbox:checked').map(function() {
        return this.value;
      }).get();
      var pan = selectedValue.split('/')[0];
      var name = selectedValue.split('/')[1];
     // var gpan = selectedValue.split('/')[2];
      var add1 = selectedValue.split('/')[3];
      var add2 = selectedValue.split('/')[4];
      var add3 = selectedValue.split('/')[5];
      $.ajax({
        url: "/api/updatepersonaldetail",
        type: "POST",
        data: { updatepan:pan,updatename:name,updateadd1:add1,updateadd2:add2,updateadd3:add3,id:ids},
        success: function (res1) { 
          window.location.reload();
        }.bind(this)       
      });
    }
  }

    componentDidMount() {
        document.title = "WMS | Mapping Detail"
        $.ajax({
          url: "/api/searchamc",
          type: "POST",
         success: function (res) {
            this.setState({ amclist: res.amc});
    
          }.bind(this),
          error: function (jqXHR) {
            console.log(jqXHR);
          }
        });
       
      }
  render() {
   var today = new Date();
   const values = {
      fromdate: "2019-01-01",
      todate : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      
}

    const data = {
        columns: [
          {
            label: <input type="checkbox" onClick={this.checkAll} id="check" class="chk" />,
            field: 'CHECK',
            width: 50
          },
          {
            label: 'APPLICANT',
            field: 'INVNAME',
            width: 50
          },
          {
            label: 'ADDRESS',
            field: 'ADD1',
            width: 100
          },
          {
            label: 'CREATEDATE',
            field: 'NAVDATE',
            width: 50
          },          
          {
            label: 'PAN',
            field: 'PAN',
            width: 50
          },
         
        ],
        rows:this.state.searchdata.map(item => {      
          return{
            CHECK:<input type="checkbox" id={item._id} name={item.PAN} value={item.PAN+"/"+item.INVNAME+"/"+item.GPAN+"/"+item.ADD1+"/"+item.ADD2+"/"+item.ADD3} checked={this.state.checkedBoxes.find((p) => p.id === item._id)} onChange={(e) => this.toggleCheckbox(e, item)}/>,
            INVNAME: <input type="text" value={item.INVNAME} class="removeFromInput" style={{width:"auto"}} disabled />,
            ADD1:item.ADD1+item.ADD2+item.ADD3,
            NAVDATE:item.NAVDATE,          
            PAN:item.PAN,  
           }
        })        
      };
    return (
      <>
        <style jsx>
          {`
             .search-data{
                list-style: none;
                padding: 10px;
                border: 0px solid #eee;
                height: auto;
                overflow-y: auto;
                background-color: white;
                position: absolute;
                max-width: 486px;
                min-width: 280px;
                max-height: 200px;
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
                .removeFromInput{
                  border: none;
                  background: transparent;

                }
        
         `}
        </style>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Client Mapping</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Client Mapping</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
        <section className="content">
            <div className="container-fluid">
                <div className="card card-primary card-outline">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label>Applicant :</label>
                                <input type="text" name="searchname" className="form-control searchname" />
                               
                                {/* <input type="text" name="searchname" onKeyUp={this.suggestionBox} className="form-control searchname" autoComplete="off" /> */}
                            {/* <div className="inputdata">
                              <ul className="search-data">
                                {this.state.searchname.map((item, index) => (
                                  <li onClick={this.changeApplicant} >{item.INVNAME}</li>
                                ))}

                              </ul>
                            </div>    */}
                            {/* <div >
                            
                              <input type="text" name="clientname" className="form-control clientname" />
                              
                            </div>                    */}
                            </div>
                        </div>
                        {/* <div className="col-lg-3">
                            <div className="form-group">
                                <label>Fund :</label>
                                <select className="form-control searchfund" onChange={this.selectfund} >
                                <option value="">Select Fund</option>
                                {this.state.amclist.map((item, index) => (
                                  <option value={item.AMCCODE}>{item.amcname}</option>
                                ))}
                                </select>                    
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label>Scheme :</label>
                                <select id="searchscheme" className="form-control searchscheme" >
                                <option value="">Select Scheme</option>
                                {this.state.searchscheme.map((item, index) => (
                                  <option value={item}>{item}</option>
                                ))}
                                </select>                    
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                            <label>Folio :</label>
                            <input type="text" id="folio" className="form-control" />               
                            </div>
                        </div> */}
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label>From :</label>
                              <input type="date" className="form-control" id="from"  defaultValue={values.fromdate}/>                    
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label>To :</label>
                                <input type="date" className="form-control"  id="to" defaultValue={values.todate}/>                    
                            </div>
                        </div>
                        
                        {/* <div className="col-lg-3">
                            <div className="form-group">
                                <label>RTA :</label>
                                <select className="form-control">
                                  <option value="">Select RTA</option>
                                  <option value="CAMS">CAMS</option>
                                  <option value="KARVY">KARVY</option>
                                </select>                   
                            </div>
                        </div> */}
                        <div className="col-lg-3">
                            <div className="form-group mt-1">
                               <a href="#" className="btn btn-primary shadow-sm mt-4 w-100" onClick={this.selectdata}>Show</a>     
                               
            
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <Loader/>
                <div id="datasection">
                <div  className="card">
                    <div className="card-body">
                    <div class="datatable">  

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

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <select className="form-control" id="resdata">
                                     </select>   
                                                 
                                </div>
                                <div><a href="javascript:void(0)" className="btn btn-success" onClick={this.updateData.bind(this)}>Update</a>   </div>
                                
                            </div>
                            <div className="col-6 text-right">
                                <div className="form-group d-inline">
                                    <a href="javascript:void(0)" className="btn btn-success ml-3" id="buttonClass" onClick={this.selectRow}>Merge</a>  
                                    <a href="#" className="btn btn-success ml-3">Save</a>                
                                    <a href="#" className="btn btn-danger ml-3">Delete Marked</a>                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </section>
</div>
      </>
    );
  }
};

export default Trans_Report;

