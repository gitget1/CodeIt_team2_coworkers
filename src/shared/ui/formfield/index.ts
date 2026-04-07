import { FormField as FormFieldRoot } from './FormField';
import { FormFieldControl } from './FormFieldControl';
import { FormFieldLabel } from './FormFieldLabel';
import { FormFieldMessage } from './FormFieldMessage';

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Message: FormFieldMessage,
});
