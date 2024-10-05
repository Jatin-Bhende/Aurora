import { Redirect, router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { View, Text, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "../components/CustomButton"

import { images } from "../constants"

export default function App() {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{height: "100%"}}>
				<View className="w-full justify-center items-center h-full px-4">
					<Image
						source={images.logo}
						className="w-full h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>

					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with{" "}
							<Text className="text-secondary-200">Aurora</Text>
						</Text>

						<Image
							source={images.path}
							className="absolute -bottom-2 -right-8 w-[136px] h-[15px]"
							resizeMode="contain"
						/>
					</View>

					<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
						Where creativity meets innovation: embark on a journey of limitless exploration using Aurora
					</Text>

					<CustomButton
						title="Continue with Email"
						handlePress={() => router.push("/sign-in")}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}
