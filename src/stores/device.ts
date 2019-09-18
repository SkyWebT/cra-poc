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

  async delete(deviceId: string) {
    await api.user.devices.delete(Auth.profileId, deviceId);
    runInAction(() => {
      const index = this.devices.findIndex(
        device => device.deviceId === deviceId
      );
      if (index > -1) {
        this.devices.splice(index, 1);
      }
    });
  }
}

const deviceStore = new DeviceStore();
export default deviceStore;
