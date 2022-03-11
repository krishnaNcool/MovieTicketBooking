import { $, createSVG } from './svg_utils';

export default class Swimlane {
    constructor(gantt, swimlane) {
        this.gantt = gantt;
        this.parent = gantt.$svg_swimlanes;
        this.swimlane = swimlane;

        this.set_defaults();
        this.make();
    }

    set_defaults() {
        this.longest_title_width = this.parent.longest_title_width;
        this.longest_sub_title_width = this.parent.longest_sub_title_width;
        this.container_width = this.parent.getBoundingClientRect().width;
        this.padding = this.gantt.options.padding;
        this.swimlanes_map = this.gantt.swimlanes_map;
        this.row_height = this.gantt.swimLane_height;
        this.header_height = this.gantt.header.getBoundingClientRect().height;
    }

    make() {
        this.make_main_cell();
    }

    make_main_cell() {
        this.swimlane_group = createSVG('g', {
            class: 'swimlane',
            id: this.swimlane.id,
            append_to: this.parent
        });

        this.title = createSVG('text', {
            x: this.padding,
            y: 0,
            innerHTML: this.swimlane.title,
            class: 'swimlane-label',
            append_to: this.swimlane_group
        });

        this.title.onclick = e => {
            this.gantt.is_title = !this.gantt.is_title;
            this.gantt.onClick(this.swimlane);
        };

        this.main_cell = createSVG('rect', {
            x: 0,
            y: 0,
            width: this.container_width,
            height: 0,
            class: 'swimlane-row',
            append_to: this.swimlane_group
        });

        this.swimlane_group.appendChild(this.title);

        this.from_row = this.swimlanes_map.indexOf(this.swimlane.title);
        this.to_row = this.swimlanes_map.indexOf(this.swimlane.title);

        this.info = createSVG('text', {
            x: this.main_cell.getBBox().width - 20,
            y: 0,
            class: 'swimlane-icon',
            innerHTML: `&#9432<title>${this.swimlane.description}</title>`,
            append_to: this.swimlane_group
        });

        this.update_main_cell_position();
    }

    make_sub_cells() {
        this.from_row = Number.MAX_SAFE_INTEGER;
        this.to_row = 0;

        for (let sub_swimlane in this.swimlanes_map[this.swimlane]) {
            let row_index = this.swimlanes_map[this.swimlane][sub_swimlane];

            this.from_row =
                row_index < this.from_row ? row_index : this.from_row;
            this.to_row = row_index > this.to_row ? row_index : this.to_row;

            if (!sub_swimlane.includes('undefined')) {
                let sub_swimlanes_group = createSVG('g', {
                    class: 'sub-swimlane',
                    id: sub_swimlane,
                    append_to: this.swimlane_group
                });

                let y_coord = this.gantt.get_y_coord_of_row(row_index);

                let sub_title = createSVG('text', {
                    x: 0,
                    y:
                        (row_index === 0 ? this.header_height : y_coord) +
                        3 * this.row_height / 5,
                    innerHTML: sub_swimlane,
                    class: 'sub-swimlane-label',
                    append_to: sub_swimlanes_group
                });

                let finale_x_coord =
                    this.container_width -
                    this.longest_sub_title_width -
                    this.padding;
                createSVG('rect', {
                    x: finale_x_coord,
                    y: row_index === 0 ? this.header_height : y_coord,
                    width: this.longest_sub_title_width + this.padding,
                    height: this.row_height,
                    class: 'sub-swimlane-row',
                    append_to: sub_swimlanes_group
                });

                $.attr(sub_title, 'x', finale_x_coord + this.padding / 2);
                sub_swimlanes_group.appendChild(sub_title);
            }
        }

        this.update_main_cell_position();
    }

    update_main_cell_position() {
        // let y_coord_from = this.gantt.get_y_coord_of_row(this.from_row);

        $.attr(
            this.title,
            'y',
            (this.from_row === 0 ? this.header_height : this.gantt.swimLane_y) +
                this.row_height * (this.to_row - this.from_row + 1) / 2 +
                this.title.getBoundingClientRect().height / 4
        );

        $.attr(
            this.info,
            'y',
            (this.from_row === 0 ? this.header_height : this.gantt.swimLane_y) +
                this.row_height * (this.to_row - this.from_row + 1) / 2 +
                this.title.getBoundingClientRect().height / 4
        );
        $.attr(
            this.main_cell,
            'y',
            this.from_row === 0 ? this.header_height : this.gantt.swimLane_y
        );
        $.attr(
            this.main_cell,
            'height',
            this.from_row === 0
                ? this.gantt.swimLane_y
                : this.row_height * Math.abs(this.to_row - this.from_row + 1)
        );
    }

    /*
     * is_title == true => returns width of the biggest text svg element with swimlane title
     * is_title == false => returns width of the biggest text svg element with swimlane subtitle
     */
    static get_longest_title_width(gantt, is_title) {
        let max = 0;
        let longest_title;
        gantt.swimLanes.forEach(swimlane => {
            let displayName = is_title ? swimlane.title : swimlane.label;
            if (displayName) {
                if (displayName.length > max) {
                    max = displayName.length;
                    longest_title = displayName;
                }
            }
        });

        let swimlane_group = createSVG('g', {
            class: 'swimlane',
            append_to: gantt.$svg_swimlanes
        });

        let title = createSVG('text', {
            x: gantt.options.padding,
            y: 0,
            innerHTML: longest_title,
            class: 'swimlane-label',
            append_to: swimlane_group
        });

        let result = title.getBBox().width;
        gantt.$svg_swimlanes.innerHTML = '';

        gantt.longest_title_width = result;
        gantt.shortest_title_width = 0;

        return result;
    }
}
