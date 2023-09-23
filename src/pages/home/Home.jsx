import "../Pages.css"
import "../BreadCrumbNav.css"
import { ImageSlider } from "../../sliders/ImageSlider"
export function Home() {
    const containerStyle = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
    return (
        <div className='page'>
            <h1 className='title'>Welcome.</h1>
            <div style={containerStyle}>
                <ImageSlider />
            </div>

            <div className='new-products'>
                NEW PRODUCTS
            </div>
        </div>
    )
}