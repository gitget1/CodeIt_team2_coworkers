import { FormField as FormFieldRoot } from './FormField';
import { FormFieldInput } from './FormFieldInput';
import { FormFieldLabel } from './FormFieldLabel';
import { FormFieldMessage } from './FormFieldMessage';

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Input: FormFieldInput,
  Message: FormFieldMessage,
});
