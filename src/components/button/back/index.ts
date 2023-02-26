import buttonBack from './index.hbs';

import IconArrowBackBlue from '../../../../static/icons/IconArrowBackBlue.svg';
import IconArrowBackLight from '../../../../static/icons/IconArrowBackLight.svg';

export default (
  { text, light, modifier }: { text: string, light: string, modifier: string }
) => buttonBack({
  IconArrowBackBlue, IconArrowBackLight, text, light, modifier
});
