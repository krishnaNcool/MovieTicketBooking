import React from 'react'
import logo from "../images/sdp_logo_and_text.png";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const COMPANY_QUERY = gql`
  query GetCompanies {
    companies{
        name
        id
    }
  }
`;

function LandingComponent() {
    const { data, loading, error } = useQuery(COMPANY_QUERY);

    const [company, setCompany] = React.useState('');
    const [project, setProject] = React.useState('')

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <>
            <div className="landing">
                <Stack spacing={2} direction="column">
                    <img src={logo} alt={logo} style={{ width: '300px' }} />
                    <Stack spacing={2} direction="row">
                        <FormControl sx={{ width: '40%', minWidth: 60 }} size="small">
                            <InputLabel id="company">Company</InputLabel>
                            <Select
                                labelId="company"
                                id="company-select"
                                value={company}
                                label="Company"
                                onChange={handleCompanyChange}
                            >
                                {data.companies.map(c => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '40%', minWidth: 60 }} size="small">
                            <InputLabel id="project">Project</InputLabel>
                            <Select
                                labelId="project"
                                id="project-select"
                                value={project}
                                label="Project"
                                onChange={handleProjectChange}
                            >
                                {data.companies.map(c => <MenuItem key={c.id} value={c.name}>Project{c.id}</MenuItem>)}

                            </Select>
                        </FormControl>
                        <IconButton color="primary" component={Link} to="/home">
                            <ArrowForwardIosIcon fontSize="medium" />
                        </IconButton>
                    </Stack>
                </Stack>
            </div>
        </>
    )
}

export default LandingComponent
