import { observable, runInAction } from 'mobx';

import api from '../api';
import { T_Device } from '../types';
import Auth from './auth';

class DeviceStore {
  @observable devices: T_Device[] = [];

  async fetch() {
    const data = await api.user.devices.get();
    runInAction(() => {
      this.devices = data;
    });
  }
  async update(deviceId: string, payload: Partial<T_Device>) {
    await api.user.devices.update(Auth.profileId, deviceId, payload);
    runInAction(() => {
      this.devices.forEach((device, index) => {
        if (device.deviceId === deviceId) {
          this.devices[index] = { ...this.devices[index], ...payload };
        }
      });
    });
  }
}

const deviceStore = new DeviceStore();
export default deviceStore
