export function Home() {
    const buttonList = ["Phones", "Tablets", "Laptops"]
    function renderHorizontalButton(buttonName) {
        return (
            <button key={buttonName}>
                {buttonName}
            </button>
        )
    }
    return (
        <>
            <h1>Welcome!</h1>

            <div className='list'>
                {buttonList.map(renderHorizontalButton)}
            </div>
        </>
    )
}