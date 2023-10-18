import { useState, useEffect, useCallback } from 'react';

//옵션값 지정
const options = {
  root: null,
  threshold: .5,
  rootMargin: '0px'
}

//커스텀 훅 
//관찰 대상을 지정할 수 있도로 ref값을 useState로 관리. 관찰자 만들어줌
const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null)
  const checkIntersect = useCallback(([entry], observer) => {
    if(entry.isIntersecting){
      onIntersect(entry, observer);
    }
  },[])

  useEffect(() => {
    let observer
    if(ref){
      observer = new IntersectionObserver(checkIntersect, {
        ...options,
        ...option
      })
    }
    return () => observer && observer.disconnect()
  },[ref, option.root, option.threshold, option.rootMargin, checkIntersect])
  return [ref, setRef]
}


export default useIntersect