import { redirect } from "next/navigation";

// The site is single-page now — the full work listing lives at "/#work".
// This redirect exists only so any old bookmark/link to /portfolio still
// lands somewhere correct instead of 404ing. Individual project pages
// (/portfolio/[slug]) are unaffected and remain real routes.
export default function PortfolioRedirect() {
  redirect("/#work");
}
