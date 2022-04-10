/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 */

import React, { useEffect, useState } from 'react';
export enum Select {
	LED = 0,
	Shake = 1,
	LCD = 2,
}
export interface Reminder {
	title: string,
	interval: number,
	startTime: number,
	endTime: number,
	activation: boolean,
	select: Select,
}
import ReminderList, { SaveReminderType } from './components/ReminderList';
import {
	PermissionsAndroid,
	SafeAreaView,
	ScrollView,
	StyleSheet, View
} from 'react-native';
import { Button, FAB } from 'react-native-paper';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { Buffer } from 'buffer';
const ESP_ADDRESS = "EC:94:CB:52:9C:26";
const INT_SIZE = 4;

const App = () => {
	const requestAccessFineLocationPermission = async () => {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
			{
				title: 'Access fine location required for discovery',
				message:
					'In order to perform discovery, you must enable/allow ' +
					'fine location access.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			}
		);
		return granted === PermissionsAndroid.RESULTS.GRANTED;
	};

	const [esb32, setDevice] = useState<BluetoothDevice>()

	useEffect(() => {
		async function getBonded() {
			let bonded = await RNBluetoothClassic.getBondedDevices()
			bonded = bonded.filter((device) => (device.address == ESP_ADDRESS))
			setDevice(bonded[0])
		}
		getBonded()
	}, [])

	async function bufferCreate(bNumber: number) {
		let b = Buffer.allocUnsafe(INT_SIZE)
		b.writeInt32LE(bNumber)
		return b
	}

	async function writeWithDelimiter(data: any, delimiter: string) {
		await esb32?.write(data)
		await esb32?.write(delimiter)
	}

	async function syncRemindersOnPress() {
		let granted = await requestAccessFineLocationPermission()

		await esb32?.connect()
		console.log(esb32)

		await esb32?.write('!')
		
		for await (const reminder of reminders) {
			const timestamp = await bufferCreate(Date.now())
			await esb32?.write(timestamp)
			await esb32?.write('-')
			console.log(timestamp)
			
			// const reminderPacket =`!${reminders[i].title},${reminders[i].interval},${reminders[i].startTime},${reminders[i].endTime},${reminders[i].select}|`
			// const reminderPacket =`${reminders[i].title},${reminders[i].interval},${reminders[i].startTime},${reminders[i].endTime}|`
			// await esb32?.write(reminderPacket)
		
			writeWithDelimiter(reminder.title, ',')
			writeWithDelimiter(reminder.interval, ',')
			writeWithDelimiter(reminder.startTime, ',')
			writeWithDelimiter(reminder.endTime, ',')
			writeWithDelimiter(reminder.activation, '|')
			// writeWithDelimiter(reminder.select, ',')

		}
		// let data = base64.encode(remindersString)
		// data += "what in the fuck \0do you mean by that"
		// await esb32.write(data)
		await esb32?.disconnect()
	}

	const [reminders, setReminders] = useState<Array<Reminder>>(
		[{
			title: "title",
			interval: 20,
			startTime: 100,
			endTime: 100,
			activation: false,
			select: Select.LED
		}]
	)

	function deleteOnPress(index: number) {
		const newReminders = [...reminders]
		newReminders.splice(index, 1)
		setReminders(newReminders)
	}

	const saveOnPress: SaveReminderType = ((i, r) => {
		console.log(...reminders);

		const newReminders = [...reminders];
		newReminders.splice(i, 1, r);
		setReminders(newReminders);
	})

	function addOnPress() {
		const reminder: Reminder = {
			title: "Insert title here",
			interval: 0,
			startTime: 0,
			endTime: 0,
			activation: false,
			select: Select.LED
		}
		if (reminders.length < 10) {
			const newReminders = [...reminders, reminder]
			setReminders(newReminders)
		}
	}

	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic">
				{
					reminders.map((reminder, index) => {
						return (
							<ReminderList key={index} reminder={reminder} index={index} deleteReminders={deleteOnPress} saveReminder={saveOnPress} />
						)
					})
				}
			</ScrollView>
			<View style={styles.fabContainer}>
				<FAB
					onPress={addOnPress}
					style={styles.fab}
					icon='plus'
				/>
			</View>
			<Button
				onPress={syncRemindersOnPress}
				style={styles.syncButton}
			>Sync
			</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	fabContainer: {
		flex: 1,
		alignItems: 'center'
	},
	fab: {
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 20,
		bottom: 0,
		backgroundColor: '#9463C3'
	},
	syncButton: {
		backgroundColor: '#161616',
		padding: 10,
		marginBottom: 20,
	}
})

export default App;
