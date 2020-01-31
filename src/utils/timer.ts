import { Timer } from "../models"

const pad = (val: number) => (val >= 10 ? val : '0' + val)
const tickTime = (value: Date) => new Date((+value) + 1000)

function getDisplayTimerValue(value: Date): string {
    let milliseconds = (+value) / 1000
    let hours = Math.floor(milliseconds / 3600)
    let minutes = Math.floor((milliseconds / 60) % 60)
    let seconds = Math.floor(milliseconds % 60)

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function isEqualByDate(field: 'startDate' | 'endDate', timerOne: Timer, timerTwo: Timer) {
    let dateOne = timerOne[field]
    let dateTwo = timerTwo[field]

	return (
		dateOne?.getFullYear() === dateTwo?.getFullYear()
		&& dateOne?.getMonth() === dateTwo?.getMonth()
		&& dateOne?.getDate() === dateTwo?.getDate()
	)
}

function isEqualName(TimerOne: Timer, TimerTwo: Timer) : boolean {
    return TimerOne.name === TimerTwo.name
}

function groupBy(array: Array<Timer>, isEqual: Function): Array<Timer[]> {
	if(array.length == 0) return [array]

	let prev = [array[0]]
	let ordered = []
    for (let i = 1; i < array.length; i++) {
        if (isEqual(prev[0], array[i])) {
            prev.push(array[i])
        } else {
			ordered.push(prev)
			prev = [array[i]]
        }
	}
	ordered.push(prev)

	return ordered
}

function groupByDate(array: Array<Timer>, field: 'startDate' | 'endDate'){
    return groupBy(array, isEqualByDate.bind({}, field) )
}

function groupByName(array: Array<Timer>, field: 'startDate' | 'endDate'){
    return groupBy(array, isEqualName)
}

export {
    tickTime,
    getDisplayTimerValue,
    isEqualByDate,
    groupByName,
    groupByDate
}