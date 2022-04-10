import React, { useState } from "react";
import { Switch } from "react-native-paper"

function ActivationSwitch(props: {activation: boolean, toggleSwitch: any}) {
    return (
        <Switch
            color='#A576D4'
            value={props.activation}
            onValueChange={props.toggleSwitch}
        />
    )
}

export default ActivationSwitch