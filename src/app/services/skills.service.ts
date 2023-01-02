import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  getSkills() {
    return [
      {
        id: 0,
        name: 'javascript',
      },
      {
        id: 1,
        name: 'angular',
      },
      {
        id: 2,
        name: 'css3',
      },

      {
        id: 3,
        name: 'd3js',
      },

      {
        id: 4,
        name: 'typescript',
      },

      {
        id: 5,
        name: 'greensock',
      },

      {
        id: 6,
        name: 'html',
      },

      {
        id: 7,
        name: 'rxjs',
      },

      {
        id: 8,
        name: 'github',
      },
      {
        id: 9,
        name: 'react',
      }
    ];
  }
}
