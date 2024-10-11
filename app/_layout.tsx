import { Stack } from "expo-router";
import UploadProvider from '../providers/UploadProvider'
import ProfileProvider from '../providers/ProfileProvider'
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json'

Amplify.configure(amplifyconfig);

function RootLayout() {
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

// export default withAuthenticator(RootLayout);
export default RootLayout;
