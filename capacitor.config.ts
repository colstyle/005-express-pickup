import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aiprojects.express-pickup',
  appName: '快递取件码',
  webDir: 'out',
  server: { androidScheme: 'https' },
  android: { buildOptions: { releaseType: 'APK' } }
};

export default config;
