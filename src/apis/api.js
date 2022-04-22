import axios from "axios";

const apiClient = axios.create();

const getExpenses = () =>  apiClient.get("/prod/expenses");

const deleteExpense = (body) =>  apiClient.delete("/prod/expenses/", {data: body});

const createExpenses = (body) =>  apiClient.put("/prod/expenses/", body);

const createRegsitration = (body) =>  apiClient.post("/register/", body);

const login = (body) =>  apiClient.post("/login/", {data: body});

export default {
  getExpenses,
  deleteExpense,
  createExpenses,
  login,
  createRegsitration,
};
