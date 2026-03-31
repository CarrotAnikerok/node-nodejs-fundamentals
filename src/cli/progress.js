/**
 * Parameters example: --duration 1000 --interval 10 --length 10 --color '#72F160'
 */
const progress = () => {
    const args = process.argv.slice(2);
    const progressBarParameters = {
        duration: 5000,
        interval: 100,
        length: 30,
        color: 'no color',
    };

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--') && i + 1 < args.length && !args[i+1].startsWith('--')) {
            if (args[i].slice(2) === 'color') {
                progressBarParameters[args[i].slice(2)] = args[i+1];
                continue;
            }
            progressBarParameters[args[i].slice(2)] = parseInt(args[i+1]);
        }
    }

    let timePassed = 0;
    const {duration, interval, length, color} = progressBarParameters;
    const timer = setInterval(() => {
        updateProgressbar(timePassed, duration, length, color);
        timePassed += interval;

        if (timePassed >= duration + interval) {
            clearInterval(timer);
            console.log('\nDone!');
        }
    }, interval)
};

progress();

function updateProgressbar(lasted, duration, length, color) {
    const percentLasted = lasted/duration;
    const filledPartCount = Math.ceil(percentLasted * length);
    let filledPart = '█'.repeat(filledPartCount);

    if (color != 'no color') {
        filledPart = setHexColor(color, filledPart);
    }

    const emptyPart = ' '.repeat((1 - percentLasted) * length);
    updateLine(`[${filledPart}${emptyPart}] ${Math.ceil(100 * percentLasted)}%`);
}

function updateLine(line) {
    process.stdout.write(`\r${line}`);
}

function setHexColor(hex, text) {
    const hexColor = hex.replace(/^#/, '');

    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    const fgColorString = `\x1b[38;2;${red};${green};${blue}m`;
    const resetFormatString = '\x1b[0m'

    return `${fgColorString}${text}${resetFormatString}`
}