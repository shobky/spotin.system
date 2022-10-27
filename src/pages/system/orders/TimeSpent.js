import React, { useEffect } from 'react'
import moment from 'moment/moment'

const TimeSpent = ({ order, onSetTimeSpent, timeSpent }) => {

    useEffect(() => {
        const getFullDate = () => {
            const currentdate = new Date();
            const fullDate =
                `  ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}
                `
            let startTime = moment(`${order.time[0] }:${order.time[1]}:00`, 'HH:mm:ss ');
            let endTime = moment(fullDate, 'HH:mm:ss ');

            // calculate total duration
            let duration = moment.duration(endTime.diff(startTime));

            // duration in hours
            let hours = parseInt(duration.asHours());

            // duration in minutes
            let minutes = parseInt(duration.asMinutes()) % 60;

            onSetTimeSpent(
                [hours, minutes]
            )

        }
        getFullDate()
    }, [order])
    return (
        <div>
            {
                timeSpent &&
                <p style={{ width: "190px" }} className='time_spent-num-of-persons'><strong>{order.tickets.number} person Checked in for:</strong> {(timeSpent[0] < 0 ? 24 + timeSpent[0] : timeSpent[0]) + " hours : " + (timeSpent[1] < 0 ?  60 +  timeSpent[1] : timeSpent[1] )+ " minutes"}</p>
            }
        </div>
    )
}

export default TimeSpent