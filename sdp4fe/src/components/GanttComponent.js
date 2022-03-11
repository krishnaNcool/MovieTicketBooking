import React, { useState, useEffect } from "react";
import FrappeGantt from "../react-frappe-gantt/src/components/FrappeGantt";
import { useQuery, gql } from "@apollo/client";
import Pan from "../utils/pan";
import ActivityDialog from './DialogComponent';
import { OptionContext } from "../providers/OptionProvider";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const SWIMLANES_QUERY = gql`
  query GetSwimlanes {
    swimlanes(options: { sort: [{ visualOrder: ASC }] }, where: { name_NOT: "-" }) {
      id
      sdpName
      name
      title
      description
      label
      taskFillHex
      preProjectTaskFillHex
      preProjectTaskTextColourHex
      swimlaneBackgroundHex
      taskTextColourHex
      taskBorderHex
      cricticalPathTaskFillHex
      cricticalPathTaskTextColourHex
      tasks(where: { activities: { id_NOT: null } }) {
        type: __typename
        id
        name
        longName
        isPreProjectTask
        start
        end
        progress
        isMilestone
        swimlaneName
        activities {
          id
          type: __typename
          name
          longName
          task
          start: startDay
          end: endDay
          isCritical
          swimlaneName
          progress: percentageComplete
        }
      }
    }
  }
`;

const VIEW_MODE = {
  DAY: "Day",
  TWO_DAY: "Two Day",
  THREE_DAY: "Three Day",
  FIVE_DAY: "Five Day",
  WEEK: "Week",
  TWO_WEEK: "Two Week",
  THREE_WEEK: "Three Week",
  MONTH: "Month",
  TWO_MONTH: "Two Month",
  THREE_MONTH: "Three Month",
  SIX_MONTH: "Six Month",
  YEAR: "Year"
};

const ZOOM_LEVEL = {
  DAY: "300",
  TWO_DAY: "275",
  THREE_DAY: "250",
  FIVE_DAY: "225",
  WEEK: "200",
  TWO_WEEK: "175",
  THREE_WEEK: "125",
  MONTH: "100",
  TWO_MONTH: "75",
  THREE_MONTH: "50",
  SIX_MONTH: "25",
  YEAR: "0"
};

const viewModes = Object.keys(VIEW_MODE);

const GanttComponent = () => {
  const { data, loading, error } = useQuery(SWIMLANES_QUERY);
  const { isAbsoluteDate, isFullName } = React.useContext(OptionContext);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [show, setShow] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [view, setView] = useState(VIEW_MODE.MONTH);
  const [open, setOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});

  const getZoomLevels = idx => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    setShow(true);
    return ZOOM_LEVEL[Object.keys(VIEW_MODE)[idx]];
  };

  const getNextIdx = (idx = 0, length, direction) => {
    switch (direction) {
      case "in":
        return (idx + 1) % length;
      case "out":
        return (idx === 0 && length - 1) || idx - 1;
      default:
        return idx;
    }
  };

  useEffect(
    () => {
      //   effect
      const slider = document.querySelector(".gantt-container");
      let idx = Object.values(VIEW_MODE).indexOf(VIEW_MODE.MONTH);

      // if idx is undefined, so getNextIdx will take MONTH as default
      const getNewIndexAndRender = direction => {
        idx = getNextIdx(idx, viewModes.length, direction);
        setView(Object.values(VIEW_MODE)[idx]);
        setZoomLevel(getZoomLevels(idx, viewModes));
      };
      // const svg = document.querySelector(".gantt");
      if (!slider) return;

      Pan(slider);
      // let scale = 1;

      slider.addEventListener("mousewheel", e => {
        if (e.ctrlKey) {
          e.preventDefault();
          const direction = Math.sign(e.deltaY) === 1 ? "in" : "out";
          // scale += e.deltaY * -0.01;
          if (
            Math.sign(e.deltaY) === 1 &&
            Math.abs(Math.ceil(e.deltaY / 10)) >= 5
          ) {
            if (idx === Object.values(VIEW_MODE).length - 1) {
              return;
            }
            getNewIndexAndRender(direction);
          }
          if (
            Math.sign(e.deltaY) === -1 &&
            Math.abs(Math.ceil(e.deltaY / 10)) >= 5
          ) {
            if (idx === 0) {
              return;
            }
            getNewIndexAndRender(direction);
          }
        }
      });

      return () => {
        //   cleanup
        slider.replaceWith(slider.cloneNode());
      };
    },
    [loading]
  );

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const result = JSON.parse(JSON.stringify(data));

  const dialogToggle = (activity) => {
    setSelectedActivity(activity);
    setOpen(open => !open);
  }

  return (
    <div>
      {!loading && (
        <>
          <div className="gant-header">
            Current selection: &nbsp; <span>Program / Continous Program & Finance Monitoring</span>
            {!mobile && (
              <div className="gantt-header-buttons">
                {/* <Button size="small" color="secondary" variant="contained" startIcon={<ErrorOutlineIcon />}>
                  Report
                </Button> */}
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button size="small" color="secondary" variant="contained" startIcon={<ErrorOutlineIcon />} {...bindTrigger(popupState)}>
                        Report
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem component='a' href='https://git.rle.de/sdp/sdpreactui/-/issues/new?issuable_template=bug_report_sdp&issue%5Btitle%5D=Bug%3A' onClick={popupState.close}>Report Bug</MenuItem>
                        <MenuItem component='a' href='https://git.rle.de/sdp/sdpreactui/-/issues/new?issuable_template=not_working_as_expected&issue%5Btitle%5D=Not+Working+As+Expected%3A' onClick={popupState.close}>Report Not Working As Expected</MenuItem>
                        <MenuItem component='a' href='https://git.rle.de/sdp/sdpreactui/-/issues/new?issuable_template=improvement_suggestion&issue%5Btitle%5D=Suggested+Improvement%3A' onClick={popupState.close}>Suggest Improvement</MenuItem>
                        <MenuItem component='a' href='https://git.rle.de/sdp/sdpreactui/-/issues/new?issuable_template=feature_request&issue%5Btitle%5D=Feature+Request%3A' onClick={popupState.close}>Request Feature</MenuItem>

                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
                <Button size="small" color="secondary" variant="contained" startIcon={<HighlightOffIcon />}>
                  Activities to delete
                </Button>
                <Button size="small" color="secondary" variant="contained" startIcon={<HighlightOffIcon />}>
                  Milestones to delete
                </Button>
                <Button size="small" color="secondary" variant="contained" startIcon={<FastForwardIcon />}>
                  Already executed activities
                </Button>
              </div>
            )}
          </div>
          <FrappeGantt
            tasks={result.swimlanes}
            viewMode={view}
            isAbsoluteDate={isAbsoluteDate}
            isFullName={isFullName}

            onDblClick={activity => dialogToggle(activity)}
            isMobile={mobile}
          // onClick={task => console.log("onClick")}
          // onDateChange={(task, start, end) => console.log("onDateChange")}
          // onProgressChange={(task, progress) =>
          //   console.log("onProgressChange")
          // }
          // onTasksChange={tasks => console.log("onTasksChange")}
          />
          {show && <div className={"zoom-footer"}>Zoom: {zoomLevel}%</div>}
          <div className="dialog">
            <ActivityDialog activity={selectedActivity} open={open} toggle={dialogToggle}></ActivityDialog>
          </div>
        </>
      )}
    </div>
  );
};

export default GanttComponent;
