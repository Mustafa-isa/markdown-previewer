export const useLocalstorage = (key = "value") => {
  const setItem = value => {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };
  const getItem = () => {
    try {
      const result = window.localStorage.getItem(key);

      return result ? result : null;
    } catch (err) {
      console.log(err);
    }
  };
  return { setItem ,getItem };
};
