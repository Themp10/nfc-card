
export const getData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  };
  
  
export  const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  


export const deleteData = (key) => {
    const storedData = localStorage.getItem(key);
    if(storedData){
      localStorage.removeItem(key);
    }

  };
  