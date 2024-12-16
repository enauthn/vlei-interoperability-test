// src/utils/kliUtils.ts

const { exec } = require('child_process');

interface OOBI {
    name: string | null;
    url: string | null;
}

// Function to run setup environment script
// export function runSetupEnvironment() {
//     return new Promise((resolve, reject) => {
//         exec('bash -c "source ./src/scripts/kli/setup.sh && env"', (error: any, stdout: any, stderr: any) => {
//             if (error) {
//                 console.error(`Error executing setup script: ${error}`);
//                 reject(error);
//                 return;
//             }

//             console.log(`stdout: ${stdout}`);
//             console.error(`stderr: ${stderr}`);

//             // Parse environment variables from the output
//             const envVars = stdout.split("\n").reduce((env: any, line: string) => {
//                 const [key, value] = line.split("=");
//                 if (key && value) {
//                     env[key] = value;
//                 }
//                 return env;
//             }, {});

//             console.log("Environment Variables:", envVars);

//             // Set the environment variables in the current process
//             Object.assign(process.env, envVars);

//             resolve(envVars);
//         });
//     });
// }

// Function to run kli command and return a promise
export function initializeAIDs() {
    return new Promise((resolve, reject) => {
        exec('./src/scripts/kli/establishment/initialize-GEDA-GIDA.sh', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);


            // Extracting all "Prefix" values using regex
            const aidMatches = stdout.match(/Alias:\s+(\w+)\nIdentifier:\s+([\w-]+)/g);
            const AIDs = aidMatches ? aidMatches.map((match: string) => {
                const [aliasLine, identifierLine] = match.split('\n');
                const alias = aliasLine.replace('Alias: \t', '').trim();
                const aid = identifierLine.replace('Identifier: ', '').trim();
                return { Alias: alias, AID: aid };
            }) : [];

            console.log(`Extracted Prefixes: ${JSON.stringify(AIDs, null, 2)}`);
            resolve({ AIDs });

        });
    });
}

// Function to run kli command and return a promise
export function generateOOBI() {
    return new Promise((resolve, reject) => {
        exec('./src/scripts/kli/establishment/resolve-GLEIF-OOBIs.sh', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            // Extracting name and OOBI URL pairs using regex
            const oobiData: OOBI[] = [];
            const oobiMatches = stdout.match(/(\w+):\s(http:\/\/\d+\.\d+\.\d+\.\d+:\d+\/oobi\/[\w-]+\/witness)/g);
            if (oobiMatches) {
                oobiMatches.forEach((match: any) => {
                    const [name, url] = match.split(': ');
                    oobiData.push({ name, url });
                });
            }

            console.log(`Extracted OOBI Data: ${JSON.stringify(oobiData, null, 2)}`);
            resolve({ oobiData });

        });
    });
}

export function resolveQARs(qar1Oobi: string, qar2Oobi: string, qar3Oobi: string) {
    return new Promise((resolve, reject) => {
        exec(`./src/scripts/kli/establishment/resolve-QARs-OOBIs.sh "${qar1Oobi}" "${qar2Oobi}" "${qar3Oobi}"`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            const oobiMatches = stdout.match(/http:\/\/\d+\.\d+\.\d+\.\d+:\d+\/oobi\/[\w-]+\/witness resolved/g);
            const oobiData = oobiMatches ? oobiMatches.map((match: string) => match) : [];

            resolve({ oobiData });

        });
    });
}


// TODO
// - split the kli command into two separate commands
// - create the mapping subsubsection -> kli command (challenge response)
// ex. { "XGAR1_QAR1_GENERATE": "./script/kli/establish/initialize-XGAR1-QAR1.sh" }