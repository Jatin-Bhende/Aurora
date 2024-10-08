import { View, Text, TextInput, useAnimatedValue, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    formFieldStyles = "",
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <View className={`space-y-2 ${formFieldStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7b7b8d"}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6 my-auto" resizeMode="contain"/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField