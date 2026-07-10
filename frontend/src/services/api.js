import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {

    const publicUrls = [
      "/auth/login/",
      "/auth/register/",
      "/auth/refresh/",
      "/health/",
    ];

    const url = config.url || "";

    const isPublic = publicUrls.some((publicUrl) =>
      url.endsWith(publicUrl)
    );

    if (!isPublic) {

      const token = localStorage.getItem("access");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    }

    return config;

  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;
    const url = originalRequest?.url || "";

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !url.includes("/auth/login/") &&
      !url.includes("/auth/register/") &&
      !url.includes("/auth/refresh/")
    ) {

      originalRequest._retry = true;

      try {

        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/auth/refresh/",
          {
            refresh,
          }
        );

        const newAccess = response.data.access;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.clear();

        window.location.href = "/login";

      }

    }

    return Promise.reject(error);

  }

);

export default api;