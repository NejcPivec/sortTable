import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = this.fb.group({
      lessons: this.fb.array([])
  });

  public simpleList = [
    {'name': 'John'},
    {'name': 'Smith'},
    {'name': 'George'},
    {'name': 'Luka'},
    {'name': 'Nejc'},
    {'name': 'Maj'},
    {'name': 'Nace'},
  ];

  activeNote: string = '';
  constructor(private fb:FormBuilder) {}

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      input1: ['', Validators.required],
      input2: ['', Validators.required],
      input3: ['', Validators.required],
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('lessons')?.value, event.previousIndex, event.currentIndex);
  }

  moveUp(index: number) {
    // console.log(this.lessons.controls);
    this.moveInArray(this.lessons.controls, index, index - 1);
  }

  moveDown(index: number) {
    this.moveInArray(this.lessons.controls, index, index + 1);
  }

  moveInArray(arr: any, from: number, to: number) {

    // Make sure a valid array is provided
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw new Error('Please provide a valid array');
    }

    // Delete the item from it's current position
    const item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
      throw new Error('There is no item in the array at index ' + from);
    }

    // Move the item to its new position
    arr.splice(to, 0, item[0]);

  };
}
