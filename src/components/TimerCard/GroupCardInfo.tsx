import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

type GroupCardInfo = {
    generalTime: string
    date: Date
    checkedCount: number
}

const GroupInfoWrapper = styled.div`
    display: flex;
    width: 100%;
    padding-bottom: 10px;
`

const GeneralDate = styled.div`
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
`

const GeneralTime = styled.div`
    margin-right: 85px;
    font-weight: bold;
    font-size: 18px;
`

const SelectedInfo = styled.div`
    font-size: 18px;
    margin-left: 20px
`

const Spacer = styled.div`
    flex-grow: 1;
`

function GroupCardInfo(props: GroupCardInfo) {
    let dateFormat = moment(props.date).format('YYYY/MM/DD')
    return (
        <GroupInfoWrapper>
            <GeneralDate>{dateFormat}</GeneralDate>
            <SelectedInfo>Selected items: {props.checkedCount}</SelectedInfo>
            <button style={{color: 'dark', marginLeft: '20px'}} disabled={!props.checkedCount}>Delete</button>
            <Spacer />
            <GeneralTime>{props.generalTime}</GeneralTime>
        </GroupInfoWrapper>
    )
}

export default GroupCardInfo
