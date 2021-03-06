import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Food } from '../../module/item/item.module';

/**
 * Generated class for the FoodListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food-list',
  templateUrl: 'food-list.html',
})
export class FoodListPage {

  FoodList$:Observable<Food[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fooding: ServiceProvider) {
    this.FoodList$ = this.fooding
    .getFoodList()
    .snapshotChanges()
    .map(
      Change => {
        return Change.map(c=> ({
          key : c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodListPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.FoodList$ = this.fooding
    .getFoodList()
    .snapshotChanges()
    .map(
      Change => {
        return Change.map(c=> ({
          key : c.payload.key,
          ...c.payload.val(),
        }));
      });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 9000);   
     
  }

}
