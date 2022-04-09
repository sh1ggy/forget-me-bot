/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { Button, FAB, List, TextInput, Switch } from 'react-native-paper';

interface Reminder {
	title: string,
	interval: number,
	startTime: number,
	endTime: number,
	activation: boolean,
}

var reminders: Array<Reminder> = [
	{
		title: "title",
		interval: 20,
		startTime: 100,
		endTime: 100,
		activation: false,
	},
	{
		title: "title2",
		interval: 10,
		startTime: 200,
		endTime: 200,
		activation: true,
	}
]

const App = () => {
	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic">
				{reminders.map((reminder, index) => {
					const [isSwitchOn, setIsSwitchOn] = React.useState(reminder.activation);
					const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
					return (
						<>
							<List.Section 
								style={{backgroundColor:'#111111', padding: 20, borderRadius: 10}}
								title="">
								<List.Accordion
									style={styles.accordion}
									right={props => <List.Icon {...props} icon="reminder" />}
									title={reminder.title}>
									<View>
										<View style={{ flex: 1, flexDirection: "column" }}>
											<Text style={{ paddingBottom: "5%", paddingTop: "10%" }}>Time Between Intervals</Text>
											<TextInput>{reminder.interval}</TextInput>
											<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", paddingBottom: "5%", paddingTop: "10%" }}>
												<View style={{ flex: 1, flexDirection: "column" }}>
													<Text style={styles.timeLabel}>Start Time</Text>
													<TextInput>{reminder.startTime}</TextInput>
												</View>
												<View style={{ flex: 1, flexDirection: "column" }}>
													<Text style={styles.timeLabel}>Start Time</Text>
													<TextInput>{reminder.endTime}</TextInput>
												</View>
											</View>
										</View>
										<View style={{ flex: 1, flexDirection: "row" }}>
											<Switch
												color='#A576D4'
												value={isSwitchOn}
												onValueChange={onToggleSwitch}
											/>
											<Button onPress={() => {
												reminders.splice(1, index)
											}}>Delete</Button>
											<Button>Save</Button>
										</View>
									</View>
								</List.Accordion>
							</List.Section>
						</>
					)
				})}
			</ScrollView>
			<View style={styles.fabContainer}>
				<FAB
					style={styles.fab}
					icon='plus'
				/>
			</View>
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
	accordion: {
		borderRadius: 10,
		// backgroundColor: 'red',
	},
	fabContainer: {
		flex: 1,
		alignItems: 'center'
	},
	timeLabel: {
		paddingBottom: 10,
	},
	fab: {
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 20,
		bottom: 0,
		backgroundColor: 'red'
	},
})
export default App;
