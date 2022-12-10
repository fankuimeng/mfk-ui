import reactifyWebComponent from '@mfk-ui/core';
import './global-css';

import MfkButton from './Button/index';

const Button = reactifyWebComponent(MfkButton as any);
console.log(Button);

export { MfkButton, Button };
