import { Provider } from "react-redux";
import { store } from "@/store/store";
import Test from "@/components/Test";

function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Test />
      </div>
    </Provider>
  );
}

export default App;
