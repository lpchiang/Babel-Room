import apple from './assets/Apple.svg';
import facebook from './assets/Facebook.svg';
import google from './assets/Google.svg';
import linkedin from './assets/LinkedIn.svg';
import ClickableIcon from "./clickable-icon-type";

export const ThirdPartyIcons: ClickableIcon[] = [
    {
        key: 'apple',
        img: apple,
        alt: 'apple icon',
        url: new URL("https://www.apple.com/")
    },
    {
        key: 'google',
        img: google,
        alt: 'google icon',
        url: new URL("https://www.google.com/")
    },
    {
        key: 'facebook',
        img: facebook,
        alt: 'facebook icon',
        url: new URL("https://www.facebook.com/")
    },
    {
        key: 'linkedin',
        img: linkedin,
        alt: 'linkedin icon',
        url: new URL("https://www.linkedin.com/")
    }
 ];