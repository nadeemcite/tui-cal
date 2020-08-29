import { Component, VERSION } from "@angular/core";
import { Subject } from "rxjs";
declare var moment: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data= new Subject<any[]>();
  constructor() {}
  ngOnInit() {
    this.init();
  }
  loadMoment() {
    return new Promise(resolve => {
      if (document.getElementById("__js__moment")) {
        resolve();
      } else {
        let script = document.createElement("script");
        script.id = "__js__moment";
        script.onload = () => {
          resolve();
        };
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js";
        document.head.appendChild(script);
      }
    });
  }
  dataList: any[];
  async init() {
    await this.loadMoment();
    this.dataList = [
      {
        id: 1,
        startDate: moment("2020-08-18 10:00", "YYYY-MM-DD HH:mm").toDate(),
        endDate: moment("2020-08-18 15:00", "YYYY-MM-DD HH:mm").toDate(),
        title: "Test 1"
      },
      {
        id: 2,
        startDate: moment("2020-08-20 10:00", "YYYY-MM-DD HH:mm").toDate(),
        endDate: moment("2020-08-26 10:00", "YYYY-MM-DD HH:mm").toDate(),
        title: "Test 2"
      }
    ]
    this.data.next(this.dataList)
  }
  enterNewData(){
    this.dataList.push({
      id: 3,
        startDate: moment("2020-08-01 10:00", "YYYY-MM-DD HH:mm").toDate(),
        endDate: moment("2020-08-05 10:00", "YYYY-MM-DD HH:mm").toDate(),
        title: "Test 3"
    });
    this.data.next(this.dataList)
  }
}
