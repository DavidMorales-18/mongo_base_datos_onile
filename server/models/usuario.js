const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema; //Un esquema que me representa la abse de datos 

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es rol valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es Requerido'],
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    img: {
        type: String,
        required: false

    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    estado: {
        type: String,
        default: true
    },
    google: {
        type: String,
        default: true

    }



});



usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('usuario', usuarioSchema);