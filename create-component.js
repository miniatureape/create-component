#!/usr/bin/node

const path = require('path');
const fs = require('fs');

let componentTemplate = function(className) { 
    return `import React from 'react';
import PropTypes from 'prop-types';

class ${className} extends React.Component {
    render() {
        return (
            <div>Hello, ${className}</div>
        );
    }
}
${className}.propTypes = {};
export default ${className};`
}

let containerTemplate = function(className) { 
    return `import { connect } from 'react-redux';
import ${className} from '../components/${className}'
function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(${className})`
}


/*
 * Arg 1: Classname
 * Arg 2: Src Directory (default is 'src');
 */

let args = process.argv.slice(2);

let className = args[0];
let filename = className + ".jsx";
let srcDirectory = 'src';
let cwd = process.cwd();

if (args.length === 2) {
    srcDirectory = args[1];
} 

let componentPath = path.join(cwd, srcDirectory, 'components');
let containerPath = path.join(cwd, srcDirectory, 'containers');
console.log(className, filename, srcDirectory, cwd, componentPath, containerPath)

try {
    fs.mkdirSync(componentPath);
    fs.mkdirSync(containerPath);
} catch (e) {}

fs.writeFileSync(path.join(componentPath, filename), componentTemplate(className));
fs.writeFileSync(path.join(containerPath, filename), containerTemplate(className));
