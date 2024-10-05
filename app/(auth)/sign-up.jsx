import { View, Text, ScrollView, Image } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {}

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                <Image
                    source={images.logo}
                    className="w-full h-[84px]"
                    resizeMode="contain"
                />

                <Text className="text-2xl text-white font-psemibold text-center mt-10">
                    Sign up to Aurora
                </Text>

                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(ev) => setForm({ ...form, username: ev })}
                    formFieldStyles="mt-10"
                />
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(ev) => setForm({ ...form, email: ev })}
                    formFieldStyles="mt-7"
                    keyboardType="email-address"
                />
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(ev) => setForm({ ...form, password: ev })}
                    formFieldStyles="mt-7"
                />

                <CustomButton 
                    title="Sign In"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />

                <View className="flex-row justify-center pt-5 gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                    Already have an account?
                    </Text>
                    <Link href="/sign-in" className="text-lg text-secondary-200 font-psemibold">Sign In</Link>
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp