import { redirect } from "next/navigation";

// The site is single-page now — Contact lives at "/#contact". This redirect
// exists only so any old bookmark/link to /contact still lands somewhere
// correct instead of 404ing.
export default function ContactRedirect() {
  redirect("/#contact");
}
