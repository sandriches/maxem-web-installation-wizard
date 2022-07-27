import React from "react";
import { genericDevicesType } from "../types/IDevice";

// Displays to the user the values entered. Values are saved to the controller when the form input is received
function DisplayValues({homeGridMaxFuse, genericDevices}: {homeGridMaxFuse: number, genericDevices: genericDevicesType}) {

    const listDevices = genericDevices.genericDeviceList.filter(device => device.maxFuse > 0).map(filteredName => {
        return <li>{filteredName.name} fuse value: {filteredName.maxFuse}</li>
    })

    return (
        <ul>
        {homeGridMaxFuse > 0 &&
        <li>
            Home grid max fuse value: {homeGridMaxFuse}
        </li>
        }
        {listDevices}
        </ul>
    )
}

export default DisplayValues