import "./navBar.css";
import Link from "next/link";

interface Props {
    changeTheme: () => void,
    currentTheme: string,
  }  

interface NavBarItem {
    key: string,
    class: string,
    iconClass: string,
    redirectTo: string,
    // link: boolean,
    onClick: () => void
  }
  

export default function NavBar(props: Props) {
    const leftNavBarItems: NavBarItem[] = [
        {
            key: "home",
            class: "bi-house-door-fill",
            iconClass: "HomeIcon",
            redirectTo: "/",
            onClick: () => {}
        }
    ]
    const rightNavBarItems: NavBarItem[] = [
        {
            key: "connect",
            class: "bi-chat-left-text-fill",
            iconClass: "ConnectIcon",
            redirectTo: "/connect",
            onClick: () => {}
        }
    ]

    const toggleTheme = () => {
        props.changeTheme();
      }
    

    return (
    <div className="NavBarWrapper">
        <div className="NavBar">
            <MenuSection data={leftNavBarItems} />

            <Link className='NavBarTitle' href="/landing" style={{ textDecoration: 'inherit', color: 'inherit' }}>
                <h1 className='NavBarTitleText' style={{ fontSize: 'inherit' }}>
                    EduRob
                </h1>
            </Link>

            <MenuSection data={rightNavBarItems} />
        </div>    
        <div className='MenuCollapse' id='collapse-menu'>
            <div className='CollapseIconBar'>
                <button onClick={toggleTheme} className='ThemeToggle'>
                    Change Theme
                    {props.currentTheme === 'light' ? <LightIcon /> : <DarkIcon />}
                </button>
            </div>
        </div>
    </div>
    )
}

function DarkIcon() {
    return (
      <i className='bi-moon-fill ThemeIcon'></i>
    );
  }
  
  function LightIcon() {
    return (
      <i className='bi-brightness-high-fill ThemeIcon'></i>
    );
  }
  
  interface MenuProps {
    data: NavBarItem[],
  }
  


function MenuSection(props: MenuProps) {
    return (
        <div className='MenuSection'>
            {props.data.map((item: NavBarItem) => {
                return (
                <Link key={item.key} className='MenuButton' href={item.redirectTo}>
                <div className={item.iconClass + ' HeaderIcon'}>
                    <i className={item.class}></i>
                </div>
                </Link>
                )
            })}
        </div >
    );
  }
  
