import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <MainLayout>
            <Home />
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
