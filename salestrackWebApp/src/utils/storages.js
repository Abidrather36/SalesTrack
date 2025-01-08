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
// class StorageHelper {
//   setItem = (key, value, expireInMinutes = null) => {
//     const item = {
//       value,
//       expiry: expireInMinutes ? new Date().getTime() + expireInMinutes * 60 * 1000 : null,
//     };
//     localStorage.setItem(key, JSON.stringify(item));
//   };

//   getItem = (key) => {
//     const itemStr = localStorage.getItem(key);
//     if (!itemStr) return null;

//     const item = JSON.parse(itemStr);
//     if (item.expiry && new Date().getTime() > item.expiry) {
//       localStorage.removeItem(key);
//       return null; 
//     }

//     return item.value;
//   };

//   clearStorage = () => {
//     localStorage.clear();
//   };

//   removeStorage = (key) => {
//     localStorage.removeItem(key);
//   };
// }
// const storage = new StorageHelper();
// export default storage;

