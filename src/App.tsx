import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import MainLayout from "./layout/MainLayout";
import WeatherDashboard from "./components/Home";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <MainLayout>
            <WeatherDashboard />
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
