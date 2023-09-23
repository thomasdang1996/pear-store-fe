import { useState } from "react"

export function ImageSlider() {
    const imageWidth = 1000

    const images = [
        "http://localhost:5173/slider-1.png",
        "http://localhost:5173/slider-3.png",
        "http://localhost:5173/slider-4.png",
        "http://localhost:5173/slider-2.png"
    ]

    const listWidth = imageWidth * images.length
    const [imageListStyle, setImageListStyle] = useState(
        {
            width: `${listWidth}px`,
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(${setImagePosition(0)}px)`,

        }
    )

    const imageContainerStyle = {
        width: `${imageWidth}px`,
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0
    }

    const dotListStyle={
        display: 'flex',
        alignItems: 'center',
    }

    function setImagePosition(imageIndex) {
        var imagePosition = imageIndex * imageWidth // relative position of the image
        var startOfTheList = listWidth / 2 // move to the left
        var imageCenter = imageWidth / 2 // center the image

        return startOfTheList - imageCenter - imagePosition
    }

    function toImageDom(imageUrl) {
        var imageIndex = images.indexOf(imageUrl)
        const imageStyle = {
            width: `${imageWidth}px`,
            height: '500px',
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: 'center',
            margin: 0,
            padding: 0
        }
        return (
            <div className="image" style={imageStyle} key={imageIndex}></div>
        )
    }

    function toDotDom(image) {
        var imageIndex = images.indexOf(image)
        const dotStyle = {
            border: "none",
            cursor: "pointer",
            background: "none",
            outline: "none",
            color: "var(--color)"
        }

        function switchImage(imageIndex) {
            setImageListStyle(
                currentListStyle => {
                    return {
                        ...currentListStyle,
                        transform: `translateX(${setImagePosition(imageIndex)}px)`
                    }
                }
            )
        }

        return (
            <>
                <button
                    className="slider-dots"
                    style={dotStyle}
                    key={imageIndex}
                    onClick={() => switchImage(imageIndex)}>
                    ⬤
                </button>
            </>
        )
    }

    return (
        <>
            <div className='image-container' style={imageContainerStyle}>
                <div className='imageList' style={imageListStyle}>
                    {images.map(toImageDom)}
                </div>
            </div>
            <div className='dotList' style={dotListStyle}>
                {images.map(toDotDom)}
            </div>
        </>
    )
}