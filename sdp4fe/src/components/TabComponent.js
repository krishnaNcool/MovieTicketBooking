import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Gantt from "./GanttComponent";
import ResourceComponent from './ResourceComponent';

export default function TabComponent() {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                        className="tabs"
                    >
                        <Tab className="tab" value="one" label="Timeline" />
                        <Tab className="tab" value="two" label="Resources" />
                        <Tab className="tab" value="three" label="Output Values" />
                        <Tab className="tab" value="four" label="Display Options" />
                        <Tab className="tab" style={{ color: 'red' }} value="five" label="User log (450)" />
                    </Tabs>
                </Box>

                <TabPanel className="tabpanel" value="one"><Gantt /></TabPanel>
                <TabPanel className="tabpanel" value="two"><ResourceComponent /></TabPanel>
                <TabPanel className="tabpanel" value="three">Item Three</TabPanel>
                <TabPanel className="tabpanel" value="four">Item Four</TabPanel>
                <TabPanel className="tabpanel" value="five">Item Five</TabPanel>
            </TabContext>
        </Box>
    );
}
