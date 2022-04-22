import React, { useRef, useState,useEffect } from "react";
// useRef is provide refrence
// useState 
// Importing Ag-grid react
import { AgGridReact } from "ag-grid-react";
import axios from 'axios';
// import {getData} from './services/data' 

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";
import { Add } from "@mui/icons-material";
import { padding } from "@mui/system";

 



export default function Table() {
  
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [isAdd, setAdd ] = React.useState(false);
  const [isSearch,setSearch] =React.useState(false);
  const [data, setData] = useState([
    { business_code: "", cust_number: "", clear_date: "", buisness_year: "",posting_date:"",doc_id:"",document_create_date:"",document_create_date1:"",due_in_date:"",invoice_currency:"",document_type:"",posting_id:"",area_business:"",total_open_amount:"",baseline_create_date:"",cust_payment_terms:"",invoice_id:"",isOpen:"",aging_bucket:"",is_deleted:""},
  ]);
 // Dom file -The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents. It defines the
 // logical structure of documents and the way a document is accessed and manipulated.
  useEffect(() => {
    axios
      .get("http://localhost:8080/grey_goose1/DataLoading")
      .then((res) => {
     const arr=res.data.actors;
      arr.splice(0,1)
        console.log(arr);
        setRowData(arr);
      })
      .catch((e) => console.log(e));
  }, []);

  // HandelClickSearch 
   const handleClickSearch =()=>{
     setSearch(true);
   }

 // handelClickOpen
  const handleClickOpen = () => {
    setOpen(true);
    
  };
 //handelClose 
  const handleClose = () => {
    setOpen(false);
    setData([{  }]);
    setEdit(false);
    setAdd(false);
    setSearch(false);
  };

  const [selectedData, setSelectedData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  
// Coloum defs is   
  const columnDefs = [
    {
      field: "sl_no",
      headerName: "SL. NO",
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { 
      field: "business_code",
      headerName:"Business Code",
       sortable: true,
        filter: true ,
       
      },
    { field: "cust_number", sortable: true, filter: true },
    { field: "clear_date", sortable: true, filter: true },
    { field: "buisness_year", sortable: true, filter: true },
    { field: "document_create_date", sortable: true, filter: true },
    { field: "document_create_date1", sortable: true, filter: true },
    { field: "due_in_date", sortable: true, filter: true },
    { field: "invoice_currency", sortable: true, filter: true },
    { field: "document_type", sortable: true, filter: true },
    { field: "posting_id", sortable: true, filter: true },
    { field: "area_business", sortable: true, filter: true },
    { field: "total_open_amount", sortable: true, filter: true },
    { field: "baseline_create_date", sortable: true, filter: true },
    { field: "cust_payment_terms", sortable: true, filter: true },
    { field: "invoice_id", sortable: true, filter: true },
    { field: "isOpen", sortable: true, filter: true },
    { field: "aging_bucket", sortable: true, filter: true },
    { field: "is_deleted", sortable: true, filter: true },
  ];

// Ag grid is exposing th eplugins function from .api function 
  const onGridReady = (e) => {
    // e.api.sizeColumnsToFit();
    setGridApi(e.api);
  };
// Call back function triger getselected node  
  const onSelectionChanged = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedDatas = selectedNodes.map((node) => node.data);
    setSelectedData(selectedDatas);
    return selectedData;
  };

  const handleChange = (e, index) => {
    const parsedData = [...data];
    parsedData[index][e.target.name] = e.target.value;
    setData(parsedData);
  };
  const addItem = () => {
    const parsedData = [...data];
    parsedData.push({ business_code: "",
     cust_number: "",
      clear_date: "",
       buisness_year: "",
       doc_id:"",
       document_create_date:"",
       document_create_date1:"",
       due_in_date:"",
       invoice_currency:"",
       document_type:"",
       posting_date:"",
       posting_id:"",
       area_business:"",
       total_open_amount:"",
       baseline_create_date:"",
       cust_payment_terms:"",
       invoice_id:"",
       isOpen:"",
       aging_bucket:"",
       is_deleted:"",
  });
    setData(parsedData);
  };
// Fetch Data 
  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/grey_goose1/DataLoading")
      .then((res) => {
        console.log(res.data.data);
        setRowData(res.data.data);
      })
      .catch((e) => console.log(e));
  };
    
  const handleSave = async() => {
    await axios
    .post("http://localhost:8080/grey_goose1/addActor?business_code={}&cust_number={}&clear_date={}&buisness_year={}&doc_id={}&posting_date={}&document_create_date={}&due_in_date={}&invoice_currency={}&document_type={}&posting_id={}&total_open_amount={}&baseline_create_date={}&cust_payment_terms={}&invoice_id={}",data)
    .then((res) => {
      console.log(res.data);
      gridApi.applyTransaction({ add: [res.data] });
    
    })
    .catch((e) => console.log(e));
    console.log(data);
    // client side data entry
    // optimised api call - not to again call data for feeding data
    // gridApi.applyTransaction({ add: data });
    fetchData()
    handleClose();
    setEdit(false);
    setAdd(false);
    // need to make server api call for saving
  };
  const handleSaveUpdate = async() => {
    await axios
    .post("http://localhost:8080/grey_goose1/Edit?${sl_no}${invoice_currency}&{cust_payment_terms}")
    .then((res)=>{
      fetchData()
      console.log(res.data);
     // gridApi.applyTransaction({ add: [res.data] });
    })
    // client side data entry
    // optimised api call - not to again call data for feeding data
    // gridApi.applyTransaction({ update: data });

    handleClose();
    setEdit(false);
    // need to make server api call for saving
  };
  const beforeClose = () => {
    setEdit(false);
    handleClose();
    setData([{business_code: "", cust_number: "", clear_date: "", buisness_year: "",doc_id:"",document_create_date:"",document_create_date1:"",posting_date:"",due_in_date:"",invoice_currency:"",document_type:"",posting_id:"",area_business:"",total_open_amount:"",baseline_create_date:"",cust_payment_terms:"",invoice_id:"",isOpen:"",aging_bucket:"",is_deleted:""}]);
  };

  const handleUpdate = () => {
    setEdit(true);
    setAdd(false);
    setData(selectedData);
    handleClickOpen();
    setSearch(false);
  };
  const addMenu = (
    <Dialog open={open} onClose={beforeClose}>
      <DialogTitle>
        <div className="horizontal">
          {/* <div className="left">
            {isEdit ? "Update" : "Create"}</div> */}
          <div className="right">
            <IconButton onClick={addItem}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component={"div"}>
          <div style={{ marginTop: "10px" }}>
            {data.map(({ business_code , cust_number,clear_date,doc_id,buisness_year,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted}, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                style={{ marginBottom: "10px" ,
                // backgroundColor: 
              }}
              >
                {!isEdit && (<Grid item xs={4}>
                 <TextField 
                    id="outlined-basic"
                    label="Business Code"
                    variant="outlined"
                    value={business_code}
                    name="business_code"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid> )}
                {!isEdit && (<Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Customer Number"
                    variant="outlined"
                    value={cust_number}
                    name="cust_number"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid> )}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Clear date"
                    variant="outlined"
                    value={clear_date}
                    name="clear_date"
                    InputLabelProps={{ shrink: true }}
                    type="Date" 
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid> )}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Business year"
                    variant="outlined"
                    name="buisness_year"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid> )}
                 {!isEdit && (<Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Document ID"
                    variant="outlined"
                    value={doc_id}
                    name="doc_id"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Posting date"
                    variant="outlined"
                    value={posting_date}
                    name="posting_date"
                    InputLabelProps={{ shrink: true }}
                    type="Date"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Document create date"
                    variant="outlined"
                    value={document_create_date}
                    name="document_create_date"
                    InputLabelProps={{ shrink: true }}
                    type="Date"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Due in Date "
                    variant="outlined"
                    value={due_in_date}
                    name="due_in_date"
                    InputLabelProps={{ shrink: true }}
                    type="Date"
                   
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Document type"
                    variant="outlined"
                    value={document_type}
                    name="document_type"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Posting I'D"
                    variant="outlined"
                    value={posting_id }
                    name="posting_id "
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid> )}
                {!isEdit && (<Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Total open amount "
                    variant="outlined"
                    value={total_open_amount}
                    name="total_open_amount"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Baseline create date "
                    variant="outlined"
                    value={baseline_create_date}
                    name="baseline_create_date"
                    InputLabelProps={{ shrink: true }}
                    type="Date"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isEdit && ( <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Customer payment terms"
                    variant="outlined"
                    value={cust_payment_terms}
                    name="cust_payment_terms"
                    onChange={(e) => handleChange(e, index)}
                    />
                </Grid>)}
                {!isEdit && (<Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Invoice I'D"
                    variant="outlined"
                    value={invoice_id}
                    name="invoice_id"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isAdd &&  (<Grid item xs={5}>
                  <TextField
                    id="outlined-basic"
                    label="Invoice Currency "
                    variant="outlined"
                    value={invoice_currency}
                    name="invoice_currency"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
                {!isAdd && (<Grid item xs={5}>
                  <TextField
                    id="outlined-basic"
                    label="Customer Payment terms "
                    variant="outlined"
                    value={cust_payment_terms}
                    name="cust_payment_terms"
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>)}
              </Grid>
            ))}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        {isEdit? (
          <Button onClick={handleSaveUpdate}>update</Button>
        ) : (
          <Button onClick={handleSave}>ADD</Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedData([]);
    gridApi.deselectAll();
    setOpenDelete(false);
  };
  const beforeDelete = () => {
    gridApi.deselectAll();
    setSelectedData([]);
    handleCloseDelete();
  };
  const handleDelete = () => {
    gridApi.applyTransaction({ remove: selectedData });
    gridApi.deselectAll();
    handleCloseDelete();
  };
   const deleteMenu = (
    <Dialog
      open={openDelete}
      onClose={beforeDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete :{" "}
          {selectedData.map((node) => `${node.model}`).join(", ")}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
    
   // Adv Search
   const [openSearch, setOpenSearch] = React.useState(false);
   const handleSearch = () => {
     setOpenSearch(true);
   };
   const handleCloseSearch = () => {
     setSelectedData([]);
     gridApi.deselectAll();
     setOpenSearch(false);
   };
   const beforeSearch = () => {
     gridApi.deselectAll();
     setSelectedData([]);
     handleCloseSearch();
   };
  
  // Advance Serach
  const advanceSearch = (
    <Dialog
      open={handleSearch}
      onClose={beforeDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           But its should {selectedData.map((node) => `${node.model}`).join(", ")}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSearch}>cancel</Button>
        <Button onClick={handleSearch} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );




  const getRowId = (params) => params.data.sl_no;
  return (
    <div>
     
      <div
        className="ag-theme-alpine"
        style={{ height: "540px",
         width: "100%",
        // Height adjustment Down side 
        
      }}
      >
        {/* <button onClick={onButtonClick}>Get selected rows</button> */}
        <div className="hor uppercol">
          <Button className="" variant="outlined" fullWidth>
            Predict
          </Button>
          <Button className="btns" variant="outlined" fullWidth>
            Analytics View
          </Button>
          <Button className="btns" variant="outlined"
           onClick=  {()=>
            {handleClickSearch()
            setSearch(true);}}
          fullWidth>
            Advance Search

            
          </Button>
          
              <img src="../Assets/highradius-logo.png" alt="photo" sizes="3px" srcset="" />

          
          <TextField
            className="btns"
            id="outlined-basic"
            label="Search Customer"
            variant="outlined"
            size="small"
            autoFocus
            onChange={(e) => gridApi.setQuickFilter(e.target.value)}
            fullWidth
          />
          <Button
            className="btns"
            variant="outlined"
            onClick=  {()=>
              {handleClickOpen()
                setAdd(true);}}
            fullWidth
          >
            Add
          </Button>
          <Button
            className="btns"
            variant="outlined"
            onClick={handleUpdate}
            disabled={selectedData.length === 0}
            fullWidth
          >
            Edit
          </Button>
          <Button
            className="btns"
            variant="outlined"
            onClick={handleClickOpenDelete}
            disabled={selectedData.length === 0}
            fullWidth
          >
            Delete
          </Button>
        </div>
        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          pagination={true}
          onSelectionChanged={onSelectionChanged}
          animateRows={true}
        ></AgGridReact>
      </div>
      {addMenu}
      {deleteMenu}
      {/* {advanceSearch} */}
    </div>
  );
}
