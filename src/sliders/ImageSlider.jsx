import { useEffect, useState } from "react"

export function ImageSlider() {
    const imageWidth = 1000

    const images = [
        "http://localhost:5173/slider-1.png",
        "http://localhost:5173/slider-3.png",
        "http://localhost:5173/slider-4.png",
        "http://localhost:5173/slider-2.png"
    ]

    const listWidth = imageWidth * images.length
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageListStyle, setImageListStyle] = useState(
        {
            width: `${listWidth}px`,
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(${setImagePosition(currentImageIndex)}px)`
        }
    )

    useEffect(
        () => setImageListStyle(
            currentListStyle => {
                return {
                    ...currentListStyle,
                    transform: `translateX(${setImagePosition(currentImageIndex)}px)`
                }
            }
        ), [currentImageIndex]
    )

    const buttonStyle = {
        border: "none",
        cursor: "pointer",
        background: "none",
        outline: "none",
        color: "var(--color)"
    }

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

    const dotListStyle = {
        display: 'flex',
        alignItems: 'center',
    }

    function setImagePosition(imageIndex) {
        var imagePosition = imageIndex * imageWidth // relative position of the image
        var startOfTheList = listWidth / 2 // move to the left
        var imageCenter = imageWidth / 2 // center the image

        return startOfTheList - imageCenter - imagePosition
    }

    function switchImage(imageIndex) {
        var index
        if (imageIndex < 0) {
            index = images.length - 1
        } else if (imageIndex > images.length - 1) {
            index = 0
        } else {
            index = imageIndex
        }
        setCurrentImageIndex(index)
    }

    function getImageList() {
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

        return (
            <div className='imageList' style={imageListStyle}>
                {images.map(toImageDom)}
            </div>
        )
    }

    function toDotDom(image) {
        var imageIndex = images.indexOf(image)
        return (
            <>
                <button
                    className="slider-dots"
                    style={buttonStyle}
                    key={imageIndex}
                    onClick={() => switchImage(imageIndex)}>
                    ⬤
                </button>
            </>
        )
    }

    return (
        <>
            <div className="slider-container">
                <button
                    className="arrow-button"
                    style={buttonStyle}
                    onClick={() => switchImage(currentImageIndex - 1)}>
                    ◄
                </button>

                <div className='image-container' style={imageContainerStyle}>
                    {getImageList()}
                </div>

                <button
                    className="arrow-button"
                    style={buttonStyle}
                    onClick={() => switchImage(currentImageIndex + 1)}>
                    ►
                </button>
            </div>
            
            <div className='dotList' style={dotListStyle}>
                {images.map(toDotDom)}
            </div>
        </>
    )
}