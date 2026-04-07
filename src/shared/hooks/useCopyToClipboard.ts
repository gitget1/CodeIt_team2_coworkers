import { useCallback } from 'react';
import { toast } from 'sonner';

type CopyToClipboardOptions = {
  successMessage: string;
  errorMessage: string;
  onSuccess?: () => void;
};

async function fallbackCopyText(text: string) {
  // Clipboard API를 사용할 수 없는 환경에서의 fallback.
  if (typeof document === 'undefined') {
    throw new Error('document_not_available');
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  // eslint-disable-next-line deprecation/deprecation
  const ok = document.execCommand?.('copy') ?? false;
  document.body.removeChild(textarea);

  if (!ok) throw new Error('copy_failed');
}

export function useCopyToClipboard() {
  const copyText = useCallback(
    async (text: string, options: CopyToClipboardOptions) => {
      if (!text) return false;

      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          await fallbackCopyText(text);
        }

        toast.success(options.successMessage);
        options.onSuccess?.();
        return true;
      } catch {
        toast.error(options.errorMessage);
        return false;
      }
    },
    [],
  );

  return { copyText };
}

