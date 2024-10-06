import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const submit = async () => {
    if(!form.email || !form.password) {
        Alert.alert("Error", "Please fill all the fields")
        return
    }

    setIsSubmitting(true)
    try {
        await signIn(form.email, form.password)

        const result = await getCurrentUser()
        setUser(result)
        setIsLoggedIn(true)

        Alert.alert("Success", "Sign in successful")
        router.replace("/home")
    } catch (error) {
        Alert.alert("Error", error.message)
    } finally {
        setIsSubmitting(false)
    }
  }

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
            Log in to Aurora
          </Text>

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
            keyboardType="email-address"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg text-secondary-200 font-psemibold">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn