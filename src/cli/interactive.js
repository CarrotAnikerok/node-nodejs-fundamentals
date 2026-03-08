import readline from 'node:readline';
import { stdin, stdout } from 'node:process';

const interactive = () => {
    const rl = readline.createInterface({input: stdin, output: stdout});

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line', (userInput => {
            switch (userInput.trim()) {
                case 'uptime':
                    console.log(`Uptime: ${process.uptime().toFixed(2)}s`);
                    break;
                case 'cwd':
                    console.log(process.cwd());
                    break;
                case 'date':
                    console.log(new Date().toISOString());
                    break;
                case 'exit':
                    rl.close();
                    return;
                default:
                    console.log('Unknown command');
            }        

            rl.prompt();
            }
        )
    );

    rl.on('close', () => {
        console.log('\nGoodbye!');
    });

    rl.on('SIGINT', () => {
        rl.close();
    })
};

interactive();
