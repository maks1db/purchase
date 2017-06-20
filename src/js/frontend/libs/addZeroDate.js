function z(v) {
    const str = v.toString();
    return (str.length === 1 ? "0" : "") + str;
}

module.exports = z;

