import mongoose from 'mongoose';


const UsuarioSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, /* fields => createdAt y updatedAt */
        versionKey: false /* le quita el field __v */
    }
);

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema)
export default UsuarioModel

