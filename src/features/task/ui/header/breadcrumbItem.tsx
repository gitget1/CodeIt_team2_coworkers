import Link from "next/link";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  readonly?: boolean;
}

export function BreadcrumbItem({ label, href, readonly }: BreadcrumbItemProps) {
  if (readonly || !href) {
    return <span className="text-txt-primary font-medium">{label}</span>;
  }

  return (
    <Link href={href} className="text-txt-secondary hover:underline">
      {label}
    </Link>
  );
}