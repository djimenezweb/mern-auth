export let API_URL: string;

if (import.meta.env.PROD) {
  API_URL = import.meta.env.VITE_PROD_API_URL;
} else {
  API_URL = import.meta.env.VITE_DEV_API_URL;
}
