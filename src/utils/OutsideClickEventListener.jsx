import { useEffect, useRef } from "react"

export function handleOutsideClick(dropDownListName, ...ignoredElements) {
  const ref = useRef()
  useEffect(() => {
    const handleEvent = event => {
      const dropDownList = event.target.closest(dropDownListName)

      let isDropdownButton
      if (dropDownList != null) {
        let button = Array
          .prototype
          .slice
          .call(dropDownList.children)
          .filter(child => child.tagName == 'BUTTON')[0]
          .className
        isDropdownButton = event.target.closest(`.${button}`) != null
      }
      const isFromDropdownList = event.target.closest(dropDownListName) != null

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
        currentDropdown = event.target.closest(dropDownListName)
        currentDropdown.classList.toggle('active')
      }
      else if (
        !isFromDropdownList &&
        !isIgnoredElement) {
        currentDropdown = document.querySelector(dropDownListName)
        currentDropdown.classList.remove('active')
      }
    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}