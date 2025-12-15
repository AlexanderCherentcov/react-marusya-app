import React from 'react';
import './Footer.scss';
import TelegramIcon from './icons/tg-icon.svg';
import YoutubeIcon from './icons/youTube-icon.svg';
import OkIcon from './icons/ok-icon.svg';
import VkIcon from './icons/vk-icon.svg';

const socialLinks = [
  { id: 1, href: 'https://m.vk.com/', label: 'ВКонтакте', icon: VkIcon },
  {
    id: 2,
    href: 'https://www.youtube.com',
    label: 'YouTube',
    icon: YoutubeIcon,
  },
  { id: 3, href: 'https://ok.ru/', label: 'Одноклассники', icon: OkIcon },
  {
    id: 4,
    href: 'https://web.telegram.org',
    label: 'Telegram',
    icon: TelegramIcon,
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <ul className="footer__list">
        {socialLinks.map(({ id, href, label, icon: Icon }) => (
          <li key={id} className="footer__item">
            <a
              href={href}
              aria-label={label}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="footer__icon" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
