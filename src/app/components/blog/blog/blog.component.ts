import { Component, OnInit } from '@angular/core';
import { GetArticlesService } from '../services/get-articles.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private articlesService: GetArticlesService) { }

  ngOnInit(): void {
    console.log(this.articlesService.getArticles())
  }

}
