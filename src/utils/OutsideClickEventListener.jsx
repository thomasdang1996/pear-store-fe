import { useEffect, useRef } from "react"

function listenToDropdown() {
  document.addEventListener('click', event => {
    const isDropdownButton = event.target.matches(".user-button")

    // if it is not a drop down button, but an element inside a drop down button, ignore it
    if (!isDropdownButton && event.target.closest(".drop-down") != null) {
      return
    }

    let currentDropdown
    if (!isDropdownButton) {
      currentDropdown = event.target.closest(".drop-down")

      // if the 'active' token of the elements exists, it removes it
      // from the list and returns false, if it doesn't exist, it is added and returns true
      currentDropdown.classList.toggle('active')
    }


    // will iterate through all dropdowns and will keep the current dropdown open
    document
      .querySelectorAll('.drop-down.active')
      .forEach(dropdown => {
        if (dropdown === currentDropdown) {
          return
        }
        dropdown.classList.remove('active')
      })
  })
}

export function handleOutsideClick(callbackFunction) {
  const ref = useRef()
  useEffect(() => {
    document.addEventListener('click', (event) => {
      const clickedOutside = ref.current && (!ref.current.contains(event.target))

      const clickedOnDropdownElement = event.target.closest(".cart-dropdown") != null

      // The delete button disappears right after being
      // clicked, so the 'clickedOnDropDownElement' 
      // validation won't work (drop-down won't have remove element)
      const isDeleteButton = event.target.className == 'remove-button'

      if (
        clickedOutside
        && !clickedOnDropdownElement
        && !isDeleteButton
      ) {
        callbackFunction()
      }
    })

    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref;
}