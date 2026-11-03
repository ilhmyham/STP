import { redirect } from "next/navigation";

export default function UserLoginPage() {
  redirect("/user/auth");
}
