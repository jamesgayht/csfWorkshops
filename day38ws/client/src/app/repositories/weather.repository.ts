import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import Dexie from "dexie";
import { Observable } from "rxjs";
import { CanLeave, City, Weather } from "../models/models";

@Injectable()
export class WeatherRepository extends Dexie 
// implements CanActivate, CanDeactivate<CanLeave> 
{

    // variable to hold the table
    cities!: Dexie.Table<City, number>
    // canLogin = true 

    constructor(private router: Router) {
        // name of the database
        super('citiesdb')
        this.version(1).stores({
            // cities table with city as the PK
            cities: '++id' 
        })
        this.cities = this.table('cities')
    }

    addCity(city: City): Promise<number> {
        return this.cities.add(city)
    }

    getAllCities(): Promise<City[]> {
        return this.cities.toArray()
    }
    
    // canDeactivate(component: CanLeave, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //     if(!component.canLeave()) {
    //         return true
    //     }
    //     return prompt('Type YES to exit') == "YES"
    // }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //     if(this.canLogin) {
    //         console.info(">>> activating repo <<<")
    //         return true
    //     }
        
    //     console.info(">>> returning router url <<<")
    //     return this.router.parseUrl('/')
    // }


}