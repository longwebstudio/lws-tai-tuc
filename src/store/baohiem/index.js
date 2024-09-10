// src/store/baohiem/index.js

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  namespaced: true, // Đảm bảo module có namespace để tránh xung đột tên
  state,
  getters,
  actions,
  mutations,
};
