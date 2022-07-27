type genericDeviceType = {
    name: string,
    maxFuse: number
  }

  type genericDevicesType = {
    genericDeviceList: genericDeviceType[]
  }

export {
    genericDeviceType,
    genericDevicesType
}