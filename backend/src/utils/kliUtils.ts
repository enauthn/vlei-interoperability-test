// src/utils/kliUtils.ts
import { exec } from 'child_process';
import { challengeResponseMapping } from './validateUtils';
import { setWords, words } from '../store/useStateMachine';

interface OOBI {
    name: string | null;
    url: string | null;
}

type SubsubsectionKey = keyof typeof challengeResponseMapping;


function getAIDfromOOBI(oobi: string) {
    //input: http://127.0.0.1:5643/oobi/EGDJieT-N-IQAZV0QhOeZ7jS8SnRe_bla2wmsYfYuCgT/witness
    //output: EGDJieT-N-IQAZV0QhOeZ7jS8SnRe_bla2wmsYfYuCgT
    return oobi.split('/')[4];
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
// 
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

export async function resolveQARs(qar1Oobi: string, qar2Oobi: string, qar3Oobi: string) {
    const qar1_aid = await getAIDfromOOBI(qar1Oobi);
    const qar2_aid = await getAIDfromOOBI(qar2Oobi);
    const qar3_aid = await getAIDfromOOBI(qar3Oobi);

    return new Promise((resolve, reject) => {
        exec(`./src/scripts/kli/establishment/resolve-QARs-OOBIs.sh "${qar1Oobi}" "${qar2Oobi}" "${qar3Oobi}" "${qar1_aid}" "${qar2_aid}" "${qar3_aid}"`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);
            const oobiMatches = stdout.match(/http:\/\/\d+\.\d+\.\d+\.\d+:\d+\/oobi\/[\w-]+\/witness resolved/g);
            const oobiData = oobiMatches ? oobiMatches.map((match: string) => match) : [];

            resolve({ oobiData });

        });
    });
}

export function generateWords() {
    return new Promise((resolve, reject) => {
        exec('./src/scripts/kli/establishment/generate-words.sh', (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);

            const words = stdout.replace('\n', '')
            setWords(words);

            resolve({ words });

        });
    });
}

export function verifyWords(subsubsection: string) {
    return new Promise((resolve, reject) => {
        // Validate if the subsubsection exists in the mapping
        if (!(subsubsection in challengeResponseMapping)) {
            return reject(new Error(`Subsubsection ${subsubsection} not found in challengeResponseMapping.`));
        }
        // Check if words are generated
        if (!words || words === '' || words === 'undefined' || words === 'null' || words === ' ') {
            return reject(new Error('Words not generated.'));
        }
        const { challenger, recipient } = challengeResponseMapping[subsubsection as SubsubsectionKey];

        exec(`./src/scripts/kli/establishment/verify-words.sh "${recipient}" "${recipient}" "${challenger}" "${words}"`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);

            resolve({ stdout });
        })
    }
    )
}

export function respondWords(subsection: string, resp_words: string) {
    return new Promise((resolve, reject) => {
        // Validate if the subsubsection exists in the mapping
        if (!(subsection in challengeResponseMapping)) {
            return reject(new Error(`Subsubsection ${subsection} not found in challengeResponseMapping.`));
        }
        const { challenger, recipient } = challengeResponseMapping[subsection as SubsubsectionKey];


        exec(`./src/scripts/kli/establishment/respond-words.sh "${challenger}" "${challenger}" "${recipient}" "${resp_words}"`, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`Error executing kli script: ${error}`);
                reject(error);
                return;
            }

            console.log(`stdout: ${stdout}`);

            resolve({ stdout });
        })
    }
    )
}


// TODO
// - split the kli command into two separate commands
// - create the mapping subsubsection -> kli command (challenge response)
// ex. { "XGAR1_QAR1_GENERATE": "./script/kli/establish/initialize-XGAR1-QAR1.sh" }