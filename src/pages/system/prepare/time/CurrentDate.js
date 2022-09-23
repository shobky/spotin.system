import { useEffect } from "react"

const CurrentDate = ({ onSetTime, onSetDate, time ,date}) => {

    useEffect(() => {

        const getdate = () => {
            const currentdate = new Date();
            let date = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1)

            onSetDate(date)

        }

        const getTime = () => {
            const currentdate = new Date();
            let time =
                [currentdate.getHours() + ":" +
                currentdate.getMinutes()]
            onSetTime(time)

        }
        getdate()
        getTime()
    }, [])
    return (
        <div>
            <p className="fullDate">{date} {time}</p>
        </div>
    )
}

export default CurrentDate