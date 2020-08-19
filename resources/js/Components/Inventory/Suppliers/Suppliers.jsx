import React, {useEffect, useState} from 'react'
import {useStyles} from './../Items/Items.style'
import {CssBaseline,
Grid,
Paper,
TextField,
Button,
Table,
TableBody ,
TableCell ,
TableContainer ,
TableHead,
TableRow ,
Typography,
Dialog,
DialogTitle,
DialogContent,
Container,
DialogActions,
Tooltip,
IconButton,
Collapse,
DialogContentText,
FormControl
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import styles from './Supplier.module.css'
import {createSupplier, 
  fetchSupplier, 
  deleteSupplier, 
  updateSupplier
} from './../../../Api/suppliers'

function Suppliers({setTitle}) {
    const classes = useStyles();

    //UseEffect
    useEffect(()=>{
      setTitle('Suppliers')
      const fetchApi = async () => {
        const res = await fetchSupplier()
        setSuppliers(...suppliers, res)
      }
      fetchApi();
      console.log('rerendering')
    }, [])

    // States

    const [suppliers, setSuppliers] = useState([])

    const [form, setForm] = useState({
        Name:'',
        Address:'',
        PhoneNumber:'',
    })

    const [search, setSearch] = useState('')

    const [error, setError] = useState({
        Name:false,
        Address:false,
        PhoneNumber:false,
    })
    const [addBtn, setAddBtn] = useState(false)
  
    const [alert, setAlert] = useState('')
    
    const [alertVisible, setAlertVisible] = useState(false)

    const [manageSupplierModal, setManageSupplierModal] = useState(false);

    const [deleteBtn, setDeleteBtn] = useState(false)

    const [isEdit, setIsEdit] = useState(false)

    //End of State

    //Functions

    const handleChange = React.useMemo(()=>(e)=>{
      setForm({...form, [e.target.name]:e.target.value})
    })

    const addSupplier = async (e) =>{
      e.preventDefault();
      const {Name, Address, PhoneNumber, id} = form
      setAddBtn(true)
      const res = isEdit ? await updateSupplier(id, Name, Address, PhoneNumber) : await createSupplier(Name, Address, PhoneNumber);
      const {status, data:{errors}} = res
      setAddBtn(false)
      setError({
        Name:false,
        Address:false,
        PhoneNumber:false,
      })
      if(status===422){
        let errorsContainer = {
          Name:false,
          Address:false,
          PhoneNumber:false,
        }
        for(let x in errors){
          errorsContainer[x] = errors[x][0]
        }
        setError(errorsContainer)
      }else if(status === 201 || status === 200){
        setManageSupplierModal(false);
        setSuppliers(
          isEdit ? suppliers.map(supplier=>{
            if(supplier.id == res.data.id)
            return res.data
            return supplier
          })
          :[res.data, ...suppliers]
        )
        isEdit ? setAlert(showAlert('Supplier Successfully Edited !', 'success'))
        :setAlert(showAlert('Supplier Successfully Added !', 'success'));
        setAlertVisible(true)
        setTimeout(()=>setAlertVisible(false), 10000)
      }
    }

    const showAlert = (msg, severity) => {
      return (<Alert className="mb-2" severity={severity}>{msg}</Alert>)
    }

    const removeSupplier = async () =>{
      const res = await deleteSupplier(form.id)
      if(res.status==200){
        setSuppliers(suppliers.filter(supplier=>supplier.id!==form.id))
        setDeleteBtn(false)
        setAlert(showAlert('Supplier Successfully Deleted !', 'success'))
        setAlertVisible(true)
        setTimeout(()=>setAlertVisible(false), 10000)
      }
    }

    //End of function

    const deleteDialog = (
      <Dialog
          open={deleteBtn}
          onClose={()=>{setDeleteBtn(false); setForm({
            name:'',
            address:'',
            phoneNumber:'',
          })}}
          aria-labelledby="delete-dialog"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle className="text-danger" id="delete-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {form.Name} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={removeSupplier}  color="secondary">
              Yes
            </Button>
            <Button onClick={()=>setDeleteBtn(false)} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
    )

    const addDialog = (
      <Dialog
              open={manageSupplierModal}
              onClose={()=>{
                setManageSupplierModal(false)
                setError({
                  Name:false,
                  Address:false,
                  PhoneNumber:false,
                })
                if(isEdit){
                  setIsEdit(false)
                }
              }}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth
            >
              <form onSubmit={addSupplier} className={styles.supplierForm}>
              <DialogTitle id="scroll-dialog-title">Add Supplier</DialogTitle>
                
              <DialogContent>
              
                <Container>
                    <FormControl margin="normal" fullWidth>
                    <TextField required
                    name="Name" 
                    id="standard-required" 
                    defaultValue={isEdit ? form.Name : ''}
                    label="Name"
                    fullWidth
                    error={error.Name && true}
                    helperText={error.Name}
                    onChange={handleChange} 
                    />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                    <TextField
                      label="Address"
                      name="Address"
                      defaultValue={isEdit ? form.Address : ''}
                      required
                      multiline
                      error={error.Address && true}
                      helperText={error.Address}
                      rowsMax={2}
                      onChange={handleChange}
                      fullWidth
                    />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                     <TextField
                      required
                      name="PhoneNumber"
                      defaultValue={isEdit ? form.PhoneNumber : ''}
                      id="standard-number"
                      label="Phone Number"
                      placeholder="09XX-XXXX-XXX"
                      type="tel"
                      error={error.PhoneNumber && true}
                      helperText={error.PhoneNumber}
                      fullWidth
                      onChange={handleChange}
                    />
                    </FormControl>
                </Container>
              </DialogContent>
              <DialogActions>
                <Container>
                  {isEdit ? (
                    <Button
                    disabled={addBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={'bg-success float-right mb-2'}
                    endIcon={<SaveOutlinedIcon />}
                    size="large"
                    type="submit"
                    >
                      Save
                    </Button>
                  ):
                  (
                  <Button
                  disabled={addBtn}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={'bg-success float-right mb-2'}
                  endIcon={<AddIcon />}
                  size="large"
                  type="submit"
                  >
                    Add
                  </Button>
                  )}
                  
                </Container>
              </DialogActions>
              </form>
            </Dialog>
    )

    return (
        <div className={classes.container}>
            <CssBaseline />
            <div className="container-fluid">
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <form action="#" className="">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField 
                                    id="search" 
                                    name="search" 
                                    label="Search" 
                                    onChange={e=>setSearch(e.target.value)}
                                     fullWidth
                                     />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained"
                                        color='primary' className={'mt-2'} fullWidth> 
                                        <SearchIcon className={'text-white'} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid container spacing={2}
                      direction="row-reverse"
                      >
                        <Grid item xs={5}>
                          <Button
                          variant="contained"
                          color="primary"
                          className={'bg-success'}
                          endIcon={<AddIcon />}
                          size="large"
                          fullWidth
                          onClick={()=>setManageSupplierModal(true)}
                          >
                            <Typography variant="button" display="block" gutterBottom className='mt-1'>
                              Add Supplier
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
               <br className="mt-3"/>

               <Collapse in={alertVisible}>
                  {alert}
               </Collapse>

                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell component="th" scope="row">
                            {supplier.Name}
                          </TableCell>
                          <TableCell>{supplier.Address}</TableCell>
                          <TableCell align="right">{supplier.PhoneNumber}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete Item" aria-label="Delete Item">
                                <IconButton
                                  onClick={()=>{setDeleteBtn(true);setForm(supplier)}} className="text-danger" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Item" aria-label="Edit Item">
                                <IconButton onClick={()=>{setManageSupplierModal(true);
                                  setIsEdit(true);
                                  setForm(supplier)
                                }} className="text-success"  aria-label="Edit">
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          {addDialog}
          {deleteDialog}  
        </div>
    )
}

export default Suppliers
