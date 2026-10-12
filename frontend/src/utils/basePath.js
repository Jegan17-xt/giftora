// Folder the app is served from ('' at the domain root). Set with VITE_BASE at build time.
const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '')

export default basePath
