import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as ScrollLink, Element } from 'react-scroll';
import './HomePage.css'; // Ensure this CSS file is properly imported

// Importing images
import headerImg from '../../assets/bookOne.jpg';
import imgDetail from '../../assets/bookThree.jpg';
import imgDetail2 from '../../assets/bookTwo.jpg';

const HomePage = () => {
    const itemList = [
        { text: "Home", to: "/home" },
        { text: "About", to: "/about" },
        { text: "Contact", to: "/contact" },
    ];

    return (
        <Box sx={{ minHeight: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <AppBar component="nav" position="sticky" sx={{ backgroundColor: 'orange' }} elevation={0}>
                <Toolbar className="styled-toolbar">
                    <Typography variant="h6" component="h2">
                        EBooks..
                    </Typography>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {/* Add DrawerItem component for mobile view if needed */}
                    </Box>
                    <List className="list-menu">
                        {itemList.map((item) => (
                            <ListItem key={item.text}>
                                <ScrollLink
                                    activeClass="active"
                                    to={item.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    <ListItemButton component={RouterLink} to={item.to} sx={{ color: '#fff', "&:hover": { backgroundColor: 'transparent', color: '#1e2a5a' } }}>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ScrollLink>
                            </ListItem>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>

            <Element name="home">
                <Box component='header' className="custom-box">
                    <Box component='section' className="box-text">
                        <Typography variant='h2' component='h1' sx={{ fontWeight: 700, color: '#fff' }}>
                            WE HAVE THE HOUSE OF YOUR DREAM BOOKS
                        </Typography>
                        <Typography component='p' sx={{ py: 3, lineHeight: 1.6, color: '#fff' }}>
                            We have 9000 more reviews and our customers trust on our books and quality products.
                        </Typography>
                        <Box>
                            <Button component={RouterLink} to={'/Register'} variant='contained' sx={{ mr: 2, px: 4, py: 1, fontSize: '0.9rem', textTransform: 'capitalize', borderRadius: 0, backgroundColor: '#14192d', "&:hover": { backgroundColor: "#343a55" } }}>
                                Register
                            </Button>
                            <Button component={RouterLink} to={'/login'} variant='outlined' sx={{ px: 4, py: 1, fontSize: '0.9rem', textTransform: 'capitalize', borderRadius: 0, color: '#fff', backgroundColor: 'transparent', borderColor: '#fff', "&:hover": { color: '#343a55', borderColor: '#343a55' } }}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={theme => ({ [theme.breakpoints.down('md')]: { flex: '1', paddingTop: '10px', alignSelf: 'center' }, [theme.breakpoints.up('md')]: { flex: '2', alignSelf: 'flex-end' } })}>
                        <img src={imgDetail} alt="imgDetail" className="header-img" />
                    </Box>
                </Box>
            </Element>

            <Element name="about">
                <Grid container spacing={{ xs: 4, sm: 4, md: 0 }} sx={{ py: 10, px: 2 }}>
                    <Grid item xs={12} sm={8} md={6} component='section' className="custom-grid-item">
                        <Box component='article' sx={{ px: 4 }}>
                            <Typography variant='h4' component='h2' sx={{ textAlign: 'start' }}>
                                We make it easy for buying the products
                            </Typography>
                            <Typography className="custom-typography">
                                Listings are updated continuously so you won't miss out on homes that just hit the market until you find your perfect books or contents.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                        <img src={imgDetail} alt="" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6} sx={{ order: { xs: 4, sm: 4, md: 3 } }}>
                        <img src={imgDetail2} alt="" style={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6} sx={{ order: { xs: 3, sm: 3, md: 4 } }} className="custom-grid-item">
                        <Box component='article' sx={{ px: 4 }}>
                            <Typography variant='h4' component='h2' sx={{ textAlign: 'start' }}>
                                Match with the best Publishers
                            </Typography>
                            <Typography className="custom-typography">
                                Our verified partner Publishers and authors experts who earn an average of 4.8/5 stars from buyers and sellers.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Element>

            <Element name="contact">
                <Stack component='section' direction="column" justifyContent='center' alignItems='center' sx={{ py: 10, mx: 6 }}>
                    <Typography variant='h4' component='h2' sx={{ textAlign: 'center' }}>
                        Contact us for any query
                    </Typography>
                    <Typography variant='body1' component='p' sx={{ maxWidth: 'sm', mx: 'auto', textAlign: 'center', mt: 2 }}>
                        It is our commitment to ensure a professional and enjoyable new books buying experience for you. If you want to get a home to start living as a family in an area that you love click the button below.
                    </Typography>
                    <Button component={RouterLink} to={'/contact'} variant="contained" size="medium" sx={{ fontSize: '0.9rem', textTransform: 'capitalize', py: 2, px: 4, mt: 3, mb: 2, borderRadius: 0, backgroundColor: '#14192d', "&:hover": { backgroundColor: '#1e2a5a' } }}>
                        Get in Touch
                    </Button>
                </Stack>
            </Element>
        </Box>
    );
};

export default HomePage;
