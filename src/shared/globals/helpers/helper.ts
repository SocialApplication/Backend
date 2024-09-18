export class Helpers {
  static firstLetterUppercase(str: string): string{
    const valueString = str.toLowerCase();
    return valueString.split(' ')
    .map((value: string)=> `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
    .join(' ');
  }

  static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  static generateRandomIntegers(intergerLength: number): number{
    const character ='123456789';
    let result ='';
    const characterLength = character.length;
    for (let i = 0; i< intergerLength; i++){
      result += character.charAt(Math.floor(Math.random()*characterLength));
    }
    return parseInt(result, 10);

  }

}
