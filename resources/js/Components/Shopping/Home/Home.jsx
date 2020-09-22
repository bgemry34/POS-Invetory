import React, {useContext, useEffect, useState} from 'react'
import { Container, 
    Typography, 
    TextField, 
    Grid, 
    Card, 
    CardMedia, 
    CardActionArea, 
    CardContent, 
    CardActions, 
    Button,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {fetchItems} from './../../../Api/items'
import {addCart} from './../../../Api/cart'
import { checkUser } from '../../../Api/users';
import { UserContext } from '../Context/UserContext';



const Home = () => {
    
    //state
    const [items, setItems] = useState([]);
    const {setOpenLogin} = useContext(UserContext);
    useEffect(()=>{
        let isCancell = false;
        const fetchApi = async () => {
            const items = await fetchItems()
            if(!isCancell)
            setItems(items.data)
        }
        fetchApi();
        return ()=>isCancell=true;
    },[])
    
    const truncate = (str, no_words) => {
        let newWord = str.split(" ");
        let count = str.split(" ").length;
        let output = newWord.splice(0,no_words).join(" ") + (count > no_words ? '...' : '.')
        return output;
    }

    const _addCart = async (item_id)  =>{
        const _user = JSON.parse(sessionStorage.getItem('user'));
        if(_user==null){
            setOpenLogin(true)
            return 0;
        }
        const __user__ = await checkUser(_user.access_token);
        if(__user__.status !== 200)
        setOpenLogin(true)
        else if (__user__.status == 200){
            const res = await addCart(_user.access_token, item_id);
        }
    }

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            id="outlined-required"
                            label="Search Item"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3} direction="row"
                        alignItems="stretch"
                        >
                        {items.length > 0 && items.map(item=>(
                            <Grid item lg={3} md={4} xs={12}  key={item.id}>
                                <Card style={{ maxWidth: '100%', height: 600}}>
                                    <CardActions style={{position:'relative', top:550}} >
                                        <Grid container>
                                        <Grid item xs={6} md={6}>
                                        <Typography style={{float:'left', marginBottom:20, color:'#7f8c8d', textAlign:'center'}} gutterBottom variant="h5" component="h5">
                                            {'$ '+ item.SellPrice}
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>  
                                            <Button
                                            variant="contained"
                                            className={'bg-success float-right text-white'}
                                            endIcon={<ShoppingCartIcon  className={'text-white'}/>}
                                            onClick={e=>_addCart(item.id)}
                                            fullWidth
                                            >
                                                Add
                                            </Button>  
                                        </Grid>
                                        </Grid> 
                                    </CardActions>
                                    <CardActionArea style={{position:'relative', bottom:70}}>
                                        <CardMedia
                                            style={{height: item.Name.split(' ').length<10 ? '400px' : '360px',
                                            backgroundSize: 'contain'}}
                                            image={'http://posinventory.test/storage/ItemImages/'+item.images[0].image}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" style={{textTransform: 'capitalize'}}>
                                                {item.Name}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary" component="p">
                                            {truncate(item.Description, 10)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Home
