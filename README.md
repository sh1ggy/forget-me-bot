# Forget Me Bot App


![kongi](https://img.shields.io/badge/kongi-purple?style=plastic) ![Year](https://img.shields.io/badge/Year-2022-red?style=plastic) ![Language](https://img.shields.io/badge/TypeScript-grey?style=plastic&logo=typescript) ![Framework](https://img.shields.io/badge/React-Native-grey?style=plastic&logo=react)

This is the front-end application for a hardware-focused project made as a part of the [2022 Arduino Hackathon](https://www.facebook.com/events/advanced-engineering-building/arduino-hackathon-2022/530645808276854/) hosted by RoboGals. The theme of the hackathon was **assistive technologies** so we decided to make a multi-sensory reminder application that attempted to use multiple pieces of hardware to trigger based on reminders that you set on the application. 

The main purpose of this application was to send over data to the ESP32 hardware module so that the peripherals we used could be scheduled in for reminders. The project was unsuccessful as interfacing with Bluetooth hardware was difficult with the limited time scope of the hackathon.  


## Libraries
- [RN Bluetooth Classic](https://github.com/kenjdavidson/react-native-bluetooth-classic), a simple Bluetooth component library to manage Bluetooth connections, used to send data between the application and the ESP32.

- [React Native Paper](https://callstack.github.io/react-native-paper/), a styling library used to style the application.

- [React Hook Form](https://react-hook-form.com/), a hook used for the forms submitted within the application. 



