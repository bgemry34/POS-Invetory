import React, {useEffect, useState} from 'react'
import AddIcon from '@material-ui/icons/Add';
import { withRouter, useHistory, Link} from 'react-router-dom';
import {debounce} from 'lodash';
 
import {Grid,
Button,
MenuItem,
TextField,
Table,
TableBody ,
TableCell ,
TableContainer ,
TableHead ,
TableRow ,
Typography,
Tooltip,
Paper,
IconButton,
Dialog,
DialogContent,
DialogTitle,
LinearProgress,
} from '@material-ui/core';
import {
Pagination,
PaginationItem
} from '@material-ui/lab'
import styles from './Stocks.module.css';
import {fetchItems, addStock} from '../../../Api/items';
import {fetchSupplier} from '../../../Api/suppliers';

const Stocks = ({setTitle, location:{search}}) => {

    const [items, setItems] = useState([]);

    const [suppliers, setSuppliers] = useState([]);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        ItemName:'',
        Item:'',
        Supplier:' ',
        Qty:'1'
    })

    const [error, setError] = useState({
      Supplier: false,
      Qty:false
    });

    const [page, setPage] = useState({
      currentPage:1,
      lastPage:1
    });

    const [loading, setLoading] = useState(true);

    const [searchItem, setSearchItem] = useState('')
    
    useEffect(()=>{
      setTitle('Stocks');
      let isCancelled = false;
      console.log(search)
        const fetchApi = async () =>{
            const items = await fetchItems(search);
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
        return () => {
          isCancelled = true;
        };
    },[page.currentPage, searchItem]);

    useEffect(()=>{
      let isCancelled = false;
      const getSupplier = async () =>{
        const suppliers = await fetchSupplier();
        !isCancelled && setSuppliers(suppliers)
      }

      getSupplier();
      return () => {
        isCancelled = true;
      };
    }, [])

    const stockStatus = (Qty) =>{
        if(Qty > 10)
        return (
            <TableCell className="text-success"  align="right">In Stock</TableCell>
        )
        else if(Qty<10)
        return (
            <TableCell style={{color:'#e67e22'}} align="right">Critical</TableCell>
        )
        else if(Qty == 0)
        return (
            <TableCell className="text-danger"  align="right">Out of Stock</TableCell>
        )
    }

    const createStock = async  (e) => {
      e.preventDefault();
      const {Item, Supplier, Qty} = form
        const res = await addStock(Item, Supplier, Qty);
        const {data:{errors}, status} = res;
        if(status==200){
          setItems(items.map(item=>{
            if(item.id == res.data.id)
            return res.data
            return item
          }))
          setOpen(false)
        }else if(status==422){
          let errorContainer = {
            Supplier: false,
            Qty:false
          }
          for(let x in errors){
            errorContainer[x] = errors[x][0];
          }
          setError(errorContainer);
        }
    }

    const history = useHistory()

    const handleChange = debounce((text) =>{
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

    const AddStockModal =  ( 
        <Dialog
        open={open}
        onClose={()=>{
            setOpen(false);
            setForm({
              ItemName:'',
              Item:'',
              Supplier:' ',
              Qty:'1'
          })
          setError({
            Supplier: false,
            Qty:false
          });
      
        }}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        >
        <DialogTitle id="scroll-dialog-title">Add Stocks</DialogTitle>
          <DialogContent dividers>
            <div className="container">
                <form onSubmit={createStock} method="post">
                    <TextField
                    id="standard-read-only-input"
                    required
                    label="Item Name"
                    defaultValue={form.ItemName == '' ? '' : form.ItemName}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin={'normal'} 
                    fullWidth
                    />
                    <TextField
                    id="standard-select-native"
                    required
                    select
                  label="Supplier"
                    value={form.Supplier}
                    error={error.Supplier && true}
                    onChange={(e)=>setForm({...form, Supplier:e.target.value})}
                    SelectProps={{
                        native: true,
                    }}
                    margin={'normal'}
                    helperText="Please select your supplier"
                    fullWidth
                    >

                    <option value={' '}>
                        --Select Supplier--
                    </option>
                    
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                          {supplier.Name}
                      </option>
                    ))}
                    </TextField>
                    <TextField
                    label="Qty"
                    error={error.Qty && true}
                    helperText={error.Qty ? error.Qty : ''}
                    value={form.Qty}
                    margin={'normal'}
                    onChange={(e)=>setForm({...form, Qty:e.target.value})}
                    fullWidth
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={'bg-success float-right mb-2 mt-2'}
                    size="large"
                    type="submit"
                    fullWidth
                    >
                      Submit
                    </Button>
                </form>
            </div>
          </DialogContent>
      </Dialog>
    )

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
              to={'/Admin/Inventory/Stocks' + (item.page === 1 ? '' : (`?` + parameterChange(search, 'page', item.page)))}
              size='large' 
              {...item}
            />
          )}
      />)}
      </Grid>   
    </Grid>
    )

    return (
        <div className={styles.content}>
            <div className="container-fluid">
            <Grid container spacing={3} className="mb-4">
                    <Grid item xs={6}>
                        <form action="#" className="">
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField id="search" name="search" 
                                    label="Search Item"
                                    onChange={e=>handleChange(e.target.value)}
                                    fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                  <Table aria-label="Item-Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Sell Price</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Status</TableCell>
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
                          {stockStatus(item.Qty)}
                          <TableCell align="center">
                            <Tooltip title="Add Stock" aria-label="Add Stock">
                              <IconButton onClick={
                                ()=>{
                                  setOpen(true);
                                  setForm({...form, Item:item.id, ItemName:item.Name})
                                }
                              } className="text-success"  aria-label="Edit">
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {items.length > 0 && pagination} 
            </div>
            {AddStockModal}
        </div>
        
    )
}

export default withRouter(Stocks)
