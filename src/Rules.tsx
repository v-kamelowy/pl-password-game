const rules = [
    {
        number: 1,
        name: 'osiem_znakow',
        message: 'Hasło musi mieć co najmniej 8 znaków',
        isTrue (password: string) {
            return password.length >= 8
        }
    },
    {
        number: 2,
        name: 'mala_duza_litera',
        message: 'Hasło musi zawierać małe i duże litery',
        isTrue (password: string) {
            return /[a-z]/.test(password) && /[A-Z]/.test(password)
        }
    },
    {
        number: 3,
        name: 'znak_specjalny',
        message: 'Hasło musi zawierać znak specjalny',
        isTrue (password: string) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
    }
]

export { rules }