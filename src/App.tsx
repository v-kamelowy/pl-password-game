import React, {useEffect, useState} from 'react';
import { rules } from './Rules';
import './App.css';

export default function App() {
  const [currentRule, setCurrentRule] = useState<number>(0)
  const [validRules, setValidRules] = useState<Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>>([])
  const [invalidRules, setInvalidRules] = useState<Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>>([])
  const [currentRulesArray, setCurrentRulesArray] = useState<Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>>([rules[0]])
  const [sortedRulesArray, setSortedRulesArray] = useState<Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>>([])
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  function sortArray() {
    let currentRulesArray_temp = currentRulesArray
    let sortedRulesArray_temp: Array<{number: number, name: string; message: string; isTrue(password: string): boolean}> = []
    let validRules_temp = Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>()
    let invalidRules_temp = Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>()
    currentRulesArray_temp.forEach(rule => {
      if (rule.isTrue(password)) {
        validRules_temp.push(rule)
      }
      else {
        invalidRules_temp.push(rule)
      }
    })
    sortedRulesArray_temp = [...validRules_temp, ...invalidRules_temp]
    setSortedRulesArray(sortedRulesArray_temp)
  }

  function checkRule(arr_currentRules: Array<{number: number, name: string; message: string; isTrue(password: string): boolean}>, pass: string) {
    if (pass.length > 0) {
      arr_currentRules.forEach(rule => {
        if (rule.isTrue(pass) && pass.length > 0) {
          if (!validRules.includes(rule)) {
            setValidRules([...validRules, rule])
          }
          if (invalidRules.includes(rule)) {
            setInvalidRules(invalidRules.filter(rule => rule !== rule))
          }
        } else {
          if (!invalidRules.includes(rule)) {
            setInvalidRules([...invalidRules, rule])
          }
          if (validRules.includes(rule)) {
            setValidRules(validRules.filter(rule => rule !== rule))
          }
        }
      });
    }
  }

  function checkPassword(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIsPasswordValid(false)
    let ev_password = event.target.value
    setPassword(ev_password)
  }

  useEffect(() => {
    setIsPasswordValid(false)
    checkRule(currentRulesArray, password)
  }, [password, currentRulesArray, currentRule])

  useEffect(() => {
    if (invalidRules.length === 0 && validRules.length === currentRulesArray.length && password.length > 0) {
      setIsPasswordValid(true)
    } else {
      setIsPasswordValid(false)
    }
  }, [validRules, invalidRules])

  useEffect(() => {
    console.log('currentRule: ', currentRule)
    console.log('currentRulesArray: ', currentRulesArray)
    console.log('rules length: ', rules.length)
    if (isPasswordValid == true && currentRule < rules.length - 1) {
      let currentRulesArray_temp = currentRulesArray
      currentRulesArray_temp.push(rules[currentRule + 1])
      setCurrentRulesArray(currentRulesArray_temp)
      setCurrentRule(currentRule + 1)
      console.log('Password valid')
    }
  }, [isPasswordValid])
  
  useEffect(() => {
    sortArray()
  }, [password, isPasswordValid])

  return (
    <div className="App">
      <textarea  className='App__PasswordInput' name='password' placeholder="Hasło" onChange={checkPassword} />
      <div className="App__Rules">
      {sortedRulesArray.map((rule, index) => (
        <div key={index} className={`App__ShowAnimation App__Rule ${rule.isTrue(password) ? "App__Rule_Valid" : "App__Rule_Invalid"}`}>
          <div className='App__Rule_Number'>Wymaganie {rule.number}</div>
          <div className="App__Rule_Message">{rule.message}</div>
        </div>
      ))}
      </div>
    </div>
  );
}

/*
  <div className='debug'>
    <p>currentRule: {currentRule}</p>
    <p>validRules: {validRules.map(rule => rule.name)}</p>
    <p>invalidRules: {invalidRules.map(rule => rule.name)}</p>
    <p>currentRulesArray: {currentRulesArray.map(rule => rule.name)}</p>
    <p>isPasswordValid: {isPasswordValid.toString()}</p>
    <p>password: {password}</p>
  </div>
*/