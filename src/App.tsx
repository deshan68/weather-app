import { Provider } from "react-redux";
import { store } from "@/store/store";
import MainLayout from "./layout/MainLayout";
import WeatherDashboard from "./components/weather/WeatherDashboard";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout>
          <WeatherDashboard />
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
