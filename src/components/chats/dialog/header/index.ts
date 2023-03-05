import chatsDialogHeader from './index.hbs';

import IconDots from '../../../../../static/icons/IconDots.svg';

export default (
  { imageSrc, firstName, secondName }: { imageSrc: string, firstName: string, secondName: string}
) => chatsDialogHeader({
  IconDots, imageSrc, firstName, secondName
});
