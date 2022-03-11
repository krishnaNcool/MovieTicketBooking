import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function FooterComponent() {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ flexGrow: 1 }} className="footer">
            <Grid container>
                <Grid item xs={1} md={1}>
                    <Box elevation={0}><a href={"/"}>Home</a></Box>
                </Grid>
                <Grid container item xs={.2} md={0}>
                    <Box> {mobile && <div>|</div>}</Box>
                </Grid>
                <Grid item xs={1.2} md={1}>
                    <Box><a href={"imprint"}>Imprint</a></Box>
                </Grid>
                <Grid item xs={.2} md={0} >
                    <Box> {mobile && <div>|</div>}</Box>
                </Grid>
                <Grid item xs={2.8} md={2}>
                    <Box> <a href={"privacy"}>Data protection </a></Box>
                </Grid>
                <Grid item xs={6.5} md={7.5} container justifyContent="right">
                    <Box>
                        &copy; 2019-{new Date().getFullYear().toString().substr(2)} by RLE INTERNATIONAL GmbH
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FooterComponent
