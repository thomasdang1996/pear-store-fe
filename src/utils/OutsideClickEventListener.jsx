import { useEffect, useRef } from "react"

export function handleOutsideClick(dropDownName, ...ignoredElements) {
  const ref = useRef()
  useEffect(() => {
    const handleEvent = event => {
      const dropDown = event.target.closest(dropDownName)
      const isFromDropDown = event.target.closest(dropDownName) != null

      let isDropdownButton
      if (isFromDropDown) {
        let button = Array
          .prototype
          .slice
          .call(dropDown.children)
          .filter(child => child.tagName == 'BUTTON')[0]
          .className
        isDropdownButton = event.target.closest(`.${button}`) != null
      }

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
        currentDropdown = event.target.closest(dropDownName)
        currentDropdown.classList.toggle('active')
      }
      else if (!isFromDropDown && !isIgnoredElement) {
        currentDropdown = document.querySelector(dropDownName)
        currentDropdown.classList.remove('active')
      }
    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}