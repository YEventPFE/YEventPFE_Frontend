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
    console.log('Final age:', age);
    
    return age;
}