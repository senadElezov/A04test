import { useEffect, useRef, useState } from "react"
import { Button, Form, Header, Icon, InputProps, Popup, Segment, TransitionablePortal } from "semantic-ui-react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export interface IDateBoxProps extends InputProps {

    min: Date,

    max: Date,

    defaultValue?: Date

    value?: Date

    onValueChanged?: (evParams: {}) => any
}

const DateBox = (props) => {

    const [calendarOpened, setCalendarOpened] = useState<boolean>(false);

    const [selectedDate, setSelectedDate] = useState<Date>(props.value);

    const getDateDisplay = (date: Date, splitter: string = '/') => {

        if (!date) {
            return '';
        }

        return [
            date.getDate(),
            date.getMonth(),
            date.getFullYear()
        ].join(splitter)

    }
    const [dateDisplay, setDateDisplay] = useState<string>(() => getDateDisplay(props.value));

    useEffect(() => {

        setDateDisplay(getDateDisplay(selectedDate))
    },
        [selectedDate]
    )

    const mountNodeRef = useRef<HTMLDivElement>(null)

    return <><Form.Field >
        <input value={dateDisplay || ''} />
        <Button
            onClick={() => setCalendarOpened(prev => !prev)}
        >
            <Icon name='calendar'
            >
            </Icon>
        </Button>
        {
            calendarOpened &&
            <Calendar
                value={selectedDate}
                onChange={(date) => {
                    setCalendarOpened(false);
                    setSelectedDate(date)
                }
                }
            ></Calendar>
        }

    </Form.Field>
    </>

}

export default DateBox;