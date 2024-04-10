import React from "react";
import { Form } from "react-bootstrap";
interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput: React.FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormInput;
