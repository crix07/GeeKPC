import { Injectable } from "@angular/core";
import { Http, Response, Headers  } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";

@Injectable()
export class AmazonService {
  public url:string;


  constructor(private http:Http){
    this.url = GLOBAL.urlApi;
  }

  similaresProduct(item){
    return this.http.get(this.url+'similares/'+item)
        .map(res => res.json());
  }

  SearchProduct(ident){
    return this.http.get(this.url+'searchone/'+ident)
        .map(res => res.json());
  }

  SearchProducts(keyword,pages){
    return this.http.get(this.url+'amazon/'+keyword+'/'+pages)
          .map(res => res.json())
  }

  getProducts(){
    return this.http.get(this.url+'getProduct')
      .map(res => res.json())
  }

  createProduct(products){
      let params = JSON.stringify(products);
      let headers = new Headers({'Content-Type':'application/json'});

      return this.http.post(this.url+'saveProduct', params, {headers: headers})
              .map(res => res.json())
  }

}
