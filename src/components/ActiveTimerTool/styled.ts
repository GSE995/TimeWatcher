import styled from 'styled-components'

const Wrapper = styled.div`
  height: 66px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
  margin-bottom: 20px;
`

const TimerActions = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 20px;
`

const TimerNameWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  padding-left: 10px;
`

const TimerNameField = styled.input`
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  &:focus {
    outline: none;
  }
`

const Icon = styled.i((props: any) => ({
  'font-size': props.size,
  color: props.color,
}))

const TimerValue = styled.div`
  height: 100%;
  line-height: 66px;
  margin-right: 10px;
  font-size: 1.5em;
`

const TriggerButton = styled.button``

export {
  Wrapper,
  TimerActions,
  TimerNameWrapper,
  TimerNameField,
  Icon,
  TimerValue,
  TriggerButton,
}
