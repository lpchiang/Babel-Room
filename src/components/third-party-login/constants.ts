import ClickableIcon from "./clickable-icon-type";
import apple from './assets/Apple.svg';
import facebook from './assets/Facebook.svg';
import google from './assets/Google.svg';
import linkedin from './assets/LinkedIn.svg';

const APPLE: ClickableIcon = {
    key: 'apple',
    img: apple,
    alt: 'apple icon',
    url: new URL("https://www.apple.com/")
};

const FACEBOOK: ClickableIcon = {
    key: 'facebook',
    img: facebook,
    alt: 'facebook icon',
    url: new URL("https://www.facebook.com/")
};

const GOOGLE: ClickableIcon = {
    key: 'google',
    img: google,
    alt: 'google icon',
    url: new URL("https://www.google.com/")
};

const LINKEDIN: ClickableIcon = {
    key: 'linkedin',
    img: linkedin,
    alt: 'linkedin icon',
    url: new URL("https://www.linkedin.com/")
}

export const ThirdPartyIcons: ClickableIcon[] = [APPLE, GOOGLE, FACEBOOK, LINKEDIN];