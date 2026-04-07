import { ReactNode } from 'react';

export function DateGroup({ dateHeader, children }: { dateHeader: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center py-2">
        <div className="border-brand-secondary grow border-t-2"></div>
        <span className="text-txt-default mx-4 text-lg font-medium">{dateHeader}</span>
        <div className="border-brand-secondary grow border-t-2"></div>
      </div>

      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}
