import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../interfaces/constants'
import { LanguageType } from '../interfaces/enum'
import { Language, PropsInput } from '../interfaces/types'

function SelectLanguage ({ onChange, type, value }: PropsInput) {
  const handleSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e?.target?.value as Language)
  }
  return (
    <Form.Select
      style={{ width: '150px' }}
      size='sm'
      onChange={handleSelectLanguage}
      value={value}
      aria-label='Detectar idioma'
    >
      {type===LanguageType.FROM&&
      <option defaultChecked value={AUTO_LANGUAGE} key={AUTO_LANGUAGE} className='text-center '>
        Detectar idioma
        </option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option value={key} key={key} className='text-center '>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}

export default SelectLanguage
