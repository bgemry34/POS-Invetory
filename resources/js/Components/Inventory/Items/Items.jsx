import React, {useEffect, useState} from 'react';
import {useStyles} from './Items.style';
import {CssBaseline,
Grid,
Paper,
TextField,
MenuItem,
Button,
Table,
TableBody ,
TableCell ,
TableContainer ,
TableHead ,
TableRow ,
IconButton,
Tooltip,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Container,
FormControl,
InputLabel,
Input,
InputAdornment,
Collapse,
Typography
} from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoryIcon from '@material-ui/icons/Category';
import {fetchItems, fetchCategories, addItem, addCategory, removeCategory} from '../../../Api/items';
import {fetchSupplier} from './../../../Api/suppliers';
import {DropzoneArea} from 'material-ui-dropzone';

function Items({setTitle}) {
    const classes = useStyles();

    // STATES
    const [items, setItems] = useState([]);
    
    const [categories, setCategories] = useState([]);

    const [suppliers, setSuppliers] = useState([]);

    const [openCategoryModal, setCategoryModal] = useState(false);
    
    const [isEdit, setIsEdit] = useState(false);

    const [manageItemModal,setManageItemModal] = useState(false);

    const [alert, setAlert] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);

    const [btn, setBtn] = useState({
      addItem:false,
      editItem:false,
      addCategory:false
    });

    const [search, setSearch] = useState({ 
      toSearch :'',
      searchType: 'Name'
    });

    const [form, setForm] = useState ({
      Name:'',
      Category:' ',
      Price:'',
      SellPrice:'',
      Qty:'1',
      Supplier:' ',
      Images:[]
    });

    const [error, setError] = useState({
      Name:false,
      Category:false,
      Price:false,
      SellPrice:false,
      Qty:false,
      Supplier:false
    });


    //Use effects
    useEffect(()=>{
      setTitle('Items');
      const fetchApi = async () => {
        let resitems = await fetchItems();
        let rescategories = await fetchCategories();
        let ressuppliers = await fetchSupplier();
        setItems(resitems);
        setCategories(rescategories);
        setSuppliers(ressuppliers);
      }
      fetchApi();
    },[]);
    

    //functions
    const handleChange =  (e) =>{
      setForm({...form, [e.target.name]:e.target.value});
    }
    
    const createItem = async (e) => {
      e.preventDefault();
      const {Name, Price, SellPrice, Category, Qty, Supplier, Images} = form  
      const res = await addItem(Name, 
        Price, 
        SellPrice, 
        Category, 
        Qty, 
        Supplier,
        Images);
        const {status, data:{errors}} = res
      if(status==422){
        let errorsContainer = {
          Name:false,
          Category:false,
          Price:false,
          SellPrice:false,
          Qty:false,
          Supplier:false
        }
        for(let x in errors){
          errorsContainer[x] = errors[x][0]
        }
        setError(errorsContainer)
      }
      else if(status==201){
        setManageItemModal(false);
        setItems(
          isEdit ? suppliers.map(supplier=>{
            if(supplier.id == res.data.id)
            return res.data
            return supplier
          })
          :[res.data, ...items]
        );
        isEdit ? setAlert(showAlert('Item Successfully Edited !', 'success'))
        :setAlert(showAlert('Item Successfully Added !', 'success'));
        setAlertVisible(true);
        setTimeout(()=>setAlertVisible(false), 10000);
      }
    }

    const showAlert = (msg, severity) => {
      return (<Alert className="mb-2" severity={severity}>{msg}</Alert>)
    }

    const createCategory = async (e) => {
      e.preventDefault();
      const res = await addCategory(form.Category);
      const {status, data:{errors}} = res
      setError({...error, Category:false});
      if(status==201){
        setForm({...form, Category:' '})
        setCategories([res.data,...categories]);
      }else if(status==422){
        setError({...error, Category: errors['Name'][0]})
      }
    }

    const deleteCategory = async(id)=>{
      const res = await removeCategory(id);
      if(res.status==200)
      setCategories(categories.filter(category=>category.id!==id))
    }

    //Dialogs
    const addDialog = (
        <Dialog
          open={manageItemModal}
          onClose={()=>{
            setManageItemModal(false);
            setError({
              Name:false,
              Category:false,
              Price:false,
              SellPrice:false,
              Qty:false,
              Supplier:false
            });
          }}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
        >
          <form onSubmit={createItem} method="post">
          <DialogTitle className="mt-2">Add Item</DialogTitle>
          <DialogContent>
            <Container>
                <FormControl margin="normal" fullWidth>
                  <TextField required
                  name="Name" 
                  id="standard-required" 
                  defaultValue={isEdit ? form.Name : ''}
                  label="Name"
                  error={error.Name && true}
                  helperText={error.Name}
                  onChange={handleChange}
                  fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <TextField
                  select
                  label="Category"
                  name="Category"
                  value={form.Category}
                  onChange={handleChange}
                  error={error.Category && true}
                  helperText={error.Category}
                  fullWidth
                  >
                    <MenuItem value={' '}>
                          {'--Select Category--'}
                    </MenuItem>
                    {categories.map(category=>(
                      <MenuItem key={category.id} value={category.id}>
                          {category.Name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                  <Input
                    required
                    value={form.Price}
                    name="Price"
                    error={error.Price && true}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">	&#8369;</InputAdornment>}
                  />
                </FormControl >
                <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">Sell Price</InputLabel>
                <Input
                  required
                  name="SellPrice"
                  value={form.SellPrice}
                  error={error.SellPrice && true}
                  onChange={handleChange}
                  startAdornment={<InputAdornment position="start">	&#8369;</InputAdornment>}
                />
                </FormControl >
                <FormControl margin="normal" fullWidth>
                  <TextField
                  select
                  label="Supplier"
                  name="Supplier"
                  value={form.Supplier}
                  error={error.Supplier && true}
                  helperText={error.Supplier}
                  onChange={handleChange}
                  fullWidth
                  >
                      <MenuItem value={' '}>
                            {'--Select Supplier--'}
                      </MenuItem>
                      {suppliers.map(supplier=>(
                        <MenuItem key={supplier.id} value={supplier.id}>
                            {supplier.Name}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    required
                    name="Qty"
                    defaultValue={isEdit ? form.Qty : '1'}
                    label="Qty"
                    type="number"
                    error={error.Qty && true}
                    helperText={error.Qty}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <Typography variant="body2" component="h2">
                    Images:
                  </Typography>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => {console.log('Files:', files); setForm({...form, Images:files})}}
                    filesLimit={5}
                    showAlerts={['error', 'info']}
                    previewGridClasses={{container: {spacing:3}}}
                  />
                </FormControl>
            </Container>
          </DialogContent>
          <DialogActions>
            <Container>
              {isEdit ? (
                <Button
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

    const categoryDialog = (
      <Dialog
        open={openCategoryModal}
        onClose={()=>{
          setCategoryModal(false);
          setForm({...form, Category:' '})
          setError({...error, Category:false})
        }}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Manage Categories</DialogTitle>
          <DialogContent dividers>
            <form onSubmit={createCategory} method="post">
              <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField  
                        name="Category"
                        value={form.Category}
                        label="Category Name:"
                        error={error.Category && true}  
                        helperText={error.Category ? error.Category :''}
                        onChange={e=>setForm({...form, Category:e.target.value})}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          className={'mt-2 bg-success'}
                          endIcon={<AddIcon />}
                          size="large"
                          fullWidth
                        >
                          Add
                        </Button>
                    </Grid>
              </Grid>
              </form>
              <br/>
              <TableContainer>
                  <Table className={classes.table} aria-label="Item-Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(categories.length > 0) &&
                      categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell component="th" scope="row">
                            {category.Name}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete Item" aria-label="Delete Item">
                              <IconButton 
                              className="text-danger" 
                              aria-label="delete"
                              onClick={()=>deleteCategory(category.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
          </DialogContent>
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
                                <Grid item xs={8}>
                                    <TextField id="search" name="search" 
                                    label="Search" 
                                    onChange={(e)=>setSearch({...search,toSearch:e.target.value})} 
                                    fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                    select
                                    label="Type"
                                    name="searchType"
                                    value={search.searchType}
                                    onChange={(e)=>setSearch({...search,searchType:e.target.value})}
                                    fullWidth
                                    >
                                        <MenuItem value="Name">
                                            Name
                                        </MenuItem>
                                        <MenuItem value="Category">
                                            Category
                                        </MenuItem>
                                        <MenuItem value="Supplier Name">
                                            Supplier Name
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={5}>
                          <Button
                          variant="contained"
                          className={'mt-2 bg-secondary text-white'}
                          endIcon={<CategoryIcon />}
                          size="large"
                          fullWidth
                          onClick={()=>setCategoryModal(true)}
                        >
                          Manage Category
                        </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                          variant="contained"
                          onClick={()=>setManageItemModal(true)}
                          color="primary"
                          className={'mt-2 bg-success'}
                          endIcon={<AddIcon />}
                          size="large"
                          fullWidth
                          >
                          Add Item
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
                  <Table className={classes.table} aria-label="Item-Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Selling Price</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.Name}
                          </TableCell>
                          <TableCell align="right">{'---'}</TableCell>
                          <TableCell align="right">{item.Price}</TableCell>
                          <TableCell align="right">{item.SellPrice}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete Item" aria-label="Delete Item">
                              <IconButton className="text-danger" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Item" aria-label="Edit Item">
                              <IconButton className="text-success"  aria-label="Edit">
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
          {/* dailogs */}
          {categoryDialog}
          {addDialog}
        </div>
    )
}

export default Items