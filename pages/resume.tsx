import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Resume = () => {
  const router = useRouter()

  useEffect(() => {
    window.location.href =
      'https://drive.google.com/file/d/15dV_HWITZYi72DY9X73BvIzFpSmTwhQH/view?usp=sharing'
  }, [])

  return null
}

export default Resume
