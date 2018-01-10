import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Router } from '@angular/router'

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'

@Injectable()
export class UserService {
  public url:String;
  public identity;
  public token;
  constructor(private _http:Http,public _router:Router, public afAuth:AngularFireAuth){
    this.url = GLOBAL.urlApi;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          localStorage.setItem('identity', JSON.stringify(user))
      }
    })
  }

  delete(userdelete){
    return this._http.delete(this.url+'delete-user/'+userdelete._id)
        .map(res => res.json())
  }

  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'register', params, {headers: headers})
            .map(res => res.json())
  }


  signUp(user_to_login, gettoken = null){
    if (gettoken != null) {
        user_to_login.gettoken = gettoken;
    }

    let params = JSON.stringify(user_to_login);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'login', params, {headers: headers})
            .map(res => res.json())
  }

  login(proveedor:string){
    if (proveedor == 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(()=>{
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('identity', JSON.stringify(user))
            }
          })
            location.reload()
            this._router.navigate(['/config'])

        })
    } else if (proveedor === 'facebook') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(()=>{
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('identity', JSON.stringify(user))
            }
          })
            location.reload()
            this._router.navigate(['/config'])
        })
    }
  }


logOut(){
  this.afAuth.auth.signOut()
  this.identity = null
}
  getUser(){
      let user = JSON.parse(localStorage.getItem('user'))

          this.identity = user;

      return this.identity
  }


  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'))

    if (identity != 'undefined') {
        this.identity = identity;
    }

    return this.identity;
  }


getToken(){
  let token = localStorage.getItem('token');

  if (token != "undefined") {
      this.token = token;
  } else {
    this.token = null;
  }

  return this.token;
}

destroyProduct(product){
  return this._http.delete(this.url+'destroy-product/'+product)
        .map(res => res.json())
}

getProducts(id){
  return this._http.get(this.url+'getProducts/'+id)
      .map(res => res.json())
}

updateProducts(productUnique){
  let params = JSON.stringify(productUnique);
  let headers = new Headers({'Content-Type':'application/json'})

  return this._http.put(this.url+'update-product/'+productUnique._id, params, {headers:headers})
      .map(res => res.json())

}



destroyProducts(user){
  return this._http.delete(this.url+'remove-all/'+user)
      .map(res => res.json())
}


agregarProduct(products){
  let params = JSON.stringify(products)
  let headers = new Headers({'Content-Type':'application/json'})

  return this._http.post(this.url+'saveProducts', params, {headers: headers})
          .map(res => res.json())
}

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': this.getToken()
    });

    return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers})
            .map(res => res.json())
  }

}
