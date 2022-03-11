import logo from "../images/sdp_logo_and_text.png";
import HeaderMenuComponent from './HeaderMenuComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const HeaderComponent = () => {
    return (
        <Box sx={{ flexGrow: 1, mt: "25px" }} className="header">
            <Grid item container justifyContent="space-around">
                <Grid item xs={3} md={2}>
                    <img src={logo} alt={logo} />
                </Grid>
                <Grid item xs={6} md={8} className="header-text">
                    <Grid xs={12} md={12} container item
                        justifyContent="center"
                        style={{ fontWeight: 'bold' }}
                    >
                        <Grid item md={3}>Company: Start-Up</Grid>
                        <Grid item md={5}>Project: Start-Up Initial Vehicle</Grid>
                    </Grid>
                    <Grid style={{fontStyle:'italic'}} container item xs={12} md={12} direction="row" justifyContent="center">
                        Timing from PS (Project Start) to Jon1: 946 Days (3 years, 11 months & 6 days)
                    </Grid>
                </Grid>
                <Grid xs={3} md={2} container item justifyContent="end">
                    <HeaderMenuComponent />
                </Grid>
            </Grid>
        </Box >
    )
}

export default HeaderComponent
