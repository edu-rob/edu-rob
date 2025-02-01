

export default function NavBar() {
return (
<div className="navBar">
    <div className="navBar__logo">
        <img src="../../../public/vercel.svg" alt="logo" />
    </div>
    <div className="navBar__links">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </div>
</div>
)
}

