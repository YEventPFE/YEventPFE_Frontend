export const getAgeByBirthdate = (birthDate: Date): number => {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;

    if (isNaN(birth.getTime())) {
        console.warn("Invalid date:", birthDate);
        return NaN;
    }
    var today = new Date();
    var age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    console.debug('Final age:', age);
    
    return age;
}

export const getTimeAgo = (date: Date): string => {
    const secondsAgo = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
}