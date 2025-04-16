import ClickableIcon from '../types/ClickableIcon';
import APPLE from '../constants/apple/apple';
import GOOGLE from '../constants/google/google';
import FACEBOOK from '../constants/facebook/facebook';
import LINKEDIN from '../constants/linkedin/linkedin';

const ThirdPartyIcons: ClickableIcon[] = [APPLE, GOOGLE, FACEBOOK, LINKEDIN];

const ThirdPartyLogin: React.FC = () => {
    return (
        <ul>
            {ThirdPartyIcons.map(({img, url}) => (
                <li className='third-party-icons'>
                    <a href={url.href}>
                        <img src={img} alt=""/>
                    </a>
                </li>
            ))
            }
        </ul>
    )
}

export default ThirdPartyLogin;