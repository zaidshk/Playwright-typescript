// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "https://us-central1-ajar-dev.cloudfunctions.net/api/admin/automation/createUser?secret=Aj@rAutomat",
    params: {
      secret: "Aj@rAutomat"
    },
    extraHTTPHeaders: {
      'X-Automation-Key': "YXV0b21hdGlvbktleUAxMjMh"
    }
  }
});
