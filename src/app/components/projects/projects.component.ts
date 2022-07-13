import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects = ["project1", "project2", "project3"];
  
  clickOpen() {
    console.log("click open introduction")
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      this.projects = [];
      resolve("foo")
    })
  }

}
