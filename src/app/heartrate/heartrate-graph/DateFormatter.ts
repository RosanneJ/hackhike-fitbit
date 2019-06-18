import * as d3 from 'd3';

export function multiFormat(date): any {
  const locale = d3.timeFormatLocale({
    dateTime: '%A, %e %B %Y г. %X',
    date: '%d.%m.%Y',
    time: '%H:%M:%S',
    periods: ['AM', 'PM'],
    days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
    shortDays: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'],
    months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    shortMonths: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'spt', 'okt', 'nov', 'dec']
  });

  const formatMillisecond = locale.format('.%L');
  const formatSecond = locale.format(':%S');
  const formatMinute = locale.format('%H:%M');
  const formatHour = locale.format('%H:%M');
  const formatDay = locale.format('%a %d');
  const formatWeek = locale.format('%b %d');
  const formatMonth = locale.format('%B');
  const formatYear = locale.format('%Y');

  return (d3.timeSecond(date) < date ? formatMillisecond
    : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
        : d3.timeDay(date) < date ? formatHour
          : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
            : d3.timeYear(date) < date ? formatMonth
              : formatYear)(date);
}
