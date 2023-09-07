import { useEffect, useRef } from "react"

export function handleOutsideClick(...ignoredElements) {
  const ref = useRef()
  useEffect(() => {
    const handleEvent = event => {
      const eventTarget = event.target
      const expectedDropdown = eventTarget.closest(getRefElementName())
      const actualDropdown = eventTarget.closest(["[dropdown]"])

      // dropdown button toggling
      // if the 'active' token of the elements exists, it removes it
      // from the list and returns false, if it doesn't exist, it is added and returns true
      if (!isDropdown() && !isIgnoredElement()) {
        toArray(document.querySelectorAll("[dropdown]"))
          .filter(dropDown => dropDown != actualDropdown)
          .filter(dropDown => toArray(dropDown.classList).includes('active'))
          .forEach(item => item.classList.remove('active'))
      } else if (isClickedButton()) {
        expectedDropdown.classList.toggle('active')
      }

      function isDropdown() {
        return actualDropdown != null && expectedDropdown != null
      }
      function isIgnoredElement() {
        return ignoredElements != null &&
          ignoredElements
            .map(element => eventTarget.className == element)
            .includes(true)
      }
      function isClickedButton() {
        var button = toArray(actualDropdown.children)
          .filter(child => child.tagName == 'BUTTON')[0]
        return eventTarget.closest(`.${button.className}`) != null
      }

      function getRefElementName() {
        return `.${ref
          .current
          .parentElement
          .className
          .split(' ')
          .filter(item => item != 'active')[0]}`
      }
      function toArray(htmlList) {
        return Array
          .prototype
          .slice
          .call(htmlList)
      }
    }
    document.addEventListener('click', handleEvent)
    return () => document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}