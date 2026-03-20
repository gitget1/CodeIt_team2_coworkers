import React from 'react';
import { cn } from '@/shared/lib/cn';
import Image from 'next/image';
import { LandingFeature } from './LandingContainer';

interface LandingFeatureSectionProps {
  feature: LandingFeature;
  className?: string;
}

export const LandingFeatureSection = ({ feature, className }: LandingFeatureSectionProps) => {
  const isPrimary = feature.theme === 'primary';
  const isLargeIcon = feature.isLargeIcon;
  const isImageAlignBottom = feature.imageAlignBottom;

  const sectionClasses = cn(
    'group w-full overflow-hidden px-6 lg:py-0',
    isPrimary ? 'bg-brand-primary text-white' : 'text-txt-primary bg-slate-50',
    isImageAlignBottom ? 'pt-24 pb-0' : 'py-24',
    className,
  );

  const containerClasses = cn(
    'mx-auto flex w-full max-w-360 flex-col justify-center gap-12 lg:min-h-200 lg:items-center lg:gap-18 xl:max-w-400',
    'group-even:lg:flex-row lg:flex-row-reverse',
  );

  const textWrapperClasses = cn(
    'flex w-full max-w-100 shrink-0 flex-col items-start text-left md:ml-8 xl:max-w-112.5',
    !isPrimary && 'lg:mt-40 lg:ml-15 lg:self-start',
  );

  const iconClasses = cn(
    'relative',
    isLargeIcon ? 'h-7 w-7 md:h-10 md:w-10 lg:h-12 lg:w-12' : 'h-7 w-7 md:h-10 md:w-10',
  );

  const imageWrapperClasses = cn(
    'relative flex flex-1',
    isImageAlignBottom
      ? 'w-[calc(100%_+_1.5rem)] -mr-6 justify-end self-end lg:m-0 lg:w-full'
      : 'w-full justify-center lg:justify-end',
  );

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        <div className={textWrapperClasses}>
          <div className={iconClasses}>
            <Image
              src={feature.icon}
              alt={`${feature.titleLines[0]} 아이콘`}
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
            {feature.titleLines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== feature.titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p
            className={cn(
              'text-[12px] leading-relaxed md:text-[14px] lg:text-lg',
              isPrimary ? 'text-blue-100' : 'text-slate-400',
            )}
          >
            {feature.descriptionLines.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== feature.descriptionLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className={imageWrapperClasses}>
          <Image
            src={feature.images.mobile}
            alt="mobile feature"
            width={1200}
            height={800}
            className="block h-auto w-full rounded-xl md:hidden"
            loading="lazy"
          />
          <Image
            src={feature.images.tablet}
            alt="tablet feature"
            width={1600}
            height={1200}
            className="hidden h-auto w-full rounded-xl md:block lg:hidden"
            loading="lazy"
          />
          <Image
            src={feature.images.desktop}
            alt="desktop feature"
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
