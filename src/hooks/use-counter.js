import { useEffect, useState } from "react";

const useCounter = (add=true) =>
{
    const [counter, setCounter] = useState(0);
    useEffect(() =>
    {
      const interval = setInterval(() =>
      {
        if(add) setCounter((prevCounter) => prevCounter + 1);
        else setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [])

    return counter
}

export default useCounter