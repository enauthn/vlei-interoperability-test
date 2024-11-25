// src/utils/kliUtils.ts

const { exec } = require('child_process');

// Function to run kli command and return a promise
export function runKliCommand() {
    return new Promise((resolve, reject) => {
        exec('./src/scripts/kli/establishment/initialize-GEDA-GIDA.sh', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve(stdout);
        });
    });
}

// TODO
// - split the kli command into two separate commands
