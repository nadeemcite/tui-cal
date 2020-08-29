import { Component, ViewChild, Input } from "@angular/core";
import { CalendarService } from "./calendar.service";
import { Subject } from "rxjs";
declare var tui: any;

interface Node {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
}

@Component({
  selector: "app-calendar",
  templateUrl: "calendar.component.html",
  styleUrls: ["calendar.component.css"]
})
export class CalendarComponent {
  @Input("nodeSubject")
  nodeSubject: Subject<Node[]>;
  schedules: any[];
  constructor(private calendarService: CalendarService) {}
  @ViewChild("calendar")
  calendar;
  tuiCalendar;
  ngOnInit() {
    this.init();
    this.nodeSubject.subscribe((nodes: Node[]) => {
      this.schedules = nodes.map(node => {
        return {
          id: node.id + "",
          calendarId: "1",
          title: node.title,
          start: node.startDate.toISOString(),
          end: node.endDate.toISOString(),
          category: "time",
          dueDateClass: ""
        };
      });
      this.createSchedules();
    });
  }
  async loadLibraries() {
    for (let i = 0; i < this.calendarService.SCRIPTS.length; i++) {
      await this.calendarService.loadSingleScript(
        this.calendarService.SCRIPTS[i][0],
        this.calendarService.SCRIPTS[i][1]
      );
    }
    for (let i = 0; i < this.calendarService.STYLES.length; i++) {
      await this.calendarService.loadSingleStyle(
        this.calendarService.STYLES[i][0],
        this.calendarService.STYLES[i][1]
      );
    }
  }
  async init() {
    await this.loadLibraries();
    this.tuiCalendar = new tui.Calendar(this.calendar.nativeElement, {
      defaultView: "month",
      taskView: true, // Can be also ['milestone', 'task']
      scheduleView: true, // Can be also ['allday', 'time']
      template: {
        milestone: function(schedule) {
          return (
            '<span style="color:red;"><i class="fa fa-flag"></i> ' +
            schedule.title +
            "</span>"
          );
        },
        milestoneTitle: function() {
          return "Milestone";
        },
        task: function(schedule) {
          return "&nbsp;&nbsp;#" + schedule.title;
        },
        taskTitle: function() {
          return '<label><input type="checkbox" />Task</label>';
        },
        allday: function(schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>';
        },
        alldayTitle: function() {
          return "All Day";
        },
        time: function(schedule) {
          return (
            schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start
          );
        }
      },
      month: {
        daynames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        startDayOfWeek: 0,
        narrowWeekend: true
      },
      week: {
        daynames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        startDayOfWeek: 0,
        narrowWeekend: true
      }
    });

    this.createSchedules();
    this.tuiCalendar.on('clickSchedule', (event)=> {
        var schedule = event.schedule;

        if (this.lastClickSchedule) {
            this.tuiCalendar.updateSchedule(this.lastClickSchedule.id, this.lastClickSchedule.calendarId, {
                isFocused: false
            });
        }
        this.tuiCalendar.updateSchedule(schedule.id, schedule.calendarId, {
            isFocused: true
        });

        this.lastClickSchedule = schedule;
        // open detail view
        this.showAlert(schedule);
    });
    this.tuiCalendar.on('beforeUpdateSchedule', (event)=> {
        var schedule = event.schedule;
        var changes = event.changes;

        this.tuiCalendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });
  }
  lastClickSchedule
  createSchedules() {
    if (this.tuiCalendar) {
      this.tuiCalendar.clear();
      this.tuiCalendar.createSchedules(this.schedules);
      this.tuiCalendar.render();
    }
  }
  showAlert(schedule){
    alert(JSON.stringify(schedule))
  }
}
