import {useState} from 'react'

export default function useForm(initialFormData) {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (e) => {
    setFormData((p) => {
      p = { ...p };
      p[e.target.name] = e.target.value;
      return p;
    });
  };

  return [formData, setFormData, handleFormChange];
}
