import { cn } from '@/shared/lib/cn';
import { BreadcrumbItem } from './breadcrumbItem';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';

type BreadcrumbData = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbData[];
  className?: string;
};

export default function Breadcrumb({ items, className }: Props) {
  return (
    <nav
      className={cn(
        'text-txt-primary flex items-center gap-2 text-[24px] font-bold whitespace-nowrap overflow-hidden',
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem label={item.label} href={item.href} readonly={isLast} />
            {!isLast && <span className="text-txt-primary"><IconArrowRight /></span>}
          </div>
        );
      })}
    </nav>
  );
}
