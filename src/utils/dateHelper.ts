import { useEffect, useState } from "react";

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
    
    return age;
}

export const getTimeAgo = (date: Date): string => {
    const secondsAgo = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
}

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
}

export const useTimeAgo = (date: Date) => {
    const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(getTimeAgo(date));
        }, 60000);

        return () => clearInterval(interval);
    }, [date]);

    return timeAgo;
};