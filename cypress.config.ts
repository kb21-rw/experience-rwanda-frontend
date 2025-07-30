import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env:{
    UI_BASE_URL: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
    },
  },
});
