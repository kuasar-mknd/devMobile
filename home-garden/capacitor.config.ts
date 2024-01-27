import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'xyz.kuasar.homegarden',
  appName: 'HomeGarden',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
