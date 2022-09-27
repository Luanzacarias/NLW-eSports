// 18:00 <- ["18","00"] <- [18, 00] <- (18*60) + 00 <- 1080

export function convertMinutesToHourString(minutesAmount: number) {
    // divide e pega o número inteiro, "arredonda pra baixo"
    const hours = Math.floor(minutesAmount/60);
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}