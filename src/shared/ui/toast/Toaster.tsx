import { Toaster as SonnerToaster } from 'sonner';
import { IconAlert } from '@/shared/ui/icons/IconAlert';
import { IconCheck } from '@/shared/ui/icons/IconCheck';

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            '!rounded-[16px] px-4 py-3 flex items-center border-none shadow-lg h-[49px] text-[14px] md:h-[57px] md:text-[16px] flex !items-center gap-[10px]',
          content: '!flex-1',
          title: '!text-white !font-medium !text-[14px] md:!text-[16px] !text-center',
          error: '!bg-status-danger',
          success: '!bg-brand-primary',
          warning: '!bg-point-orange',
        },
      }}
      icons={{
        error: <IconAlert size={22} className="text-white" />,
        success: <IconCheck size={20} className="text-white" />,
        warning: <IconAlert size={22} className="text-white" />,
      }}
    />
  );
};
