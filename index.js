const f = require('fs');
const path = require('path');


// read csv file
const readFile = async(file) => {
    return new Promise((resolve, reject) => {
        f.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}



const getData = async(options) => {
    const data = []
    try {
        if (options.file) {
            //validate file exists and file is a csv
            const file = path.resolve(options.file);
            if (f.existsSync(file)) {
                const fileData = await readFile(file);
                return data.push(fileData);
            }
        }
        if (options.url) {
            //validate url and ends with .csv
            const url = options.url;
            if (url.endsWith('.csv')) {
                const fileData = await readFile(url);
                return data.push(fileData);
            }
        }
        return data;
    } catch (error) {
        throw new Error(error);
    }
}
 const generateCsvFile = async(data, name) => {
     const count = Object.keys(data).length;
     const fileName = name ? name : 'report';
     let dataToWrite = '';
    try {
        if (!data || data.length === 0) {   
         throw new Error('data are required and must be an array');   
        }
        for (let i = 0; i < count; i++) {
            if(i === 0) {
            dataToWrite += Object.keys(data[i]) + '\n';
            }
            dataToWrite += Object.values(data[i]) + '\n';
        }
        f.writeFile(`${fileName}.csv`, dataToWrite, (err) => {
            if (err) {
                throw new Error(err);
            }
        });
        
    } catch (error) {
        throw new Error(error);
    }
}


exports.getData = getData;
exports.generateCsvFile = generateCsvFile;
