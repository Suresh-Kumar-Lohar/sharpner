class Student {
  static count = 0;
  constructor(name, age, number, marks) {
    this.name = name;
    this.age = age;
    this.marks = marks;
    Student.count++;
  }
  eligible() {
    if (this.marks > 40) {
      console.log("Yes eligible");
    } else {
      console.log("Not eligible");
    }
  }
  eligibleForPlacement(minMarks) {
    return (ageIn) => {
      if (this.marks > minMarks && this.age > ageIn) {
        console.log("True he/she is eligible");
      } else {
        console.log("Not eligible");
      }
    };
  }
  static Count() {
    console.log(`Total objects are ${Student.count}`);
  }
}

const st1 = new Student("suresh", 24, 245353, 32);
const st2 = new Student("lohar", 23, 245353, 56);
const st3 = new Student("yash", 26, 245353, 23);
const st4 = new Student("mukesh", 22, 245353, 12);
const st5 = new Student("uday", 64, 245353, 88);

st5.eligibleForPlacement(65)(20);

Student.Count();
