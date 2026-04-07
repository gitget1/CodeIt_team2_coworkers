import Link from "next/link";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  readonly?: boolean;
}

export function BreadcrumbItem({ label, href, readonly }: BreadcrumbItemProps) {
  if (readonly || !href) {
    return (
      <span
        className="text-brand-primary shrink-0 font-bold"
        aria-current="page"
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="text-txt-primary hover:text-interaction-hover transition-colors hover:underline"
    >
      {label}
    </Link>
  );
}