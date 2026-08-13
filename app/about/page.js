import { redirect } from "next/navigation";

// The site is single-page now — About lives at "/#studio". This redirect
// exists only so any old bookmark/link to /about still lands somewhere
// correct instead of 404ing.
export default function AboutRedirect() {
  redirect("/#studio");
}
