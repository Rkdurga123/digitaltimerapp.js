// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeElapsedInSec: 0, timerLimitInMinute: 25}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinute} = this.state

    if (timerLimitInMinute > 1) {
      this.setState(prevState => ({
        timerLimitInMinute: prevState.timerLimitInMinute - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinute} = this.state

    this.setState(prevState => ({
      timerLimitInMinute: prevState.timerLimitInMinute + 1,
    }))
  }

  renderTimerLimitInControl = () => {
    const {timeElapsedInSec, timerLimitInMinute} = this.state
    const isBtnDisabled = timeElapsedInSec > 0

    return (
      <div>
        <p className="name">Set Timer limit</p>
        <div className="endBtn">
          <button
            className="image"
            type="button"
            onClick={this.onDecreaseTimerLimitInMinutes}
            disabled={isBtnDisabled}
          >
            -
          </button>
          <p type="button" className="timer">
            {timerLimitInMinute}
          </p>
          <button
            className="image"
            type="button"
            onClick={this.onIncreaseTimerLimitInMinutes}
            disabled={isBtnDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSec: 0,
      timerLimitInMinute: 25,
    })
  }

  incrementtimerElapsedInSec = () => {
    const {timeElapsedInSec, timerLimitInMinute} = this.state
    const isTimerCompleted = timeElapsedInSec === timerLimitInMinute * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSec, timerLimitInMinute} = this.state
    const isTimerCompleted = timeElapsedInSec === timerLimitInMinute * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSec: 0})
    }
    if (isTimerRunning) {
      this.clearInterval()
    } else {
      this.intervalId = setInterval(this.incrementtimerElapsedInSec, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const showImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-container">
        <div>
          <button
            className="btn"
            type="button"
            onClick={this.onStartOrPauseTimer}
          >
            <img src={showImage} className="image" alt={altText} />
          </button>
          <p className="name">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </div>
        <div>
          <button className="btn" type="button" onClick={this.onResetTimer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              className="image"
              alt="reset icon"
            />
          </button>
          <p className="name">Reset</p>
        </div>
      </div>
    )
  }

  getElapsedSecINTimeFormat = () => {
    const {timeElapsedInSec, timerLimitInMinute} = this.state
    const totalRemainingSec = timerLimitInMinute * 60 - timeElapsedInSec
    const minutes = Math.floor(totalRemainingSec / 60)
    const seconds = Math.floor(totalRemainingSec % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="footer-container">
          <div className="timer-container">
            <div className="timer-card">
              <h1 className="elapsed-time">
                {this.getElapsedSecINTimeFormat()}
              </h1>
              <p className="name">{isTimerRunning ? 'Running' : ' Paused'}</p>
            </div>
          </div>
          <div className="display-container">
            {this.renderTimerController()}
            {this.renderTimerLimitInControl()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
