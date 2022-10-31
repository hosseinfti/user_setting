import { Provider } from "react-redux";
import store from "../store/store";
import MyProvider from "../store/MyProvider";

function MyApp() {
  return (
    <Provider store={store}>
      <div>
        <MyProvider />
      </div>
    </Provider>
  );
}

export default MyApp;
