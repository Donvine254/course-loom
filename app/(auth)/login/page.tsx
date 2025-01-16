import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              border: "none",
              backgroundColor: "#103FEF",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#2563eb",
              },
            },
          },
        }}
      />
    </div>
  );
}
