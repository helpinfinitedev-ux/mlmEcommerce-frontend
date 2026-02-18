

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5001/api/wallet", // ✅ backend ke sath exact match
// });

// // 🟢 Attach token automatically
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // ✅ Sirf "token" use ho
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠️ No token found in localStorage!");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Wallet APIs

// // Get wallet details
// export const getWallet = async (userId) => {
//   try {
//     const res = await API.get(`/user/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ getWallet error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// // Get withdrawal history
// export const getWithdrawals = async (userId) => {
//   try {
//     const res = await API.get(`/withdrawals/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ getWithdrawals error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// // Submit withdrawal request (⚠️ userId body me bhejna hoga)
// export const requestWithdrawal = async (formData) => {
//   try {
//     const res = await API.post(`/withdraw`, formData); // ✅ backend ko sirf body me userId chahiye
//     return res.data;
//   } catch (err) {
//     console.error("❌ requestWithdrawal error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// export default {
//   getWallet,
//   getWithdrawals,
//   requestWithdrawal,
// };



import axios from "axios";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/wallet`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("⚠️ No token found in localStorage!");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const userWalletAPI = {
  getWallet: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ getWallet error:", error.response?.data || error.message);
      throw error;
    }
  },

  getWithdrawals: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/withdrawals/${userId}`, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ getWithdrawals error:", error.response?.data || error.message);
      throw error;
    }
  },

  requestWithdrawal: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/withdraw`, data, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ requestWithdrawal error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default userWalletAPI;
