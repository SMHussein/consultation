import { Toaster } from "react-hot-toast";

export default function ToasterLayout() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 5000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "white",
          color: "color-grey-700",
          textAlign: "center",
          lineHeight: "1.5",
        },
      }}
    />
  );
}
