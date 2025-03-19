import style from '../../../styles/Navbar.module.css';

export default function NavBar({onOpen, onSearch}: any) {
    const handleSearchChange = (event: any) => {
        onSearch(event.target.value)
    }

    return (
        <div className={style.navbar}>
            <h3>Clients</h3>
            <input type="text" placeholder="Shearch" onChange={handleSearchChange} className={style.input_nav} />
            <button className={style.btn_add} onClick={onOpen}>Add Client</button>
        </div>
    )
}