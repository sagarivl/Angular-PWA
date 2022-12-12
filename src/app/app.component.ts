import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // readonly VAPID_PUBLIC_KEY =
  //   'BEKDXSi9kHj_NhF6Iz7-SwdlyNVBbXAPFO6NLnD--heLtL3SPlwAuG2szz9CEMJSOrNANjoiJyMaDXy6wN7cH3g'; // key generated with web-push
  readonly VAPID_PUBLIC_KEY =
    'BNsHGS8Qa4XDLifiNZblvrLSUKtgoI2emQn0kQRXvevHGOuNGFqyzaSSIH6M7MmwRYwP5gtsodkHXPYbYmXLivc';
  title = 'push-pwa';
  user: any = [];
  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    //check status of network
    addEventListener('online', online);
    function online(e) {
      alert('user is online');
    }
    //check status of network
    addEventListener('offline', offline);
    function offline(e) {
      alert('user is offline');
    }

    //push notification
    this.swPush.messages.subscribe((message) => console.log(message));

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });

    //api call
    this.api.getData().subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }
  //push notification
  pushNotification() {
    // this.swPush.notificationClicks.subscribe((x) => console.log('data', x));
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subcription) => {
        console.log('Send-- ', subcription);
        this.api.postSubscription(subcription).subscribe(
          (x) => console.log(x),
          (err) => console.log(err)
        );
      })
      .catch((err) => console.error('could not subscribe', err));
  }

  //background sync
  postSync() {
    let obj = {
      name: 'sagar data',
    };
    //api call
    this.http.post('http://localhost:3000/posts', obj).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.backgroundSync();

        //this.backgroundSync();
      }
    );
  }
  //background synch
  backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration: any) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }
}
