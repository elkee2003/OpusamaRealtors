import { Stack } from "expo-router";
import AuthProvider from "@/providers/AuthProvider";
import ProfileProvider from '@/providers/ProfileProvider';
import UploadProvider from '@/providers/UploadProvider';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json'

Amplify.configure(amplifyconfig);

function RootLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <UploadProvider>
          <Stack screenOptions={{
          headerShown:false
          }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </UploadProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default RootLayout;
