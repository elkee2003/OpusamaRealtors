import { Stack } from "expo-router";
import UploadProvider from '../providers/UploadProvider'

export default function RootLayout() {
  return (
    <UploadProvider>
      <Stack screenOptions={{
      headerShown:false
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </UploadProvider>
    
  );
}
