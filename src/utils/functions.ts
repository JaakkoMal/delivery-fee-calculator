
// Write test
export const checkInvalidCharacters = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const invalidCharacters: string[] = ['e','+','-']
    if(invalidCharacters.includes(e.key)) e.preventDefault()
}
