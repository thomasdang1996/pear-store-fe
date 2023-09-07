import { useEffect, useRef } from "react"

export function handleOutsideClick(...ignoredElements) {
  const ref = useRef()
  function toArray(htmlList) {
    return Array
      .prototype
      .slice
      .call(htmlList)
  }
  useEffect(() => {
    const handleEvent = event => {
      const eventTarget = event.target
      const reference = `.${getReference()}`
      const isReferencedDropDown = eventTarget.closest(reference) != null
      const clickedDropDown = eventTarget.closest(["[dropdown]"])
      const isClickedButton = isReferencedDropDown
        ? eventTarget.closest(`.${getClickedButtonName()}`) != null
        : null
      const isIgnoredElement =
        ignoredElements != null &&
        ignoredElements
          .map(element => eventTarget.className == element)
          .includes(true)

      // dropdown button toggling
      // if the 'active' token of the elements exists, it removes it
      // from the list and returns false, if it doesn't exist, it is added and returns true
      if (isClickedButton) {
        eventTarget
          .closest(reference)
          .classList
          .toggle('active')
      }
      else if (!isReferencedDropDown && !isIgnoredElement) {
        toArray(document.querySelectorAll("[dropdown]"))
        .filter(dropDown => dropDown != clickedDropDown)
        .forEach(item => {
          if (toArray(item.classList).includes('active')) {
            item.classList.remove('active')
          }
        })
      }

      function getReference() {
        return ref
          .current
          .parentElement
          .className
          .split(' ')
          .filter(item => item != 'active')[0]
      }

      function getClickedButtonName() {
        return Array
          .prototype
          .slice
          .call(clickedDropDown.children)
          .filter(child => child.tagName == 'BUTTON')[0]
          .className
      }
    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}