import { Provider } from "react-redux";
import store from "../store/store";
import MyProvider from "../store/MyProvider";

function MyApp() {
  return (
    <Provider store={store}>
      <MyProvider />
    </Provider>
  );
}

export default MyApp;
