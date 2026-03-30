import Link from 'next/link';
import { cn } from '@/shared/lib/cn';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: Props) {
  return (
    <nav className={cn('text-txt-secondary flex items-center gap-2 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && 'text-txt-primary font-medium')}>{item.label}</span>
            )}

            {!isLast && <span className="text-txt-tertiary">{'>'}</span>}
          </div>
        );
      })}
    </nav>
  );
}
