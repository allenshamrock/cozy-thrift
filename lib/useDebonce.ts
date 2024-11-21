'use client'

import { useEffect,useState } from "react"
import {z} from "zod"

const valueSchema =z.coerce.string()
type valueType = z.infer<typeof valueSchema>

export default function useDebounce(value:valueType){
  const [debounceValue, setDebounceValue] = useState<string>(value);
  // Avoids triggering the search query on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 1000);

    // cleanup fn
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
}