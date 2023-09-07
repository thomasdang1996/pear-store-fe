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
      const expectedDropdown = eventTarget.closest(`.${getRefElement()}`)
      const actualDropdown = eventTarget.closest(["[dropdown]"])
      const isIgnoredElement =
        ignoredElements != null &&
        ignoredElements
          .map(element => eventTarget.className == element)
          .includes(true)

      // dropdown button toggling
      // if the 'active' token of the elements exists, it removes it
      // from the list and returns false, if it doesn't exist, it is added and returns true
      if (actualDropdown == null || (expectedDropdown == null && !isIgnoredElement)) {
        toArray(document.querySelectorAll("[dropdown]"))
          .filter(dropDown => dropDown != actualDropdown)
          .forEach(item => {
            if (toArray(item.classList).includes('active')) {
              item.classList.remove('active')
            }
          })
      } else if (eventTarget.closest(`.${getButtonName(actualDropdown).className}`) != null) {
        expectedDropdown.classList.toggle('active')
      }

      function getRefElement() {
        return ref
          .current
          .parentElement
          .className
          .split(' ')
          .filter(item => item != 'active')[0]
      }

      function getButtonName(dropDown) {
        return Array
          .prototype
          .slice
          .call(dropDown.children)
          .filter(child => child.tagName == 'BUTTON')[0]
      }

    }
    document.addEventListener('click', handleEvent)
    return () =>
      document.removeEventListener('click', handleEvent)  //to avoid memory leaks
  }, [])
  return ref
}