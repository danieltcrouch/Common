const DAYS_OF_WEEK = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TIMEZONE_OFFSET = 60000;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;


/*** BASIC ***/


function newDate( value, allowDatabaseConversion = true ) {
    let result = null;
    if ( value ) {
        result = new Date( value );
        let isDatabaseTimestamp = result.toISOString() !== value;
        if ( allowDatabaseConversion && isDatabaseTimestamp ) {
            result = adjustToUTC( result );
        }
    }
    return result;
}

function getISOString( date ) {
    return ( date instanceof Date ) ? date.toISOString() : null
}


/*** DISPLAY ***/


function getDisplayTime( date ) {
    let result = "";

    if ( date ) {
        const now = new Date();
        if ( isDateEqual( date, now ) ) {
            result = "Today, " + date.toLocaleTimeString( "en-US", { hour: '2-digit', minute: '2-digit' } );
        }
        else {
            const withinWeek = isDateInNext( date, null, null, 7,    null, null, true, false );
            const withinYear = isDateInNext( date, 1,    null, null, null, null, true, false );
            const options = { weekday: withinWeek ? 'long' : undefined, year: withinYear ? undefined : 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            result = date.toLocaleString( "en-US", options );
        }
    }

    return result;
}


/*** TIMEZONE ***/


function adjustToUTC( date ) {
    //Useful when new Date() has incorrectly offset date assuming original value was not UTC
    return adjustMinutes( date, -date.getTimezoneOffset() );
}


/*** CALCULATE ***/


function getMonthIndex( monthName ) {
    return MONTHS.findIndex( m => m.includes( monthName ) );
}

function getDaysInMonth( month, year ) {
    return 32 - new Date(year, month, 32).getDate();
}


/*** SPECIAL ***/


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


/*** ADJUST ***/


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


/*** COMPARISON ***/


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


/*** RANGE COMPARISON ***/


function isDateInRange( date, earlyDate, lateDate, inclusive = false, compareExact = true ) {
    let result = isDateAfter( date, earlyDate, compareExact ) && isDateBefore( date, lateDate, compareExact );
    if ( !result && inclusive ) {
        result = isDateEqual( date, earlyDate, compareExact ) || isDateEqual( date, lateDate, compareExact );
    }
    return result;
}

function isDateInNextHours( date, hourAdjust ) {
    return isDateInNext( date, null, null, null, hourAdjust, null );
}

function isDateInNextDays( date, dayAdjust ) {
    return isDateInNext( date, null, null, dayAdjust, null, null, true, false );
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

    let earlyDate = next ? new Date()  : compareDate;
    let lateDate  = next ? compareDate : new Date();
    return isDateInRange( date, earlyDate, lateDate, inclusive, compareExact );
}