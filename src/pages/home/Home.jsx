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

            <div className='owl-carousel'>
                PRETTY SLIDERS
            </div>

            <div className='new-products'>
                NEW PRODUCTS
            </div>
        </>
    )
}