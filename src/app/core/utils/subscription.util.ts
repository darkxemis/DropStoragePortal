import { Subscription } from "rxjs";

export class SubscriptionUtil {
    public static SafeUnsubscribe(subscription: Subscription) {
        if(subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
    }
}