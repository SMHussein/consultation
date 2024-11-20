import Button from "./Button";

const inputs = [
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "firstName", label: "First Name", type: "text", required: true },
  { id: "lastName", label: "Last Name", type: "text", required: true },
];

export default function Form() {
  return (
    <form className="text-primary-200 flex flex-col gap-6">
      {inputs.map((input) => (
        <FormItem {...input} />
      ))}
      <Button
        variation="secondary"
        type="submit"
        className="self-start bg-primary-150"
      >
        Submit
      </Button>
    </form>
  );
}

function FormItem({ id, label, type, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="p-2 rounded-md"
        id={id}
        type={type}
        name={id}
        required={required}
      />
    </div>
  );
}
