import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-cursos-lq.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-cursos.jpg';

  constructor() { }

  ngOnInit() {
  }

}
