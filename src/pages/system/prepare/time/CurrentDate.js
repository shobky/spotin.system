import { useEffect } from "react"

const CurrentDate = ({ onSetTime, onSetDate, time, date, selectedUser }) => {

    useEffect(() => {

        const getdate = () => {
            const currentdate = new Date();
            let date = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1)

            onSetDate(date)

        }

        const getTime = () => {
            const currentdate = new Date();
            let hours =
                currentdate.getHours()
            let minutes = ":" +
                currentdate.getMinutes()
            onSetTime([hours, minutes])

        }
        getdate()
        getTime()
    }, [selectedUser])
    return (
        <div>
            <p className="fullDate">{date} {time}</p>
        </div>
    )
}

export default CurrentDate