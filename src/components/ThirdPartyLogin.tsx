import ClickableIcon from '../types/ClickableIcon';
import APPLE from '../constants/apple/apple';
import GOOGLE from '../constants/google/google';
import FACEBOOK from '../constants/facebook/facebook';
import LINKEDIN from '../constants/linkedin/linkedin';

const ClickableIcons: ClickableIcon[] = [APPLE, GOOGLE, FACEBOOK, LINKEDIN];

const ThirdPartyLogin: React.FC = () => {
    return (
        <ul>
            {ClickableIcons.map((item) => (
                <li className='third-party-icons'>
                    <a href={item.url.href}>
                        <img src={item.img} alt=""/>
                    </a>
                </li>
            ))
            }
        </ul>
    )
}

export default ThirdPartyLogin;