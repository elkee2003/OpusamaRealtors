import { Stack } from "expo-router";
import UploadProvider from '../providers/UploadProvider'
import ProfileProvider from '../providers/ProfileProvider'

export default function RootLayout() {
  return (
    <ProfileProvider>
      <UploadProvider>
        <Stack screenOptions={{
        headerShown:false
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </UploadProvider>
    </ProfileProvider>
    
  );
}
