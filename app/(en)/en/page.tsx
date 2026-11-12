import { HomePage } from "@/components/Home";
import { homeMeta } from "@/lib/meta";

export const metadata = homeMeta("en");

export default function Page() {
  return <HomePage l="en" />;
}
