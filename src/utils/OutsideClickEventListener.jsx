import { useEffect, useRef } from "react"

export function handleOutsideClick(dropDownButton, dropDownElement, ...ignoredElements) {
  const ref = useRef()
  useEffect(() => {
    const handleEvent = event => {
      const isDropdownButton = event.target.closest(dropDownButton) != null
      const isFromDropdownList = event.target.closest(dropDownElement) != null
      const isIgnoredElement =
        ignoredElements != null &&
        ignoredElements
          .map(element => event.target.className == element)
          .includes(true)

      let currentDropdown

      // dropdown button toggling
      // if the 'active' token of the elements exists, it removes it
      // from the list and returns false, if it doesn't exist, it is added and returns true
      if (isDropdownButton) {
        currentDropdown = event.target.closest(dropDownElement)
        currentDropdown.classList.toggle('active')
      }
      else if (
        !isFromDropdownList &&
        !isIgnoredElement) {
        currentDropdown = document.querySelector(dropDownElement)
        currentDropdown.classList.remove('active')
      }
    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}