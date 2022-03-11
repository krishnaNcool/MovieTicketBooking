import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { OptionContext } from '../providers/OptionProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function HeaderMenuComponent() {
    const { isAbsoluteDate, setIsAbsoluteDate, isFullName, setIsFullName } = useContext(OptionContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAbsoluteChange = (e) => {
        setIsAbsoluteDate(e.currentTarget.checked);
    };
    const handleFullNameChange = (e) => {
        setIsFullName(e.currentTarget.checked);
    }

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            <Button
                className="header-menu"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                component="span"
            >
                {mobile ? <ListIcon /> : "Option"}
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="secondary" checked={isAbsoluteDate} onChange={(e) => handleAbsoluteChange(e)} />} label="Absolute Dates" />
                    </FormGroup>
                </MenuItem>
                <MenuItem>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="secondary" checked={isFullName} onChange={(e) => handleFullNameChange(e)} />} label="Show full name" />
                    </FormGroup>
                </MenuItem>
                {mobile && (
                    <div className="gantt-header-buttons">
                        <MenuItem>
                            <Button size="small" color="secondary" variant="contained" startIcon={<ErrorOutlineIcon />}>
                                Report
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button size="small" color="secondary" variant="contained" startIcon={<HighlightOffIcon />}>
                                Activities to delete
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button size="small" color="secondary" variant="contained" startIcon={<HighlightOffIcon />}>
                                Milestones to delete
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button size="small" color="secondary" variant="contained" startIcon={<FastForwardIcon />}>
                                Already executed activities
                            </Button>
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    );
}