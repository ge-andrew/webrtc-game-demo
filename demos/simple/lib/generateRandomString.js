export function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charactersLength);
      var randomChar = characters.charAt(randomIndex);
      result += Math.random() < 0.5 ? randomChar.toUpperCase() : randomChar.toLowerCase();
    }
    return result;
}