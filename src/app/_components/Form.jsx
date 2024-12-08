"use client";
import { toast } from "react-hot-toast";
import Button from "./Button";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

export default function Form({ inputs, action, shouldMail = false }) {
  const t = useTranslations("Buttons");
  const [formState, formAction] = useActionState(action, {});

  const sendEmail = async (name, email, message, phone) => {
    try {
      const emailParams = {
        name,
        phone,
        email,
        message,
      };

      if (!name || !phone || !email || !message) return;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        emailParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error("Failed to send message. Please try again later.", error);
    }
  };

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
    }
    if (formState.success) {
      toast.success(formState.success);
    }
  }, [formState]);

  const submitAction = (data) => {
    const email = data.get("email");
    const name = data.get("name");
    const phone = data.get("phone");
    const message = data.get("message");

    formAction(data);
    sendEmail(name, email, message, phone);
  };

  return (
    <form
      action={shouldMail ? submitAction : formAction}
      className="text-primary-200 flex flex-col gap-6 w-full border shadow-sm p-4 rounded-md"
    >
      {inputs.map((input, i) => (
        <FormItem {...input} key={i} />
      ))}
      <Button
        variation="secondary"
        type="submit"
        className="self-start bg-primary-150"
      >
        {t("submit")}
      </Button>
    </form>
  );
}

function FormItem({ id, type, required }) {
  const t = useTranslations("Form");

  const element =
    id !== "message" ? (
      <input
        className="p-2 border border-accent-50"
        id={id}
        type={type}
        name={id}
        required={required}
      />
    ) : (
      <textarea
        className="p-2 border border-accent-50"
        rows={10}
        id={id}
        type={type}
        name={id}
        required={required}
      />
    );

  const dynamicLabel = t(`${id}`);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        {dynamicLabel} {required && <span className="text-red-500">*</span>}
      </label>
      {element}
    </div>
  );
}
