import React from 'react';
import { LandingFeature } from '../model/types';
import { cn } from '@/shared/lib/cn';
import Image from 'next/image';

interface LandingFeatureSectionProps {
  feature: LandingFeature;
  className?: string;
}

const formatText = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ));
};

export const LandingFeatureSection = ({ feature, className }: LandingFeatureSectionProps) => {
  const isPrimary = feature.theme === 'primary';
  const isImageRight = feature.imagePosition === 'right';
  const isTaskDetail = feature.id === 'taskDetail';

  return (
    <section
      className={cn(
        'w-full overflow-hidden px-6 py-24 lg:py-0',
        isPrimary ? 'bg-brand-primary pt-24 pb-0 text-white' : 'text-txt-primary bg-slate-50 py-24',
        isPrimary || isTaskDetail ? 'pt-24 pb-0' : 'py-24',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-360 flex-col justify-center gap-12 lg:min-h-200 lg:items-center lg:gap-18 xl:max-w-400',
          isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
        )}
      >
        <div
          className={cn(
            'flex w-full max-w-100 shrink-0 flex-col items-start text-left md:ml-8 xl:max-w-112.5',
            !isPrimary && 'lg:mt-40 lg:ml-15 lg:self-start',
          )}
        >
          <div
            className={cn(
              'relative',
              feature.id === 'kanban'
                ? 'h-7 w-7 md:h-10 md:w-10 lg:h-12 lg:w-12'
                : 'h-7 w-7 md:h-10 md:w-10',
            )}
          >
            <Image
              src={feature.icon}
              alt={`${feature.title} 아이콘`}
              fill
              className="object-contain"
            />
          </div>
          <h2
            className={cn(
              'mb-4 text-lg leading-normal font-bold md:text-2xl lg:text-3xl',
              isPrimary ? 'text-txt-inverse' : 'text-brand-primary',
            )}
          >
            {formatText(feature.title)}
          </h2>
          <p
            className={cn(
              'text-[12px] leading-relaxed md:text-[14px] lg:text-lg',
              isPrimary ? 'text-blue-100' : 'text-slate-400',
            )}
          >
            {formatText(feature.description)}
          </p>
        </div>

        <div
          className={cn(
            'relative flex w-full flex-1 justify-center lg:justify-end',
            isPrimary
              ? '-mr-6 w-[calc(100%+1.5rem)] justify-end self-end lg:mr-0 lg:w-full'
              : 'w-full justify-center lg:justify-end',
          )}
        >
          <Image
            src={feature.images.mobile}
            alt={feature.title.replace('\n', ' ')}
            width={1200}
            height={800}
            className="block h-auto w-full rounded-xl md:hidden"
            loading="lazy"
          />
          <Image
            src={feature.images.tablet}
            alt={feature.title.replace('\n', ' ')}
            width={1600}
            height={1200}
            className="hidden h-auto w-full rounded-xl md:block lg:hidden"
            loading="lazy"
          />
          <Image
            src={feature.images.desktop}
            alt={feature.title.replace('\n', ' ')}
            width={1000}
            height={800}
            className="hidden h-auto w-full lg:block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
