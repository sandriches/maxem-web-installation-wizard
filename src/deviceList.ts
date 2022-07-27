import React from "react"
import { genericDevicesType } from "./types/IDevice"

const deviceNames = [
    {"name": "Heat Pump"},
    {"name": "Solar Panel"},
    {"name": "Charging Station"}
]

const deviceList: genericDevicesType = {genericDeviceList: deviceNames.map(obj => ({ ...obj, maxFuse: 0 }))}
export default deviceList