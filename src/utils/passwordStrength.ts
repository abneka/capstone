function checkPasswordStrength(password: string) {
  const minLength = 8 // Adjust as needed
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^\w\s]/.test(password)

  const score = [
    minLength && password.length >= minLength ? 1 : 0,
    hasUpperCase ? 1 : 0,
    hasLowerCase ? 1 : 0,
    hasNumber ? 1 : 0,
    hasSymbol ? 1 : 0,
  ].reduce((sum, val) => sum + val, 0)

  return score >= 3
}

export default checkPasswordStrength
