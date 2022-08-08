import MenuDots from '../images/menu.svg';
import '../CSS/header.css';
import { ReactComponent as ArrowIcon } from '../images/arrow.svg';

const Header = ({ title, setOpenModal }) => {
	const Logoclick = e => {
		e.stopPropagation();

		setOpenModal();
	};

	return (
		<header>
			<nav className='nav'>
				<div
					className='title'
					onClick={e => Logoclick(e)}
					data-testid='buttonTest'>
					{title === 'Movie details' ? (
						<>
							<ArrowIcon className='arrow' /> {title}
						</>
					) : (
						title
					)}
				</div>
				<div className='menu'>
					<img src={MenuDots} alt='Menu Dots' className='menudots' />
				</div>
			</nav>
		</header>
	);
};

Header.defaultProps = {
	title: 'Pop Movies',
};

export default Header;
