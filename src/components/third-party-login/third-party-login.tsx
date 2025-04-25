import ClickableIcon from './clickable-icon-type';
import { ThirdPartyIcons } from './constants';

const ThirdPartyLogin: React.FC = () => {
    return (
        <ul>
            {ThirdPartyIcons.map(({key, img, alt, url}: ClickableIcon) => (
                <li className='third-party-icons' key={key}>
                    <a href={url.href}>
                        <img src={img} alt={alt} />
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default ThirdPartyLogin;