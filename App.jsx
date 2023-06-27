import React, {useEffect, useState} from 'react'
import Pagination from "./Pagination"
import axios from "axios"
import {
    Typography,
    AppBar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Toolbar,
    Container,
    ButtonGroup, Button, makeStyles
} from '@material-ui/core'
import { CatchingPokemon } from '@mui/icons-material';

import useStyles from './styles'


const App = () => {
    const classes = useStyles()
    const [pokemon, setPokemon] = useState([])
    const [sprites, setSprites] = useState([])
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [loading, setLoading] = useState(true)
    const [cards, setCards] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])



    useEffect(() => {
        setLoading(true)
        let cancel

        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
            .then(res => {
                setLoading(false)
                setNextPageUrl(res.data.next)
                setPrevPageUrl(res.data.previous)
                setPokemon(res.data.results.map(p => p.name))
                const spritePromises = res.data.results.map(p => axios.get(p.url))
                Promise.all(spritePromises)
                    .then(responses => {
                        const spriteArray = responses.map(response => {
                            const { sprites } = response.data
                            const frontSprite = sprites.front_default
                            return frontSprite
                        })
                        setSprites(spriteArray)
                    })
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error)
                setLoading(false);
            })

        return () => cancel
    }, [currentPageUrl])




    function goToNextPage() {
        setCurrentPageUrl(nextPageUrl)
    }

    function goToPrevPage() {
        setCurrentPageUrl(prevPageUrl)
    }

    if(loading) return "Loading..."

    return (
                    <div>
                        <CssBaseline />
                        <AppBar position={"relative"} style={{ backgroundColor: '#f6c833' }}>
                            <Toolbar >
                                <CatchingPokemon className={classes.icon} style={{ color: '#1386fe' }}/>
                                <Typography variant={"h6"} style={{ color: '#1386fe' }}>
                                    Pokedex
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <main>
                            <div className={classes.container} style={{ backgroundColor: '#1386fe' }}>
                                <Container maxWidth={"sm"} >
                                    <Typography variant={"h2"} align={"center"} color={"textPrimary"} style={{ color: 'white', fontWeight: 'bold' }} gutterBottom>
                                        Pokedex
                                    </Typography>
                                    <Typography variant={"h5"} align={"center"} color={"textSecondary"} style={{ color: 'white' }} paragraph>
                                        A cool Pokedex!
                                    </Typography>
                                    <div className={classes.buttons}>
                                        <Grid container spacing={2} justify={"center"}>
                                            <Grid item>
                                                <Button variant={"contained"} color={"primary"} style={{ backgroundColor: '#f6c833',  color: '#1386fe' }}>
                                                    View by generation
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Container>
                            </div>
                            <Container className={classes.cardGrid} maxWidth={"md" } >
                                <Grid container spacing={10}>
                                    {cards.map((card, index) => (
                                        <Grid item key={card} xs={12} sm={6} md={5} lg={4}>
                                            <Card className={classes.card}>
                                                {sprites[index] ? (
                                                    <CardMedia
                                                        component={"img"}
                                                        className={classes.cardMedia}
                                                        image={sprites[index]}
                                                        title={"Image title"}
                                                    />
                                                ) : (
                                                    <div>Loading sprite...</div>
                                                )}
                                                <CardContent className={classes.cardContent} style={{ backgroundColor: '#1386fe', display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '8px' }}>
                                                    <Typography gutterBottom variant={"h5"} style={{ color: 'white', fontWeight: 'bold', marginTop: '0', marginBottom: '0' }}>
                                                        {pokemon[card]}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions style={{ backgroundColor: '#1386fe', display: 'flex', justifyContent: 'center', paddingTop: '4px', paddingBottom: '4px' }}>

                                                    <Button size={"small"} color={"primary"} style={{ backgroundColor: '#f6c833', width: '100%' }}>
                                                        More Info
                                                    </Button>

                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Container>
                        </main>
                        <footer className={classes.footer} style={{ backgroundColor: '#1386fe' }}>
                            <Typography variant={"h6"} align={"center"} gutterBottom>
                                <Pagination
                                    goToNextPage={nextPageUrl ? goToNextPage : null}
                                    goToPrevPage={prevPageUrl ? goToPrevPage : null}
                                />
                            </Typography>
                        </footer>
                    </div>
    )
}

export default App;