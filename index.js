/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { Provider } from 'react-native-paper';
import {name as appName} from './app.json';

export default function Main() {
    return (
        <Provider>
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
