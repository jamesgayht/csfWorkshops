import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  custName = ''
  param$!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
      // this.custName = this.activatedRoute.snapshot.params['custName'];
      // this.title.setTitle(`Customer ${this.custName}`)
      // subscribe to the changes 
      this.param$ = this.activatedRoute.params.subscribe(
        (params) => {
          console.info(">>> params = ", params)
          this.custName = params['custName']
          this.title.setTitle(`Customer ${this.custName}`)
        }
      )
  }

  ngOnDestroy(): void {
      console.info('++++ Customer component destroyed')
      this.param$.unsubscribe()
  }

}
