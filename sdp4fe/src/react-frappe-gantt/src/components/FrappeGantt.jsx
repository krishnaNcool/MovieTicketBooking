import React, { Component, createRef } from "react";
import Gantt from "frappe-gantt";
import Task from "../lib/Task.js";

export default class FrappeGantt extends Component {
  constructor(props) {
    super(props);
    this._target = createRef();
    this._svg = createRef();
    this._gantt = null;

    this.state = {
      viewMode: null,
      isAbsoluteDate: true,
      isFullName: false,
      tasks: [],
      isMobile: false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      viewMode: nextProps.viewMode,
      isAbsoluteDate: nextProps.isAbsoluteDate,
      isFullName: nextProps.isFullName,
      isMobile: nextProps.isMobile,
      tasks: nextProps.tasks.map((t) => new Task(t)),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._gantt) {
      if (prevState.tasks !== this.state.tasks) {
        this._gantt.refresh(this.state.tasks);
      }
      if (prevState.viewMode !== this.state.viewMode) {
        this._gantt.change_view_mode(this.state.viewMode, false);
      }
      if (prevState.isAbsoluteDate !== this.state.isAbsoluteDate) {
        this._gantt.set_is_absolute_date(this.state.isAbsoluteDate);
      }
      if (prevState.isFullName !== this.state.isFullName) {
        this._gantt.set_is_full_name(this.state.isFullName);
        this._gantt.render(false);
      }
      if (prevState.isMobile !== this.state.isMobile) {
        this._gantt.setSwimlaneWidth(this.state.isMobile);
      }
    }
  }

  componentDidMount() {
    this._gantt = new Gantt(this._svg.current, this.state.tasks, {
      on_click: this.props.onClick,
      is_absolute_date: this.props.isAbsoluteDate,
      is_full_name: this.props.isFullName,
      on_view_change: this.props.onViewChange,
      is_mobile: this.props.isMobile,
      on_dblclick: (task) => {
        // console.log('dblclick mui ina asli');
        this.props.onDblClick(task);
      },
      on_progress_change: (task, progress) => {
        this.props.onProgressChange(task, progress);
        this.props.onTasksChange(this.props.tasks);
      },
      on_date_change: (task, start, end) => {
        if (this.props.onDateChange) {
          this.props.onDateChange(task, start, end);
        }
        if (this.props.onTasksChange) {
          this.props.onTasksChange(this.props.tasks);
        }
      },
    });

    if (this._gantt) {
      this._gantt.change_view_mode(this.state.viewMode);
    }

    const midOfSvg = this._svg.current.clientWidth * 0.5;
    this._target.current.scrollLeft = midOfSvg;
  }

  render() {
    return (
      <div className="gantt-svg" ref={this._target}>
        <svg
          ref={this._svg}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </div>
    );
  }
}
