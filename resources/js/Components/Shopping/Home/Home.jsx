import React from 'react'
import { Container, 
    Typography, 
    TextField, 
    Grid, 
    Card, 
    CardMedia, 
    CardActionArea, 
    CardContent, 
    CardActions, 
    Button  } from '@material-ui/core'



const Home = () => {
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
                        justify="space-between"
                        alignItems="flex-start"
                        >
                            <Grid item md={3} alignItems="center">
                                <Card style={{ maxWidth: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            style={{height: '400px',
                                            backgroundSize: 'contain'}}
                                            image="https://kbimages1-a.akamaihd.net/f98d4bdd-9aee-463a-bee3-983205a7d99a/1200/1200/False/re-zero-starting-life-in-another-world-vol-1-light-novel-2.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                Re:ZERO -Starting Life in Another World-, Vol. 1
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Subaru Natsuki was just trying to get to the convenience store but wound up summoned to another world. He encounters the usual things--life-threatening situations, silver haired beauties, cat fairies--you know, normal stuff. All that would be bad enough, but he's also gained the most inconvenient magical ability of all--time travel,
                                            but he's got to die to use it. How do you repay someone who saved your life when all you can do is die?
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{display:'block'}} >
                                        <Typography style={{float:'left'}} gutterBottom variant="h5" component="h5">
                                            $ 9.99
                                        </Typography>
                                        <Button style={{float:'right'}} size="small" color="primary">
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card style={{ maxWidth: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            style={{height: '400px',
                                            backgroundSize: 'contain'}}
                                            image="https://kbimages1-a.akamaihd.net/f98d4bdd-9aee-463a-bee3-983205a7d99a/1200/1200/False/re-zero-starting-life-in-another-world-vol-1-light-novel-2.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                Re:ZERO -Starting Life in Another World-, Vol. 1
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Subaru Natsuki was just trying to get to the convenience store but wound up summoned to another world. He encounters the usual things--life-threatening situations, silver haired beauties, cat fairies--you know, normal stuff. All that would be bad enough, but he's also gained the most inconvenient magical ability of all--time travel,
                                            but he's got to die to use it. How do you repay someone who saved your life when all you can do is die?
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{display:'block'}} >
                                        <Typography style={{float:'left'}} gutterBottom variant="h5" component="h5">
                                            $ 9.99
                                        </Typography>
                                        <Button style={{float:'right'}} size="small" color="primary">
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card style={{ maxWidth: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            style={{height: '400px',
                                            backgroundSize: 'contain'}}
                                            image="https://kbimages1-a.akamaihd.net/f98d4bdd-9aee-463a-bee3-983205a7d99a/1200/1200/False/re-zero-starting-life-in-another-world-vol-1-light-novel-2.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                Re:ZERO -Starting Life in Another World-, Vol. 1
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Subaru Natsuki was just trying to get to the convenience store but wound up summoned to another world. He encounters the usual things--life-threatening situations, silver haired beauties, cat fairies--you know, normal stuff. All that would be bad enough, but he's also gained the most inconvenient magical ability of all--time travel,
                                            but he's got to die to use it. How do you repay someone who saved your life when all you can do is die?
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{display:'block'}} >
                                        <Typography style={{float:'left'}} gutterBottom variant="h5" component="h5">
                                            $ 9.99
                                        </Typography>
                                        <Button style={{float:'right'}} size="small" color="primary">
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={3}>
                                <Card style={{ maxWidth: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            style={{height: '400px',
                                            backgroundSize: 'contain'}}
                                            image="https://kbimages1-a.akamaihd.net/f98d4bdd-9aee-463a-bee3-983205a7d99a/1200/1200/False/re-zero-starting-life-in-another-world-vol-1-light-novel-2.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                Re:ZERO -Starting Life in Another World-, Vol. 1
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Subaru Natsuki was just trying to get to the convenience store but wound up summoned to another world. He encounters the usual things--life-threatening situations, silver haired beauties, cat fairies--you know, normal stuff. All that would be bad enough, but he's also gained the most inconvenient magical ability of all--time travel,
                                            but he's got to die to use it. How do you repay someone who saved your life when all you can do is die?
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{display:'block'}} >
                                        <Typography style={{float:'left'}} gutterBottom variant="h5" component="h5">
                                            $ 9.99
                                        </Typography>
                                        <Button style={{float:'right'}} size="small" color="primary">
                                            Add to Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Home
