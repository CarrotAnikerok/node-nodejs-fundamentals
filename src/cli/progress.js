import readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { styleText } from 'node:util';

const progress = () => {
    // Write your code here
    // Simulate progress bar from 0% to 100% over ~5 seconds
    // Update in place using \r every 100ms
    // Format: [████████████████████          ] 67%

    const args = process.argv.slice(2);

    const duration = 5000;
    const interval = 100;
    const length = 30;
    const color = '';

    //console.log(styleText('#BE42EB', 'hiii'));

    const hex = '76A027';

    console.log(setHexColor('#AB1E1C', 'HI CARROT IM RED'));
    console.log(setHexColor('#2271A5', 'HI CARROT IM NOT'));
    console.log(setHexColor('#DDFE25', 'HI CARROT IM NOT TOO'));
    console.log(setHexColor('#BE42EB', '█'));
};

progress();


function setHexColor(hex, text) {
    const hexColor = hex.replace(/^#/, '');

    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    const fgColorString = `\x1b[38;2;${red};${green};${blue}m`;
    const resetFormatString = '\x1b[0m'

    return `${fgColorString}${text}${resetFormatString}`
}