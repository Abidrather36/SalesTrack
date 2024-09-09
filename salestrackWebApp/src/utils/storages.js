class StorageHelper {
  setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  getItem = (key) => {
    return localStorage.getItem(key);
  };

  clearStorage = () => {
    localStorage.clear();
  };
  removeStorage = (key) => {
    localStorage.removeItem(key);
  };
}
const storage = new StorageHelper();
export default storage;
