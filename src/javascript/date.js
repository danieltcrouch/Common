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
    if ( value  ) {
        result = new Date( value );
        result = adjustMinutes( result, -result.getTimezoneOffset() );
    }
    return result;
}

function getDateOrNull( value ) {
    return value ? new Date( value ) : null;
}

function adjustMinutes( date, minuteDifference ) {
    date.setMinutes( date.getMinutes() + minuteDifference );
    return date;
}

function adjustHours( date, hourDifference ) {
    date.setHours( date.getHours() + hourDifference );
    return date;
}

function adjustDays( date, dayDifference ) {
    date.setDate( date.getDate() + dayDifference );
    return date;
}

function adjustDayOfWeek( date, dayIndex, excludeToday = true, backward = false ) {
    const daysInWeekDirectional = backward ? -DAYS_IN_WEEK : DAYS_IN_WEEK;
    let dayDifference = ( dayIndex - date.getDay() + daysInWeekDirectional ) % DAYS_IN_WEEK;
    dayDifference += (excludeToday && dayIndex === date.getDay()) ? daysInWeekDirectional : 0;
    date.setDate( date.getDate() + dayDifference );
    return date;
}

function adjustMonths( date, monthDifference ) {
    date.setMonth( date.getMonth() + monthDifference );
    return date;
}

function adjustYears( date, yearDifference ) {
    date.setFullYear( date.getFullYear() + yearDifference );
    return date;
}

function setToAlmostMidnight( date ) {
    date.setHours( 23, 59, 59, 0 );
    return date;
}

function zeroTime( date ) {
    date.setHours(0,0,0,0);
    return date;
}

function zeroMinutesAndBelow( date ) {
    date.setMinutes(0,0,0);
    return date;
}

function zeroSecondsAndBelow( date ) {
    date.setSeconds(0,0);
    return date;
}

function isDateEqual( date1, date2, compareExact = false ) {
    if ( compareExact ) {
        date1 = date1.getTime();
        date2 = date2.getTime();
    }
    else {
        date1 = date1.toLocaleDateString();
        date2 = date2.toLocaleDateString();
    }
    return date1 === date2;
}

function isDateBefore( date, centerDate, compareExact = false ) {
    if ( compareExact ) {
        date = date.getTime();
        centerDate = centerDate.getTime();
    }
    return date < centerDate;
}

function isDateAfter( date, centerDate, compareExact = false ) {
    if ( compareExact ) {
        date = date.getTime();
        centerDate = centerDate.getTime();
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
    return adjustMinutes( date, date.getTimezoneOffset() );
}