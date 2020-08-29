import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  SCRIPTS = [
    [
      "tui-code",
      "https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js"
    ],
    [
      "tui-time-picker",
      "https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js"
    ],
    [
      "tui-date-picker",
      "https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"
    ],
    [
      "tui-calander",
      "https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js"
    ]
  ];

  STYLES = [
    ["tui-cal", "https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css"],
    ["tui-datepicker","https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css"],
    ["tui-calendar","https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css"]
  ];
  loadSingleScript(scriptName, src) {
    return new Promise(resolve => {
      if (document.getElementById("__js__" + scriptName)) {
        resolve();
      } else {
        let script = document.createElement("script");
        script.id = "__js__" + scriptName;
        script.onload = () => {
          resolve();
        };
        script.src = src;
        document.head.appendChild(script);
      }
    });
  }
  loadSingleStyle(styleName, src) {
    return new Promise(resolve => {
      if (document.getElementById("__css__" + styleName)) {
        resolve();
      } else {
        let style = document.createElement("link");
        style.id = "__css__" + styleName;
        style.rel = "stylesheet";
        style.onload = () => {
          resolve();
        };
        style.href = src;
        document.head.appendChild(style);
      }
    });
  }
}
