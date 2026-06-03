import { useMemo, useState } from 'react'
import './App.css'

type Operation = 'add' | 'subtract'
type TimeField = 'first' | 'second'
type TimePart = 'minutes' | 'seconds'

type TimeValue = {
  minutes: string
  seconds: string
}

const emptyTime: TimeValue = {
  minutes: '',
  seconds: '',
}

function toSeconds(time: TimeValue) {
  const minutes = Number(time.minutes || 0)
  const seconds = Number(time.seconds || 0)

  return minutes * 60 + seconds
}

function formatTime(totalSeconds: number) {
  const sign = totalSeconds < 0 ? '-' : ''
  const absoluteSeconds = Math.abs(totalSeconds)
  const minutes = Math.floor(absoluteSeconds / 60)
  const seconds = absoluteSeconds % 60

  return `${sign}${minutes}:${seconds.toString().padStart(2, '0')}`
}

function App() {
  const [firstTime, setFirstTime] = useState<TimeValue>(emptyTime)
  const [secondTime, setSecondTime] = useState<TimeValue>(emptyTime)
  const [operation, setOperation] = useState<Operation>('add')

  const result = useMemo(() => {
    const firstSeconds = toSeconds(firstTime)
    const secondSeconds = toSeconds(secondTime)

    return operation === 'add'
      ? firstSeconds + secondSeconds
      : firstSeconds - secondSeconds
  }, [firstTime, operation, secondTime])

  function updateTime(field: TimeField, part: TimePart, value: string) {
    const cleanValue = value.replace(/\D/g, '')
    const setter = field === 'first' ? setFirstTime : setSecondTime

    setter((current) => ({
      ...current,
      [part]: cleanValue,
    }))
  }

  function resetCalculator() {
    setFirstTime(emptyTime)
    setSecondTime(emptyTime)
    setOperation('add')
  }

  return (
    <main className="app-shell">
      <section className="calculator-panel" aria-labelledby="app-title">
        <div className="mascot" aria-hidden="true">
          <span className="mascot-ear mascot-ear-left"></span>
          <span className="mascot-ear mascot-ear-right"></span>
          <span className="mascot-face">
            <span className="mascot-eye"></span>
            <span className="mascot-eye"></span>
          </span>
          <span className="mascot-bow"></span>
        </div>

        <div className="intro">
          <p className="kicker">Sweet little time math</p>
          <h1 id="app-title">Minutes Calculator</h1>
          <p className="intro-copy">
            Add or subtract minutes and seconds without doing the tiny mental
            gymnastics.
          </p>
        </div>

        <form className="calculator" onSubmit={(event) => event.preventDefault()}>
          <div className="time-grid">
            <fieldset className="time-card">
              <legend>First time</legend>
              <label>
                <span>Minutes</span>
                <input
                  inputMode="numeric"
                  min="0"
                  name="first-minutes"
                  onChange={(event) =>
                    updateTime('first', 'minutes', event.target.value)
                  }
                  placeholder="12"
                  type="text"
                  value={firstTime.minutes}
                />
              </label>
              <label>
                <span>Seconds</span>
                <input
                  inputMode="numeric"
                  min="0"
                  name="first-seconds"
                  onChange={(event) =>
                    updateTime('first', 'seconds', event.target.value)
                  }
                  placeholder="30"
                  type="text"
                  value={firstTime.seconds}
                />
              </label>
            </fieldset>

            <div className="operation-toggle" aria-label="Choose operation">
              <button
                aria-pressed={operation === 'add'}
                className={operation === 'add' ? 'active' : ''}
                onClick={() => setOperation('add')}
                type="button"
              >
                +
              </button>
              <button
                aria-pressed={operation === 'subtract'}
                className={operation === 'subtract' ? 'active' : ''}
                onClick={() => setOperation('subtract')}
                type="button"
              >
                -
              </button>
            </div>

            <fieldset className="time-card">
              <legend>Second time</legend>
              <label>
                <span>Minutes</span>
                <input
                  inputMode="numeric"
                  min="0"
                  name="second-minutes"
                  onChange={(event) =>
                    updateTime('second', 'minutes', event.target.value)
                  }
                  placeholder="4"
                  type="text"
                  value={secondTime.minutes}
                />
              </label>
              <label>
                <span>Seconds</span>
                <input
                  inputMode="numeric"
                  min="0"
                  name="second-seconds"
                  onChange={(event) =>
                    updateTime('second', 'seconds', event.target.value)
                  }
                  placeholder="45"
                  type="text"
                  value={secondTime.seconds}
                />
              </label>
            </fieldset>
          </div>

          <section className="result-card" aria-live="polite">
            <span className="result-label">Result</span>
            <strong>{formatTime(result)}</strong>
            <span className="result-note">
              {Math.abs(result)} total seconds
            </span>
          </section>

          <button className="reset-button" onClick={resetCalculator} type="button">
            Clear
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
