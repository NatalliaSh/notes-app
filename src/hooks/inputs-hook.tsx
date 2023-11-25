import {InputData} from '../components/input/types'
import {useState, ChangeEvent} from 'react'
import {Input} from '../components/input'
import {useLocalization} from './useLocalization'

export function useInputs(inputs: InputData[]) {
  const [inputData, setInputData] = useState(inputs)
  const localization = useLocalization()

  const validate = (index?: number) => {
    const isIndex = typeof index !== 'undefined' && index >= 0
    const newArr = isIndex
      ? [...inputData]
      : inputData.map(data => {
          const errorMessage = data.validationFn(data.value)
          return errorMessage ? {...data, errorMessage} : data
        })

    if (isIndex) {
      newArr[index] = {
        ...newArr[index],
        errorMessage: newArr[index].validationFn(inputData[index].value),
      }
    }

    if (newArr.findIndex(data => data.errorMessage) >= 0) {
      setInputData(newArr)
      return 'Validation error'
    }
  }

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    const newArr = [...inputData]
    newArr[index] = {...newArr[index], value, errorMessage: ''}
    setInputData(newArr)
  }

  const blurInputHandler = (index: number) => {
    validate(index)
  }

  const inputsLayout = inputData.map((data, index) => {
    const inputName = data.name
    return (
      <Input
        key={index}
        name={data.name}
        label={localization.inputs.label[inputName]}
        value={data.value}
        type={data.type}
        maxLength={data.maxLength}
        placeholder={localization.inputs.placeholder[inputName]}
        isRequired={data.isRequired}
        autofocus={index === 0}
        errorMessage={data.errorMessage}
        onChange={e => changeInputHandler(e, index)}
        onBlur={() => blurInputHandler(index)}
      />
    )
  })

  return {
    inputData,
    inputsLayout,
    validate,
  }
}
