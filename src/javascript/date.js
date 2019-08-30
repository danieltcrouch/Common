const DAYS_OF_WEEK = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const TIMEZONE_OFFSET = 60000;

const MILLISECONDS = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const DAYS_IN_WEEK = 7;

function newDateFromUTC( value ) {
    //fixes date when local timezone is assumed
    let result = null;
    if ( value ) {
        result = new Date( value );
        result = adjustMinutes( result, -result.getTimezoneOffset() );
    }
    return result;
}

function getDateOrNull( value ) {
    return value ? new Date( value ) : null;
}

function adjustMinutes( date, minuteDifference ) {
    if ( date ) {
        date.setMinutes( date.getMinutes() + minuteDifference );
    }
    return date;
}

function adjustHours( date, hourDifference ) {
    if ( date ) {
        date.setHours( date.getHours() + hourDifference );
    }
    return date;
}

function adjustDays( date, dayDifference ) {
    if ( date ) {
        date.setDate( date.getDate() + dayDifference );
    }
    return date;
}

function adjustDayOfWeek( date, dayIndex, excludeToday = true, backward = false ) {
    if ( date ) {
        const daysInWeekDirectional = backward ? -DAYS_IN_WEEK : DAYS_IN_WEEK;
        let dayDifference = ( dayIndex - date.getDay() + daysInWeekDirectional ) % DAYS_IN_WEEK;
        dayDifference += (excludeToday && dayIndex === date.getDay()) ? daysInWeekDirectional : 0;
        date.setDate( date.getDate() + dayDifference );
    }
    return date;
}

function adjustMonths( date, monthDifference ) {
    if ( date ) {
        date.setMonth( date.getMonth() + monthDifference );
    }
    return date;
}

function adjustYears( date, yearDifference ) {
    if ( date ) {
        date.setFullYear( date.getFullYear() + yearDifference );
    }
    return date;
}

function setToAlmostMidnight( date ) {
    if ( date ) {
        date.setHours( 23, 59, 59, 0 );
    }
    return date;
}

function zeroTime( date ) {
    if ( date ) {
        date.setHours(0,0,0,0);
    }
    return date;
}

function zeroMinutesAndBelow( date ) {
    if ( date ) {
        date.setMinutes(0,0,0);
    }
    return date;
}

function zeroSecondsAndBelow( date ) {
    if ( date ) {
        date.setSeconds(0,0);
    }
    return date;
}

function isDateEqual( date1, date2, compareExact = false ) {
    if ( compareExact ) {
        date1 = date1 ? date1.getTime() : null;
        date2 = date2 ? date2.getTime() : null;
    }
    else {
        date1 = date1 ? date1.toLocaleDateString() : null;
        date2 = date2 ? date2.toLocaleDateString() : null;
    }
    return date1 === date2;
}

function isDateBeforeOrEqual( date, centerDate, compareExact = false ) {
    return isDateBefore( date, centerDate, compareExact ) || isDateEqual( date, centerDate, compareExact );
}

function isDateBefore( date, centerDate, compareExact = false ) {
    if ( compareExact ) {
        date = date ? date.getTime() : null;
        centerDate = centerDate ? centerDate.getTime() : null;
    }
    return date < centerDate;
}

function isDateAfterOrEqual( date, centerDate, compareExact = false ) {
    return isDateAfter( date, centerDate, compareExact ) || isDateEqual( date, centerDate, compareExact );
}

function isDateAfter( date, centerDate, compareExact = false ) {
    if ( compareExact ) {
        date = date ? date.getTime() : null;
        centerDate = centerDate ? centerDate.getTime() : null;
    }
    return date > centerDate;
}

function isDateInRange( date, earlyDate, lateDate, inclusive = false ) {
    let result = isDateAfter( date, earlyDate) && isDateBefore( date, lateDate );
    if ( !result && inclusive ) {
        result = isDateEqual( date, earlyDate ) || isDateEqual( date, lateDate );
    }
    return result;
}

function isDateInNextHours( date, hourAdjust ) {
    return isDateInSpan( date, null, null, null, hourAdjust, null );
}

function isDateInNextDays( date, dayAdjust ) {
    return isDateInSpan( date, null, null, dayAdjust, null, null, true, false );
}

function isDateInNext( date, yearAdjust, monthAdjust, dayAdjust, hourAdjust, minuteAdjust, inclusive = false, compareExact = true ) {
    return isDateInSpan( date, yearAdjust, monthAdjust, dayAdjust, hourAdjust, minuteAdjust, inclusive, compareExact, true );
}

function isDateInLast( date, yearAdjust, monthAdjust, dayAdjust, hourAdjust, minuteAdjust, inclusive = false, compareExact = true ) {
    return isDateInSpan( date, yearAdjust, monthAdjust, dayAdjust, hourAdjust, minuteAdjust, inclusive, compareExact, false );
}

function isDateInSpan( date, yearAdjust, monthAdjust, dayAdjust, hourAdjust, minuteAdjust, inclusive = false, compareExact = true, next = true ) {
    let compareDate = new Date();
    adjustYears( compareDate, yearAdjust );
    adjustMonths( compareDate, monthAdjust );
    adjustDays( compareDate, dayAdjust );
    adjustHours( compareDate, hourAdjust );
    adjustMinutes( compareDate, minuteAdjust );

    let result = next ? isDateBefore( date, compareDate, compareExact ) : isDateAfter( date, compareDate, compareExact );
    result = (!result && inclusive) ? isDateEqual( date, compareDate, compareExact ) : result;
    return result;
}

function getZonedTime( date ) {
    //accounts for Timezone
    //needed since Javascript stores Time as UTC
    let result = null;
    if ( date ) {
        date = new Date( date - date.getTimezoneOffset() * TIMEZONE_OFFSET );
        result = date.getTime();
    }
    return result;
}

function adjustToUTC( date ) {
    //converts to date <emphasis>as if</emphasis> UTC
    //a date in CST of 01/28/1993 00:00 is changed to 01/28/1993 06:00 (its equivalent in UTC) though the timezone of CST is maintained
    return date ? adjustMinutes( date, date.getTimezoneOffset() ) : null;
}

//todo - clean-up all the comparison and inRange functions