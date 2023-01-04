import { Injectable } from '@angular/core';
import articlesList from "../../../../assets/copywrite/articles/articles.json"

@Injectable({
  providedIn: 'root'
})
export class GetArticlesService {

  constructor() { }

  getArticles(){
    return articlesList
  }

}
