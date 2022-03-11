import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

const ActivityDialogComponent = ({ open, toggle, activity }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div id="root">
            <Dialog open={open} onClose={toggle} fullScreen={fullScreen} >
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >Activity Details</Box>
                        <Box>
                            <IconButton onClick={toggle}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogTitle>
                    <Box display="block" alignItems="center">
                        <Typography sx={{ flexShrink: 0 }}>
                            <strong>Activity:</strong> <small>{activity.name}</small>
                        </Typography>
                        <Typography sx={{ flexShrink: 0 }}>
                            <strong>Task:</strong> <small>{activity.task}</small>
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Change Delay
                            </Typography>
                            {/* <Typography sx={{ color: 'text.secondary' }}>Original Delay start: -1093 end: -988</Typography> */}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} style={{ alignItems: 'center' }}>
                                <Grid item xs="auto">
                                    <span>Delay:</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        id="outlined-number"
                                        type="number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <span style={{ fontSize: '12px' }}>Working Days </span>
                                    <span style={{ fontSize: '10px', paddingLeft: '10px' }}> Orignal Start Day: -123 End: -134</span>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >

                            <Typography sx={{ width: '100%', flexShrink: 0 }}>Change Duration Without Workload Change</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} style={{ alignItems: 'center' }}>
                                <Grid item xs="auto">
                                    <span>Duration:</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        id="outlined-number"
                                        type="number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <span style={{ fontSize: '12px' }}>Working Days </span>
                                    <span style={{ fontSize: '10px', paddingLeft: '10px' }}> Orignal Duration : 49 working days</span>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >

                            <Typography sx={{ width: '100%', flexShrink: 0 }}>Change Duration With Workload Change</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} style={{ alignItems: 'center' }}>
                                <Grid item xs="auto">
                                    <span>Duration:</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        id="outlined-number"
                                        type="number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <span style={{ fontSize: '12px' }}>Working Days </span>
                                    <span style={{ fontSize: '10px', paddingLeft: '10px' }}> Orignal Duration : 49 working days</span>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >

                            <Typography sx={{ width: '100%', flexShrink: 0 }}>Change Resource Without Workload</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" >
                                    <TableHead style={{ backgroundColor: 'grey', color: 'white' }}>
                                        <TableRow>
                                            <TableCell>Team</TableCell>
                                            <TableCell align="center">People</TableCell>
                                            <TableCell align="center">Skill Label</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Designer</TableCell>
                                            <TableCell align="center" style={{ width: '30%' }}>
                                                <TextField
                                                    size="small"
                                                    id="outlined-number"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                /></TableCell>
                                            <TableCell align="center">9</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>


                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel6'}
                        style={{
                            background: 'grey',
                            pointerEvents: 'none',
                            filter: 'brightness(155%)'
                        }}
                        onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                        >

                            <Typography sx={{ width: '100%', flexShrink: 0 }}>To do - Change Resource with Workload change</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} style={{ alignItems: 'center' }}>
                                <Grid item xs="auto">
                                    <span>test:</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        id="outlined-number"
                                        type="number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <span style={{ fontSize: '12px' }}>% </span>
                                    <span style={{ fontSize: '10px', paddingLeft: '10px' }}> Orignal Maturity : 0 %</span>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >

                            <Typography sx={{ width: '100%', flexShrink: 0 }}>Change Activity Maturity</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} style={{ alignItems: 'center' }}>
                                <Grid item xs="auto">
                                    <span>Maturity:</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        size="small"
                                        id="outlined-number"
                                        type="number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <span style={{ fontSize: '12px' }}>% </span>
                                    <span style={{ fontSize: '10px', paddingLeft: '10px' }}> Orignal Maturity : 0 %</span>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={toggle}>Cancel</Button>
                    <Button color="secondary" variant="contained" onClick={toggle}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ActivityDialogComponent;
