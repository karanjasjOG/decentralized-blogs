let a = () => {
    console.log('called a')
}

function b() {
    console.log('called b')
}

// exports.a = a;
exports = {
    a,
    b
};

console.log(module)