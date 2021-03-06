import { Injectable } from '@angular/core';
import { URLSearchParams } from "@angular/http";
import {Http,Headers} from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';


//import * as _ from 'underscore';

//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  header;

  constructor(
    private http: Http,
    private router:Router) {
      this.header = new Headers({ "content-type": "application/json", "accept": "application/json, text/plain, */*"});
  }

  psPost2(url,params): Promise<String>{
    return new Promise((resolve,reject)=>{
      let self =this;
    	let loginMessage:string = "";
      let headers = new Headers({ "content-type": "application/json",
         "accept": "application/json, text/plain, */*"});
      if(url.includes('upload')){
        headers = new Headers();
        headers.set('Content-Type', undefined);
        //headers.set('Upload-Content-Type', params.type)
        this.http.post(environment.apiUrl+url,params,{withCredentials: true})
        .toPromise().then(
            data => {
              let response = JSON.parse(data["_body"]);
              if(response && response.is_IpBlocked && response.is_IpBlocked == "true"){
                throw new Error("countryBlocked:"+response.countryCode);
              }else{
                resolve (response);
              }
            }
          ).catch(e =>{
            if(e.message && e.message.includes("countryBlocked")){
              //self.logoutForceService.broadcastCountryBlockEvent(e.message.split(":")[1]);
            }else{
              if (e.status === 401) {
                //self.logoutForceService.broadcastForceLogout("");
              }else if(e.status === 504){
                console.log('504');
              }else{
                console.log('504');
                //emit a service, event
                if(url.includes("makeCCPayment") || url.includes("makeWalletPayment")){
                 // self.logoutForceService.broadcastTimeOutEvent("Transaction Timed Out");
                }
              }
            }
        });
     }else{
       headers = new Headers({ "content-type": "application/json",
      "accept": "application/json, text/plain, */*"});
      this.http.post(environment.apiUrl+url,params,{withCredentials: true,headers:headers})
      .toPromise().then(
          data => {
            let response = JSON.parse(data["_body"]);
            if(response && response.is_IpBlocked && response.is_IpBlocked == "true"){
              throw new Error("countryBlocked:"+response.countryCode);
            }else{
              resolve (response);
            }

          }
        ).catch(e =>{
          if(e.message && e.message.includes("countryBlocked")){
            //self.logoutForceService.broadcastCountryBlockEvent(e.message.split(":")[1]);
          }else{
            if (e.status === 401) {
              //self.logoutForceService.broadcastForceLogout("");
            }else if(e.status === 504){
              // console.log('504');
            }else{
              // console.log('504');
              //emit a service, event
              if(url.includes("makeCCPayment") || url.includes("makeWalletPayment")){
                //self.logoutForceService.broadcastTimeOutEvent("Transaction Timed Out");
              }
            }
          }
        });
     }
    })
  }
  psPost(url,params){
    let headers = new Headers({ "content-type": "application/json",
    "accept": "application/json"});
    return this.http.post(environment.apiUrl+url,params,{withCredentials: true}).pipe(map((res: Response) => JSON.parse(res["_body"])));
    // return new Promise((resolve,reject)=>{
    //   let self =this;
    // 	let loginMessage:string = "";
    //   let headers = new Headers({ "content-type": "application/json",
    //      "accept": "application/json, text/plain, */*"});
    //   if(url.includes('upload')){
    //     headers = new Headers();
    //     headers.set('Content-Type', undefined);
    //     //headers.set('Upload-Content-Type', params.type)
    //     this.http.post(environment.apiUrl+url,params,{withCredentials: true})
    //     .toPromise().then(
    //         data => {
    //           let response = JSON.parse(data["_body"]);
    //           if(response && response.is_IpBlocked && response.is_IpBlocked == "true"){
    //             throw new Error("countryBlocked:"+response.countryCode);
    //           }else{
    //             resolve (response);
    //           }
    //         }
    //       ).catch(e =>{
    //         if(e.message && e.message.includes("countryBlocked")){
    //           //self.logoutForceService.broadcastCountryBlockEvent(e.message.split(":")[1]);
    //         }else{
    //           if (e.status === 401) {
    //             //self.logoutForceService.broadcastForceLogout("");
    //           }else if(e.status === 504){
    //             console.log('504');
    //           }else{
    //             console.log('504');
    //             //emit a service, event
    //             if(url.includes("makeCCPayment") || url.includes("makeWalletPayment")){
    //              // self.logoutForceService.broadcastTimeOutEvent("Transaction Timed Out");
    //             }
    //           }
    //         }
    //     });
    //  }else{
    //    headers = new Headers({ "content-type": "application/json",
    //   "accept": "application/json, text/plain, */*"});
    //   this.http.post(environment.apiUrl+url,params,{withCredentials: true,headers:headers})
    //   .toPromise().then(
    //       data => {
    //         let response = JSON.parse(data["_body"]);
    //         if(response && response.is_IpBlocked && response.is_IpBlocked == "true"){
    //           throw new Error("countryBlocked:"+response.countryCode);
    //         }else{
    //           resolve (response);
    //         }

    //       }
    //     ).catch(e =>{
    //       if(e.message && e.message.includes("countryBlocked")){
    //         //self.logoutForceService.broadcastCountryBlockEvent(e.message.split(":")[1]);
    //       }else{
    //         if (e.status === 401) {
    //           //self.logoutForceService.broadcastForceLogout("");
    //         }else if(e.status === 504){
    //           // console.log('504');
    //         }else{
    //           // console.log('504');
    //           //emit a service, event
    //           if(url.includes("makeCCPayment") || url.includes("makeWalletPayment")){
    //             //self.logoutForceService.broadcastTimeOutEvent("Transaction Timed Out");
    //           }
    //         }
    //       }
    //     });
    //  }
    // })
  }
  psGet(url,searchParams): Observable<any>{
    // let headers = new Headers();
    // headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');

    // // Request methods you wish to allow
    // headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // headers.set('Access-Control-Allow-Credentials', 'true');

    return this.http.get(environment.apiUrl+url,{withCredentials: true,search:searchParams}).pipe(map((res: Response) => JSON.parse(res["_body"])));
  }
  postForm(url, body) {
    let headers = new Headers({  "content-type": "application/x-www-form-urlencoded"});
    return this.http.post(environment.apiUrl+url,body,{withCredentials: true,headers: headers }).pipe(map((res: Response) => JSON.parse(res["_body"])));
  }
  psGet2(searchParams,url): Promise<String>{
    return new Promise((resolve,reject)=>{
      let self =this;
      this.http.get(environment.apiUrl+url,{withCredentials: true,search:searchParams})
       .toPromise().then(
          data => {
            let response = JSON.parse(data["_body"]);
            if(response && response.is_IpBlocked && response.is_IpBlocked == "true"){

              throw new Error("countryBlocked:"+response.countryCode);
            }else{
              resolve (response);
            }
          }
        ).catch(e =>{
          if(e.message && e.message.includes("countryBlocked")){
            //self.logoutForceService.broadcastCountryBlockEvent(e.message.split(":")[1]);
          }else{
            if (e.status === 401) {
             // self.logoutForceService.broadcastForceLogout("");
            }else if (e.status === 404) {
              self.router.navigate(["/"]);
            }else if(e.status === 504){
              console.log('504');
            }else{
              console.log('504');
              //emit a service, event
              if(url.includes("makeCCPayment") || url.includes("makeWalletPayment")){
                //self.logoutForceService.broadcastTimeOutEvent("Transaction Timed Out")
              }
            }
          }
        });
    })
  }
  public addCustomer(customer: any){
    //return this.psPost("productname?itemname="+"abc",null);
    return this.psPost("customer",customer);
    //this.psPost("customer",customer);
  }
  public loginCustomer(customerDetails: any){
    return this.postForm("login",customerDetails);
  }
  public searchProduct(item:String){
    return this.psPost("productname?itemname="+item,null);
   // return this.psPost("productname?itemname="+item,null);
  }
  public registerProduct(product : any){
    return this.psPost("addproduct",product);
  }
  public searchProductList(item : String){
    return this.psPost("allproducts",null);
  }
  public getOwnerIds(){
    return this.psGet("getallowners",null);
  }
  public getProductOfOwner(ownerID: String){
    return this.psGet("getownerproducts",{"ownerID": ownerID});
  }
  public addasset(admin: any){
    return this.psPost("saveassets",admin);
  }
  public getasset(){
    return this.psGet("getassets",null);
  }
  public deleteAsset(id){
    return this.psPost("deleteasset?assetID="+id,null);
  }
  public getBanner(zoneId : String){
    return this.psGet("getbanner",{"zoneId": zoneId});
  }
  public getPromotion(zoneId : String){
    return this.psGet("getpromotion",{"zoneId": zoneId});
  }
  public getCorousel(zoneId : String){
    return this.psGet("getcorousel",{"zoneId": zoneId});
  }
  public getProductDetails(productId : String){
    return this.psGet("/product",{"id": productId});
  }
  public deleteProduct(productId : any[]){
    return this.psPost("/product",{"idList": productId});
  }
}
