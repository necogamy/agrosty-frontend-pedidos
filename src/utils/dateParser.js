export function dateParser(date) {
    let parsedTime = date.split(' ')[1];
    let parsedDate = date.split(' ')[0].split('');
    const parsedHour = Number(parsedTime[1].split(':')[0]);

    const atDay = parsedHour >= 0 && parsedHour <= 12 ? 'mañana'
        : parsedHour >= 12 && parsedHour <= 19 ? 'tarde'
        : (parsedHour >= 19 && parsedHour <= 24) || (parsedHour >= 19 && parsedHour <= 23) ? 'noche'
        : null;

    for (let i = 0; i < parsedDate.length; i++) {
        if (/-/.test(parsedDate[i])) parsedDate[i] = '/';
    }
    parsedDate = parsedDate.join('');

    parsedTime = parsedTime.split(':')[0] + ':' + parsedTime.split(':')[1];

    return {
        atDay,
        parsedDate,
        parsedTime
    };
}