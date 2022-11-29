import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderService } from "src/app/core/services/loader.service";
import { SubscriptionUtil } from "src/app/core/utils/subscription.util";


@Component({
    selector: 'fr-loader',
    templateUrl: './loader.component.html',
  })
  export class LoaderComponent implements OnInit, OnDestroy {
  
    private loaderSubscription: Subscription;
   isLoading: boolean = false; 

    constructor(private loaderService: LoaderService) { }
  
    ngOnInit(): void { 
        this.loaderService.isLoading.subscribe(async (isLoading: boolean) => {
            this.isLoading = isLoading;
        })
    }
  
    ngOnDestroy(): void {
        SubscriptionUtil.SafeUnsubscribe(this.loaderSubscription);
    }

  }