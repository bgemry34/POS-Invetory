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
import {Alert,
  Pagination,
  PaginationItem} from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoryIcon from '@material-ui/icons/Category';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import {fetchItems, 
  fetchCategories, 
  addItem, 
  addCategory, 
  removeCategory, 
  removeItem,
  updateItem,
  deleteImage} from '../../../Api/items';
import {fetchSupplier} from './../../../Api/suppliers';
import {DropzoneArea} from 'material-ui-dropzone';
import { withRouter, useHistory, Link} from 'react-router-dom';
import {debounce} from 'lodash'

const Items = ({setTitle, location:{search}}) => {
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

    const [searchItem, setSearchItem] = useState('');

    const [form, setForm] = useState ({
      Name:'',
      Description:'',
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

    const [page, setPage] = useState({
      currentPage:1,
      lastPage:1
    });

    //use Ref
    const topRef = React.useRef();

    //Use effects
    useEffect(()=>{
      let isCancelled = false;
      setTitle('Items');
      const fetchApi = async () => {
          let rescategories = await fetchCategories();
          let ressuppliers = await fetchSupplier();
          if(!isCancelled)
          {
          setCategories(rescategories);
          setSuppliers(ressuppliers);}
      }
      try{
        fetchApi();
      }catch(e){
        console.log(e)
      }

      return ()=>isCancelled=true;
    },[]);

    useEffect(()=>{
      let isCancelled = false;
      const fetchApi = async () =>{
        let items = await fetchItems(search);
        if(!isCancelled){
          setItems(items.data);
          setPage(
          {
            currentPage:items.current_page,
            lastPage:items.last_page
          }
          );
        }
      }
      fetchApi();
      return ()=>isCancelled = true
    }, [searchItem, page.currentPage])

    

    //functions
    const handleChange =  (e) =>{
      setForm({...form, [e.target.name]:e.target.value});
    }

    const history = useHistory()

    const searchChange = debounce((text) =>{
      const params = new URLSearchParams(search);
      params.has('search') ? params.set('search', text) : params.append('search', text);
      params.has('page') && params.set('page', 1);
      history.push(`${location.pathname}?${params}`);
      setSearchItem(text)
      setItems([])
    }, 1500)

    const parameterChange = (search, param, value) =>{
      const url = new URLSearchParams(search);
      url.set(param, value);
      return url.toString();
    }
    
    const createItem = async (e) => {
      e.preventDefault();
      const {id, Name, Price, SellPrice, Category, Qty, Supplier, Images, Description} = form;  
      const res = isEdit ? await updateItem(id, 
        Name, 
        Price, 
        SellPrice, 
        Category, 
        Qty, 
        Images,
        Description
        ) : await addItem(Name, 
        Price, 
        SellPrice, 
        Category, 
        Qty, 
        Supplier,
        Images,
        Description);
        const {status, data:{errors}} = res
      if(status==422){
        console.log(form)
        topRef.current.scrollIntoView();
        let errorsContainer = {
          Name:false,
          Category:false,
          Price:false,
          SellPrice:false,
          Qty:false,
          Supplier:false,
          Description:false
        }
        for(let x in errors){
          errorsContainer[x] = errors[x][0]
        }
        setError(errorsContainer)
      }
      else if(status==201 || status==200){
        setError({
          Name:false,
          Category:false,
          Price:false,
          SellPrice:false,
          Qty:false,
          Supplier:false
        });
        setManageItemModal(false);
        setItems(
          isEdit ? items.map(item=>{
            if(item.id == res.data.id)
            return res.data;
            return item;
          })
          :[res.data[0], ...items]
        );
        console.log(res.data)
        isEdit ? setAlert(showAlert('Item Successfully Edited !', 'success'))
        :setAlert(showAlert('Item Successfully Added !', 'success'));
        setAlertVisible(true);
        setForm ({
              Name:'',
              Category:' ',
              Description:'',
              Price:'',
              SellPrice:'',
              Qty:'1',
              Supplier:' ',
              Images:[]
            });  
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

    const deleteItem = async(id)=>{
      const res = await removeItem(id);
      if(res.status==200)
      setItems(items.filter(item=>item.id!==id))
    }

    const destroyImage = async (image)=>{
      return isEdit && await deleteImage(image.name);
    }

    // Pagination 
    const pagination = (
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className="mt-5 mb-2"
      >
      <Grid item xs={6}>
          {items.length > 0 && (<Pagination
          page={page.currentPage}
          onChange={(e,v)=>{setPage({...page, currentPage:v}); setItems([])}}
          count={page.lastPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={'/Admin/Inventory/Items' + (item.page === 1 ? '' : (`?` + parameterChange(search, 'page', item.page)))}
              size='large' 
              {...item}
            />
          )}
      />)}
      </Grid>   
    </Grid>
    )

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
            setForm ({
              Name:'',
              Category:' ',
              Description:'',
              Price:'',
              SellPrice:'',
              Qty:'1',
              Supplier:' ',
              Images:[]
            });
            setIsEdit(false);
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
                  ref={topRef}
                  name="Name" 
                  id="standard-required" 
                  defaultValue={isEdit ? form.Name : ''}
                  label="Name"
                  error={error.Name && true}
                  helperText={error.Name}
                  onChange={handleChange}
                  fullWidth
                  />
                  <TextField required
                  name="Description"
                  multiline
                  rows={4}
                  id="standard-required" 
                  defaultValue={isEdit ? form.Description : ''}
                  label="Description"
                  error={error.Description && true}
                  helperText={error.Description}
                  onChange={handleChange}
                  fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <TextField
                  select
                  margin="normal"
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
                    {categories.length >0  && categories.map(category=>(
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
                {isEdit ? (<React.Fragment></React.Fragment>):(
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
                      {
                        suppliers.map(supplier=>(
                          <MenuItem key={supplier.id} value={supplier.id}>
                              {supplier.Name}
                          </MenuItem>
                        ))
                      }
                  </TextField>
                </FormControl>
                )}
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
                    initialFiles={isEdit && form.Images.length > 0 ? (form.Images.map(image=>{
                      return 'http://posinventory.test/storage/ItemImages/' + image.image;
                    })): []}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => {setForm({...form, Images:files})}}
                    filesLimit={5}
                    onDelete={(e)=>destroyImage(e)}
                    showAlerts={['error', 'info']}
                    maxFileSize={1999999}
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


    //render
    try{
      return  (
        <div className={classes.container}>
            <CssBaseline />
            <div className="container-fluid">
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <form action="#" className="">
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField id="search" name="search" 
                                    label="Search Item" 
                                    onChange={(e)=>searchChange(e.target.value)}
                                    fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
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
                        <Grid item xs={4}>
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
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Sell Price</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.length > 0 && items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.Name}
                          </TableCell>
                          <TableCell align="center">{item.category !== null ? item.category.Name : '---'}</TableCell>
                          <TableCell align="center">{item.Price}</TableCell>
                          <TableCell align="center">{item.SellPrice}</TableCell>
                          <TableCell align="center">{item.Qty}</TableCell>
                          <TableCell align="center">
                            {/* <Tooltip title="Delete Item" aria-label="Delete Item">
                              <IconButton className="text-primary" aria-label="delete">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip> */}
                            <Tooltip title="View Item" aria-label="Delete Item">
                              <IconButton onClick={e=>deleteItem(item.id)} className="text-danger" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Item" aria-label="Edit Item">
                              <IconButton 
                              onClick={()=>{
                                setManageItemModal(true);
                                setIsEdit(true);
                                setForm({
                                  id:item.id,
                                  Name:item.Name,
                                  Description:item.Description,
                                  Category:item.category==null ? ' ' : item.category.id,
                                  Price:item.Price,
                                  SellPrice:item.SellPrice,
                                  Qty:item.Qty,
                                  Images:item.images
                                });
                              }} 
                              className="text-success"  aria-label="Edit">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {items.length>0 && pagination}
            </div>
          {/* dailogs */}
          {categoryDialog}
          {addDialog}
        </div>
    )
    }catch(e){
      console.log(e)
      return (
        <h1>Something Went Wrong</h1>
      )
    }
}

export default withRouter(Items)