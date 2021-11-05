import { LightningElement, track } from 'lwc';


export default class ToDoManager extends LightningElement {

@track time = "11:35";
@track greeting = "Good Night";

@track todos = [];
@track todoc = [];

renderedCallback(){
  this.getTime();

  setInterval( () => {
    this.getTime();
  }, 1000);
    
}

getTime(){

    const dates = new Date();
    const hours = dates.getHours();
    const mins = dates.getMinutes();
    const sec = dates.getSeconds();

    this.time = `${this.getHour(hours)}:${this.getDoubleDigit(
        mins)}:${this.getSec(sec)} ${this.getMidDay(hours)
    }`;

    this.setGreeting(hours);
}
getSec(sec){
  return sec <10 ? "0" + sec : sec;
}
getHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  }

  //convert single digit to double digit
  getDoubleDigit(digit) {
    return digit < 10 ? "0" + digit : digit;
  }

  //return AM or PM based on current hour
  getMidDay(hour) {
    return hour >= 12 ? "PM" : "AM";
  }
  setGreeting(hour) {
    if (hour < 12) {
      this.greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      this.greeting = "Good Afternoon";
    } else {
      this.greeting = "Good Evening";
    }
  }
  toDoHandler(){
    const todo = this.template.querySelector("lightning-input");
    console.log(todo.value);

    const todosc = {
      todoId: this.todos.length,
      todoName : todo.value,
      done: false,
      todoDate: new Date()
    }
    if(todo.value === ""){
      alert("Please enter task to do");
    }
    else{
    this.todos.push(todosc);
    todo.value="";
    }
  }

  get upcomingTasks(){
    return this.todos && this.todos.length ? this.todos.filter( todo => !todo.done) : [];
  }
  get completedTasks(){
    return this.todos && this.todos.length ? this.todos.filter( todo => todo.done) : [];
  }
  updateHandler(){
    
  }
}