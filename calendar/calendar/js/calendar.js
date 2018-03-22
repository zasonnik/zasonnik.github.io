var events = {
  2018: {
    0: {
      23: {
        "18:00": {
          name: "Mettind",
          description: "Frends meeting."
        },
        "20:00": {
          name: "Sleeping",
          desciption: "Sleeping night outside home. Maybe you need it"
        }
      },
      25: {
        "11:00": {
          name: "Drink all night"
        }
      }
    },
    2: {
      21: {
        "18:00": {
          name: "Mettind",
          description: "Frends meeting."
        },
        "20:00": {
          name: "Sleeping",
          desciption: "Sleeping night outside home. Maybe you need it"
        }
      },
      22: {
        "11:00": {
          name: "Drink all night"
        }
      }
    }
  }
}

var months = ["Jun", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function init_calendars(selector){
  var wrappers = document.querySelectorAll(selector);
  Array.prototype.slice.call(wrappers).map(init_calendar);
}

function init_calendar(wrapper){
  var avalibleYears = Object.keys(events);
  var year_element = wrapper.querySelector("select.year");
  var about_element = wrapper.querySelector("div.event_about");
  avalibleYears.map(function(year){
    var option = document.createElement("option");
    option.value = year;
    option.text = year;
    year_element.add(option);
  });
  var month_element = wrapper.querySelector("select.month");
  months.map(function(name, num){
    var option = document.createElement("option");
    option.value = num;
    option.text = name;
    month_element.add(option);
  });
  var now_date = new Date();
  var start_year = now_date.getFullYear();
  if(!events[start_year]){
    start_year = avalibleYears[avalibleYears.length-1];
  }
  year_element.value = start_year;
  month_element.value = now_date.getMonth();


  year_element.addEventListener("change", date_changed);
  month_element.addEventListener("change", date_changed);

  var table_body = wrapper.querySelector("table.calendar tbody")

  function date_changed(){

    //At first - clear
    table_body.innerHTML = "";
    //Go with dates
    var day = new Date(year_element.value, month_element.value, 1);
    var total_days_in_month = daysInMonth(year_element.value, month_element.value);
    var row = table_body.insertRow(-1);
    var current_day_number = -1;
    var events_in_month = events[year_element.value][month_element.value];
    for(var i=0; i<day_to_normal(day.getDay()); i++){
      row.insertCell(-1);
      current_day_number = i;
    };
    for(var i=0; i<total_days_in_month; i++){
      current_day_number++;
      if(current_day_number>6){
        row = table_body.insertRow(-1);
        current_day_number = 0;
      }
      var day_cell = row.insertCell(-1);
      var date_div = document.createElement("div");
      date_div.innerHTML = i+1;
      date_div.classList.add('date');
      day_cell.appendChild(date_div);
      if(!events_in_month){
        continue;
      }
      var events_in_day = events_in_month[i+1];
      if(!events_in_day){
        continue;
      }
      var events_times = Object.keys(events_in_day);
      events_times.map(function(key){
        var event_div = document.createElement("div");
        event_div.classList.add("event");
        event_div.innerHTML = key+" "+events_in_day[key].name;
        day_cell.appendChild(event_div);
        var event_date = new Date(year_element.value, month_element.value, i+1);
        event_div.addEventListener("click", (function(event_date, event_time, event){
           return function(){
             about_element.innerHTML = "";
             var human_readable_date = event_date.getDate()+"."+(event_date.getMonth()+1)+"."+event_date.getFullYear();
             var header_text = human_readable_date+" "+event_time+" "+event.name;
             var header = document.createElement("h2")
             header.innerHTML = header_text;
             about_element.appendChild(header);
             if(event.description){
               var p = document.createElement("p");
               p.innerHTML = event.description;
               about_element.appendChild(p);
             }
           }
        })(event_date, key, events_in_day[key]));
      });
    }
  }
  date_changed();

  

  function day_to_normal(day){
    if(day==0){
      return 6;
    }
    return day-1;
  }
  function daysInMonth (year, month) {
    return (new Date(year, parseInt(month)+1, 0)).getDate();
  }
}

document.addEventListener("DOMContentLoaded", function(){
  init_calendars("div.calendar_wrapper");
});
