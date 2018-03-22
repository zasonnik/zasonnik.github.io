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
    3: {
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
  avalibleYears.map(function(year){
    var option = document.createElement("option");
    option.value = year;
    option.text = year;
    year_element.add(option);
  });
  var month_element = wrapper.querySelector("select.month");
  console.log(month_element);
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
  date_changed(start_year, now_date.getMonth());
}

function date_changed(year, month){
  
}
