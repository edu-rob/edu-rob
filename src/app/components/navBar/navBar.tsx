import "./navBar.css";
import Link from "next/link";

interface NavBarItem {
    key: string,
    class: string,
    iconClass: string,
    redirectTo: string,
    // link: boolean,
    onClick: () => void
  }
  

export default function NavBar() {
    const leftNavBarItems: NavBarItem[] = [
        {
            key: "home",
            class: "bi-house-door-fill",
            iconClass: "HomeIcon",
            redirectTo: "/landing",
            onClick: () => {}
        }
    ]
    const rightNavBarItems: NavBarItem[] = [
        {
            key: "connect",
            class: "bi-gear-wide-connected",
            iconClass: "ConnectIcon",
            redirectTo: "/connect",
            onClick: () => {}
        }
    ]
    

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
    </div>
    )
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
  
