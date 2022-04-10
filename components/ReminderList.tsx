import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import ActivationSwitch from './ActivationSwitch';
import { Reminder, Select } from '../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export type SaveReminderType = (index: number, reminder: Reminder) => void

function ReminderList(props: { reminder: Reminder, index: number, deleteReminders: (index: number) => void, saveReminder: SaveReminderType }) {
	const [title, setTitle] = useState<string>('')
	const [interval, setInterval] = useState<number>(0)
	const [startTime, setStartTime] = useState<number>(0)
	const [endTime, setEndTime] = useState<number>(0)
	const [activation, setActivation] = useState<boolean>(false)
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setActivation(!activation);
	const [select, onChangeSelect] = useState<Select>(Select.LED)


	useEffect(() => {
		setTitle(props.reminder.title)
		setInterval(props.reminder.interval)
		setStartTime(props.reminder.startTime)
		setEndTime(props.reminder.endTime)
		setActivation(props.reminder.activation)
		onChangeSelect(props.reminder.select)
	}, [props.reminder])

	// const saveReminder: SaveReminderType = ((index: number, title: string, interval: number, startTime: number, endTime: number, activation: boolean, select: string) => {
	// 	console.log(reminder)
	// 	props.saveReminder = { index, title, interval, startTime, endTime, activation, select }
	// })

	return (
		<>
			<List.Section
				style={{ backgroundColor: '#111111', padding: 20, borderRadius: 10 }}
				title=""
			>
				<List.Accordion
					style={styles.accordion}
					right={props => <List.Icon {...props} icon="reminder" />}
					title={title}
				>
					<View>
						<View style={{ flex: 1, flexDirection: "column" }}>
							<TextInput
								mode='outlined'
								onChangeText={text => setTitle(text)}
								value={title}
							></TextInput>
							<Text style={{ paddingBottom: "5%", paddingTop: "10%" }}>Time Between Intervals (Minutes)</Text>
							<TextInput
								mode='outlined'
								keyboardType={'numeric'}
								onChangeText={(text) => (parseInt(text) && setInterval(parseInt(text)))}
								value={interval.toString()}
							/>
							<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", paddingBottom: "5%", paddingTop: "10%" }}>
								<View style={{ flex: 1, flexDirection: "column" }}>
									<Text style={styles.timeLabel}>Start Time</Text>
									<TextInput
										mode='outlined'
										keyboardType={'numeric'}
										onChangeText={(text) => (parseInt(text) && setStartTime(parseInt(text)))}
										value={startTime.toString()}
									/>
									{/* <RNDateTimePicker mode="time" /> */}

								</View>
								<View style={{ flex: 1, flexDirection: "column" }}>
									<Text style={styles.timeLabel}>End Time</Text>
									<TextInput
										mode='outlined'
										keyboardType={'numeric'}
										onChangeText={(text) => (parseInt(text) && setEndTime(parseInt(text)))}
										value={endTime.toString()}
									/>
								</View>
							</View>
							<RNPickerSelect
								value={select}
								onValueChange={(selection) => onChangeSelect(selection)}
								items={[
									{ label: 'Blink', value: 1 },
									{ label: 'Shake', value: 2 },
									{ label: 'LCD', value: 3 },
								]}
							/>
						</View>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<ActivationSwitch activation={activation} toggleSwitch={onToggleSwitch} />
							<Button onPress={() => props.deleteReminders(props.index)}>Delete
							</Button>
							<Button onPress={() => {
								const reminder: Reminder = {
									title,
									interval,
									startTime,
									endTime,
									activation,
									select
								};
								props.saveReminder(props.index, reminder);
							}}>Save</Button>
						</View>
					</View>
				</List.Accordion>
			</List.Section>
		</>)

}
const styles = StyleSheet.create({
	select: {
		backgroundColor: '#161616'
	},
	accordion: {
		borderRadius: 10,
	},
	timeLabel: {
		paddingBottom: 10,
	},
})

export default ReminderList