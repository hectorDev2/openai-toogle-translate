import { log } from 'console'
import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { LanguageType } from '../interfaces/enum'

type Props = {
  type: string
  value: string
  onChange?: (value: string) => void
  loading?: boolean
}

const getPlaceholder = ({type,loading}: {type:any,loading:boolean}) => {
  console.log('type',type,loading,'loading');
  
  if (type == LanguageType.FROM) {
    return 'intruduce texto  '
  } else if (type == LanguageType.TO) {
    return 'texto traducido'
  }
  if (loading) {
    console.log('loading.......!!',loading);
    
    return 'Loading...'
  }
  return 'traducccion'
}

const TextArea = ({ value,type, onChange,loading }: Props) => {

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  useEffect(() => {
  }, [loading,getPlaceholder])



  return (
    <Form.Control
      as='textarea'
      rows={3}
      style={{ height: '150px', resize: 'none' }}
      placeholder={getPlaceholder({type,loading})}
      className='mt-3'
      onChange={handleChange}
      autoFocus={type == LanguageType.FROM}
      readOnly={type == LanguageType.TO}
      value={value }
    />
  )
}

export default TextArea
