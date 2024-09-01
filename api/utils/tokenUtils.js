// verify if token expiration time is valids
export function tokenIsValid(payload) {
    if (payload.exp > Date.now()) {
        return true
    } else {
        return false
    }
}