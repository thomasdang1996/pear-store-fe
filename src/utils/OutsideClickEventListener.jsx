import { useEffect, useRef } from "react"

export function useOutsideClick(callbackFunction) {
    const ref = useRef()
    useEffect(() => {
      const handleEvent = (event) => {
        const concernedElement = document.querySelector(".cart-dropdown")
        const notClickedOnExcludedElement = !(concernedElement != null && concernedElement.contains(event.target))
        // The delete button disappears right after being
        // clicked, so the 'notClickedOnExcludedElement' 
        // validation won't work (concerned elements won't have this element)
        const isNotDeleteButton = !(event.target.className == 'remove-button')
        const clickedOutside = ref.current && (!ref.current.contains(event.target))
        if (clickedOutside && notClickedOnExcludedElement && isNotDeleteButton) {
          callbackFunction()
        }
      }
      document.addEventListener('click', handleEvent)
      return () => document.removeEventListener('click', handleEvent)  //to avoid memory leaks
    }, [])
    return ref;
  }