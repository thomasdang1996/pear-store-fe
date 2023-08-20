import { useEffect, useRef } from "react"

export function handleOutsideClick(dropDownButton, dropDownElement, ...ignoredElements) {
  const ref = useRef()
  useEffect(() => {
    const handleEvent = event => {
      const isDropdownButton = event.target.closest(dropDownButton) != null
      const isDropdownElement = event.target.closest(dropDownElement) != null
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
        !isDropdownElement &&
        !isIgnoredElement) {
        currentDropdown = document.querySelectorAll(dropDownElement)
        Array.from(currentDropdown).forEach(element =>
          element.classList.remove('active')
        )
      }
    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}