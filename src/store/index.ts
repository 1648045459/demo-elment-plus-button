import user from "./modules/user";
import getters from "./getters";
import { createStore, createLogger } from "vuex";
export interface State {
  [key: string]: any;
}
const store = createStore<State>({
  modules: {
    user
  },
  getters,
  strict: true,
  plugins: [createLogger()]
});

export default store;
