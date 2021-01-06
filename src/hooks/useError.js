import { useState } from "react";
import { capitalize } from "../helpers/stringValiation";

export default function useError() {
  const [errors, setErrors] = useState([]);

  const handleMissingField = (e) => {
    const msg = `${capitalize(e.target.name)} is missing.`;
    if (e.target.value.trim() === "") {
      setErrors((p) => {
        if (p.includes(msg)) {
          return p;
        } else {
          return [...p, msg];
        }
      });
    } else {
      if (errors.includes(msg)) {
        const newErrors = errors.filter((error) => error !== msg);
        setErrors(newErrors);
      }
    }
  };

  return [errors, setErrors, handleMissingField];
}
