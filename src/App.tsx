import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import MainLayout from "./layout/MainLayout";
import WeatherDashboard from "./components/weather/WeatherDashboard";
import { ThemeProvider } from "./components/theme-provider";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainLayout>
            <WeatherDashboard />
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
