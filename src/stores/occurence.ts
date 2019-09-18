import _uniq from 'lodash.uniqby';
import { observable, runInAction } from 'mobx';

import api from '../api';
import { T_Marketing_Product, T_Occurrence, T_SKU } from '../types';

class OccurenceStore {
  @observable occurences: T_Occurrence[] = [];
  @observable SKUs: T_SKU[] = [];
  @observable products: T_Marketing_Product[] = [];

  async fetch() {
    api.user.occurrences.get().then(data => {
      runInAction(() => {
        this.occurences = _uniq(data, 'serialNumber');
      });
    });
    api.cart.admin.translator().then(data => {
      runInAction(() => {
        this.SKUs = data;
      });
    });
    api.cart.admin.marketingProducts().then(data => {
      runInAction(() => {
        this.products = data;
      });
    });
  }
  getImage(code: string) {
    const sku = this.SKUs.find(
      sku =>
        sku.inboundIcomsCodes.length > 0 && sku.inboundIcomsCodes[0] === code
    );
    if (sku) {
      const product = this.products.find(p => p.sku === sku.sku);
      if (product) {
        return product.imageUrl;
      }
    }
  }
}

const occurenceStore = new OccurenceStore();
export default occurenceStore;
