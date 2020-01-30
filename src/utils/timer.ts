const pad = (val: number) => (val >= 10 ? val : '0' + val)
const tickTime = (value: Date) => new Date((+value) + 1000)

function getDisplayTimerValue(value: Date): string {
    let milliseconds = (+value) / 1000
    let hours = Math.floor(milliseconds / 3600)
    let minutes = Math.floor((milliseconds / 60) % 60)
    let seconds = Math.floor(milliseconds % 60)

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export {
    tickTime,
    getDisplayTimerValue
}