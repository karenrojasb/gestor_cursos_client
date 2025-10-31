export const getNowDate = (): Date => {
    return DateTime.now()
        .setZone('America/Bogota')
        .minus({ hours: 5 })
        .toJSDate();
};
