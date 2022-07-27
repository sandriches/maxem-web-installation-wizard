import logo from './logo.svg';
import './App.css';
import GetMaxFuseValue from './components/GetMaxFuseValue';
import Authenticate from './components/auth/Authenticate';
import "bootstrap/dist/css/bootstrap.min.css";
import _ from 'lodash';
import * as React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import AuthContextProvider from './context/AuthContextProvider';
import AuthStatus from './components/auth/AuthStatus';
import DisplayValues from './components/DisplayValues';
import { RequireAuth, RequireNoAuth } from './components/auth/RequireAuth';
import deviceList from './deviceList';
import { genericDevicesType, genericDeviceType } from './types/IDevice';


function App(): JSX.Element {

  // Maintain a 0'd copy for resetting
  const originalDeviceList = _.cloneDeep(deviceList)

  const [homeGridMaxFuse, setHomeGridMaxFuse] = React.useState<number>(0);
  const [devices, setDevices] = React.useState<genericDevicesType>(_.cloneDeep(deviceList));
  const navigation = useNavigate();

  // Updates generic device list with data received from form input (child component)
  function handleSaveDeviceDetails(childDataObject: genericDeviceType): void {
    const newDevices: genericDeviceType[] = Object.assign(devices.genericDeviceList)
    let index = newDevices.findIndex(({name}) => name === childDataObject.name)
    newDevices[index] = childDataObject
    const newListOfDevices: genericDevicesType = {
      genericDeviceList: newDevices
    }
    setDevices(newListOfDevices)
  }

  // Simpler update for home grid (will always be present)
  function handleHomeGridMaxFuseCallback(childDataObject: genericDeviceType): void {
    setHomeGridMaxFuse(childDataObject.maxFuse);
  }

  // For authenticating a new device
  function resetValues(): void {
    setDevices(originalDeviceList);
    setHomeGridMaxFuse(0);
  }

  // Renders list of devices
  function renderDevices(): JSX.Element {
    return (<>
    {devices.genericDeviceList.map((device) => <GetMaxFuseValue navigate={navigation} parentCallback={handleSaveDeviceDetails} deviceName={device.name} key={device.name} />)}
    </>);
  }

  return (
    <AuthContextProvider resetValues={resetValues}>
      <h1>Maxem Device Installer Wizard</h1>
      <Routes>
        <Route element={
          <div>
          <AuthStatus />
          <DisplayValues homeGridMaxFuse={homeGridMaxFuse} genericDevices={devices} />
          <Outlet />
        </div>
        }
        >
          <Route
          path="/login"
          element={
          <RequireNoAuth>
            <Authenticate />
          </RequireNoAuth>
        }
        />
          <Route
            path="/"
            element={
              <>
              <RequireAuth>
              <GetMaxFuseValue navigate={navigation} parentCallback={handleHomeGridMaxFuseCallback} deviceName="Home Grid" />
              {renderDevices()}
              </RequireAuth>
              </>
              }
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}
export default App