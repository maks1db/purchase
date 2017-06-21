const createTable = (name, fields) => {
    let keys = '', i = 0;

    Object.keys(fields).forEach( k => {
        keys += `${k} ${fields[k]} ${i === fields.lenght - 1 ? '' : ','}`;
        i++;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (id int(11) NOT NULL AUTO_INCREMENT, ${keys} PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`;

};

module.exports = createTable;